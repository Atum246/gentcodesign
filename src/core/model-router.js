/**
 * GentCoDesign - Model Router
 * Unified interface for all AI model providers
 */

const https = require('https');
const http = require('http');
const config = require('./config');

class ModelRouter {
  constructor() {
    this.config = config.load();
  }

  /**
   * Generate completion from a model
   * @param {Object} opts
   * @param {string} opts.provider - Provider name
   * @param {string} opts.model - Model name
   * @param {Array} opts.messages - Chat messages
   * @param {number} opts.maxTokens - Max tokens
   * @param {number} opts.temperature - Temperature
   * @param {Function} opts.onToken - Streaming callback
   * @returns {Promise<string>}
   */
  async complete(opts) {
    const { provider, model, messages, maxTokens = 16000, temperature = 0.7, onToken } = opts;
    const prov = config.getProvider(provider);

    if (!prov) throw new Error(`Unknown provider: ${provider}`);
    if (!prov.apiKey && provider !== 'ollama') {
      throw new Error(`No API key for provider: ${provider}. Run: gentcodesign config --set-key ${provider}=<your-key>`);
    }

    // Route to appropriate handler
    switch (provider) {
      case 'anthropic':
        return this._callAnthropic(prov, model, messages, maxTokens, temperature, onToken);
      case 'gemini':
        return this._callGemini(prov, model, messages, maxTokens, temperature, onToken);
      default:
        return this._callOpenAICompatible(prov, model, messages, maxTokens, temperature, onToken);
    }
  }

  async _callAnthropic(prov, model, messages, maxTokens, temperature, onToken) {
    const body = JSON.stringify({
      model,
      max_tokens: maxTokens,
      temperature,
      messages: messages.filter(m => m.role !== 'system'),
      system: messages.find(m => m.role === 'system')?.content || '',
      stream: !!onToken
    });

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': prov.apiKey,
      'anthropic-version': '2023-06-01'
    };

    const result = await this._httpRequest(`${prov.baseUrl}/messages`, 'POST', headers, body, onToken);
    if (onToken) return result;
    return result.content?.[0]?.text || '';
  }

  async _callGemini(prov, model, messages, maxTokens, temperature, onToken) {
    const contents = messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

    const systemInstruction = messages.find(m => m.role === 'system');
    const body = JSON.stringify({
      contents,
      ...(systemInstruction && { systemInstruction: { parts: [{ text: systemInstruction.content }] } }),
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature
      }
    });

    const url = `${prov.baseUrl}/models/${model}:generateContent?key=${prov.apiKey}`;
    const result = await this._httpRequest(url, 'POST', { 'Content-Type': 'application/json' }, body);
    return result.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  async _callOpenAICompatible(prov, model, messages, maxTokens, temperature, onToken) {
    const body = JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
      stream: !!onToken
    });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${prov.apiKey}`
    };

    if (onToken) {
      return this._httpRequest(`${prov.baseUrl}/chat/completions`, 'POST', headers, body, onToken);
    }

    const result = await this._httpRequest(`${prov.baseUrl}/chat/completions`, 'POST', headers, body);
    return result.choices?.[0]?.message?.content || '';
  }

  _httpRequest(url, method, headers, body, onToken) {
    return new Promise((resolve, reject) => {
      const parsed = new URL(url);
      const transport = parsed.protocol === 'https:' ? https : http;

      const req = transport.request({
        hostname: parsed.hostname,
        port: parsed.port,
        path: parsed.pathname + parsed.search,
        method,
        headers,
        timeout: 120000
      }, (res) => {
        if (onToken) {
          // Streaming mode
          let fullText = '';
          let buffer = '';

          res.on('data', (chunk) => {
            buffer += chunk.toString();
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                // OpenAI format
                const token = parsed.choices?.[0]?.delta?.content;
                if (token) {
                  fullText += token;
                  onToken(token);
                }
                // Anthropic format
                if (parsed.type === 'content_block_delta') {
                  const text = parsed.delta?.text;
                  if (text) {
                    fullText += text;
                    onToken(text);
                  }
                }
              } catch (e) { /* skip malformed chunks */ }
            }
          });

          res.on('end', () => resolve(fullText));
          res.on('error', reject);
        } else {
          // Non-streaming
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error(`Invalid JSON response: ${data.slice(0, 200)}`));
            }
          });
          res.on('error', reject);
        }
      });

      req.on('error', reject);
      req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
      req.write(body);
      req.end();
    });
  }

  /**
   * List all available models
   */
  listModels() {
    const providers = this.config.models.providers;
    const result = [];
    for (const [name, prov] of Object.entries(providers)) {
      if (prov.apiKey || name === 'ollama') {
        result.push({
          provider: name,
          name: prov.name,
          models: prov.models,
          hasKey: !!prov.apiKey
        });
      }
    }
    return result;
  }

  /**
   * Test a provider connection
   */
  async testConnection(providerName) {
    try {
      const prov = config.getProvider(providerName);
      if (!prov) return { ok: false, error: 'Unknown provider' };
      if (!prov.apiKey && providerName !== 'ollama') {
        return { ok: false, error: 'No API key configured' };
      }

      const model = prov.models[0];
      await this.complete({
        provider: providerName,
        model,
        messages: [{ role: 'user', content: 'Say "ok" and nothing else.' }],
        maxTokens: 10
      });
      return { ok: true, provider: providerName, model };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }
}

module.exports = new ModelRouter();
module.exports.ModelRouter = ModelRouter;
