/**
 * GentCoDesign - Model Router v2
 * Unified interface for ALL AI model providers
 * 
 * Supported providers:
 * - Anthropic (Claude)
 * - OpenAI (GPT, o1, DALL-E)
 * - Google Gemini
 * - DeepSeek
 * - NVIDIA NIM
 * - OpenRouter
 * - Groq
 * - Mistral
 * - Cohere
 * - Together AI
 * - Fireworks AI
 * - Replicate
 * - Hugging Face
 * - Azure OpenAI
 * - AWS Bedrock
 * - Ollama (local)
 * - LM Studio (local)
 * - Jan (local)
 * - llama.cpp (local)
 * - text-generation-webui (local)
 * - Custom OpenAI-compatible
 */

const https = require('https');
const http = require('http');
const config = require('./config');

// Provider definitions
const PROVIDERS = {
  anthropic: {
    name: 'Anthropic',
    baseUrl: 'https://api.anthropic.com/v1',
    models: ['claude-sonnet-4-20250514', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
    type: 'anthropic',
    headers: { 'anthropic-version': '2023-06-01' },
    description: 'Claude models - best for complex reasoning and code'
  },
  openai: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'o1-preview', 'o1-mini'],
    type: 'openai',
    description: 'GPT models - versatile and widely supported'
  },
  gemini: {
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    models: ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-1.5-flash-8b'],
    type: 'gemini',
    description: 'Google models - fast and capable'
  },
  deepseek: {
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    models: ['deepseek-chat', 'deepseek-coder', 'deepseek-reasoner'],
    type: 'openai',
    description: 'DeepSeek models - excellent for code'
  },
  nvidia: {
    name: 'NVIDIA NIM',
    baseUrl: 'https://integrate.api.nvidia.com/v1',
    models: [
      'meta/llama-3.1-405b-instruct',
      'meta/llama-3.1-70b-instruct',
      'meta/llama-3.1-8b-instruct',
      'mistralai/mixtral-8x22b-instruct-v0.1',
      'mistralai/mistral-large-latest',
      'google/gemma-2-27b-it',
      'nvidia/llama-3.1-nemotron-70b-instruct',
      'deepseek-ai/deepseek-r1',
      'qwen/qwen2.5-72b-instruct'
    ],
    type: 'openai',
    description: 'NVIDIA NIM - enterprise-grade inference'
  },
  openrouter: {
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: [
      'anthropic/claude-3.5-sonnet',
      'openai/gpt-4o',
      'google/gemini-pro-1.5',
      'meta-llama/llama-3.1-405b-instruct',
      'mistralai/mixtral-8x22b-instruct',
      'deepseek/deepseek-chat',
      'qwen/qwen-2.5-72b-instruct'
    ],
    type: 'openai',
    description: 'OpenRouter - access 100+ models with one key'
  },
  groq: {
    name: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    models: [
      'llama-3.1-405b-reasoning',
      'llama-3.1-70b-versatile',
      'llama-3.1-8b-instant',
      'mixtral-8x7b-32768',
      'gemma2-9b-it',
      'llama3-groq-8b-8192-tool-use-preview'
    ],
    type: 'openai',
    description: 'Groq - ultra-fast inference on LPU hardware'
  },
  mistral: {
    name: 'Mistral',
    baseUrl: 'https://api.mistral.ai/v1',
    models: [
      'mistral-large-latest',
      'mistral-medium-latest',
      'mistral-small-latest',
      'open-mistral-nemo',
      'codestral-latest',
      'mistral-embed'
    ],
    type: 'openai',
    description: 'Mistral AI - European AI leader'
  },
  cohere: {
    name: 'Cohere',
    baseUrl: 'https://api.cohere.com/v2',
    models: ['command-r-plus', 'command-r', 'command-light', 'command-nightly'],
    type: 'cohere',
    description: 'Cohere - enterprise NLP platform'
  },
  together: {
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    models: [
      'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
      'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
      'mistralai/Mixtral-8x22B-Instruct-v0.1',
      'Qwen/Qwen2.5-72B-Instruct-Turbo',
      'deepseek-ai/deepseek-v3',
      'google/gemma-2-27b-it'
    ],
    type: 'openai',
    description: 'Together AI - fast inference for open models'
  },
  fireworks: {
    name: 'Fireworks AI',
    baseUrl: 'https://api.fireworks.ai/inference/v1',
    models: [
      'accounts/fireworks/models/llama-v3p1-405b-instruct',
      'accounts/fireworks/models/llama-v3p1-70b-instruct',
      'accounts/fireworks/models/mixtral-8x22b-instruct',
      'accounts/fireworks/models/qwen2p5-72b-instruct'
    ],
    type: 'openai',
    description: 'Fireworks AI - fast open model inference'
  },
  replicate: {
    name: 'Replicate',
    baseUrl: 'https://api.replicate.com/v1',
    models: ['meta/llama-3.1-405b-instruct', 'mistralai/mixtral-8x22b-instruct'],
    type: 'replicate',
    description: 'Replicate - run any model in the cloud'
  },
  huggingface: {
    name: 'Hugging Face',
    baseUrl: 'https://api-inference.huggingface.co/v1',
    models: [
      'meta-llama/Meta-Llama-3.1-405B-Instruct',
      'mistralai/Mixtral-8x22B-Instruct-v0.1',
      'Qwen/Qwen2.5-72B-Instruct',
      'deepseek-ai/DeepSeek-V3'
    ],
    type: 'openai',
    description: 'Hugging Face - open model hub'
  },
  azure: {
    name: 'Azure OpenAI',
    baseUrl: '',  // User provides endpoint
    models: ['gpt-4o', 'gpt-4', 'gpt-35-turbo'],
    type: 'azure',
    description: 'Azure OpenAI - enterprise OpenAI deployment'
  },
  ollama: {
    name: 'Ollama (Local)',
    baseUrl: 'http://localhost:11434/v1',
    models: ['llama3.1', 'llama3.1:70b', 'codellama', 'mistral', 'mixtral', 'gemma2', 'qwen2.5', 'phi3'],
    type: 'openai',
    apiKey: 'ollama',
    description: 'Ollama - run models locally, no API key needed'
  },
  lmstudio: {
    name: 'LM Studio (Local)',
    baseUrl: 'http://localhost:1234/v1',
    models: ['local-model'],
    type: 'openai',
    apiKey: 'lm-studio',
    description: 'LM Studio - local model server'
  },
  jan: {
    name: 'Jan (Local)',
    baseUrl: 'http://localhost:1337/v1',
    models: ['local-model'],
    type: 'openai',
    apiKey: 'jan',
    description: 'Jan - local AI assistant'
  },
  llamacpp: {
    name: 'llama.cpp (Local)',
    baseUrl: 'http://localhost:8080/v1',
    models: ['local-model'],
    type: 'openai',
    apiKey: 'llamacpp',
    description: 'llama.cpp - local inference server'
  },
  textgen: {
    name: 'text-generation-webui',
    baseUrl: 'http://localhost:5000/v1',
    models: ['local-model'],
    type: 'openai',
    apiKey: 'textgen',
    description: 'text-generation-webui - Oobabooga local server'
  },
  custom: {
    name: 'Custom (OpenAI-compatible)',
    baseUrl: '',
    models: [],
    type: 'openai',
    description: 'Any OpenAI-compatible endpoint'
  }
};

class ModelRouter {
  constructor() {
    this.config = config.load();
    this.providers = PROVIDERS;
  }

  /**
   * Generate completion from a model
   */
  async complete(opts) {
    const { provider, model, messages, maxTokens = 16000, temperature = 0.7, onToken } = opts;
    const prov = this._getProvider(provider);

    if (!prov) throw new Error(`Unknown provider: ${provider}`);
    if (!prov.apiKey && !['ollama', 'lmstudio', 'jan', 'llamacpp', 'textgen'].includes(provider)) {
      throw new Error(`No API key for ${provider}. Run: gentcodesign config --set-key ${provider}=<your-key>`);
    }

    const handler = this._getHandler(prov.type || 'openai');
    return handler.call(this, prov, model, messages, maxTokens, temperature, onToken);
  }

  _getProvider(name) {
    // Check config first
    const cfgProv = config.getProvider(name);
    if (cfgProv && cfgProv.apiKey) {
      return { ...PROVIDERS[name], ...cfgProv };
    }
    // Return built-in with defaults
    const builtIn = PROVIDERS[name];
    if (builtIn) {
      const cfg = config.getProvider(name) || {};
      return { ...builtIn, ...cfg };
    }
    return null;
  }

  _getHandler(type) {
    const handlers = {
      'openai': this._callOpenAI,
      'anthropic': this._callAnthropic,
      'gemini': this._callGemini,
      'cohere': this._callCohere,
      'replicate': this._callReplicate,
      'azure': this._callAzure
    };
    return handlers[type] || handlers.openai;
  }

  // ═══════════════════════════════════════════════════════════
  // Provider Handlers
  // ═══════════════════════════════════════════════════════════

  async _callOpenAI(prov, model, messages, maxTokens, temperature, onToken) {
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

    // OpenRouter specific headers
    if (prov.name === 'OpenRouter') {
      headers['HTTP-Referer'] = 'https://github.com/Atum246/gentcodesign';
      headers['X-Title'] = 'GentCoDesign';
    }

    if (onToken) {
      return this._httpRequest(`${prov.baseUrl}/chat/completions`, 'POST', headers, body, onToken);
    }

    const result = await this._httpRequest(`${prov.baseUrl}/chat/completions`, 'POST', headers, body);
    return result.choices?.[0]?.message?.content || '';
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
      generationConfig: { maxOutputTokens: maxTokens, temperature }
    });

    const url = `${prov.baseUrl}/models/${model}:generateContent?key=${prov.apiKey}`;
    const result = await this._httpRequest(url, 'POST', { 'Content-Type': 'application/json' }, body);
    return result.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  async _callCohere(prov, model, messages, maxTokens, temperature, onToken) {
    const systemMsg = messages.find(m => m.role === 'system');
    const chatMessages = messages.filter(m => m.role !== 'system').map(m => ({
      role: m.role === 'assistant' ? 'CHATBOT' : 'USER',
      message: m.content
    }));

    const body = JSON.stringify({
      model,
      messages: chatMessages,
      max_tokens: maxTokens,
      temperature,
      ...(systemMsg && { preamble: systemMsg.content })
    });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${prov.apiKey}`
    };

    const result = await this._httpRequest(`${prov.baseUrl}/chat`, 'POST', headers, body);
    return result.text || result.message?.content?.[0]?.text || '';
  }

  async _callReplicate(prov, model, messages, maxTokens, temperature, onToken) {
    const systemMsg = messages.find(m => m.role === 'system');
    const prompt = messages.filter(m => m.role !== 'system').map(m => m.content).join('\n');

    const body = JSON.stringify({
      input: {
        prompt,
        system_prompt: systemMsg?.content || '',
        max_tokens: maxTokens,
        temperature
      }
    });

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${prov.apiKey}`,
      'Prefer': 'wait'
    };

    const result = await this._httpRequest(`https://api.replicate.com/v1/models/${model}/predictions`, 'POST', headers, body);
    return result.output?.join('') || '';
  }

  async _callAzure(prov, model, messages, maxTokens, temperature, onToken) {
    const body = JSON.stringify({
      messages,
      max_tokens: maxTokens,
      temperature,
      stream: !!onToken
    });

    const headers = {
      'Content-Type': 'application/json',
      'api-key': prov.apiKey
    };

    const url = `${prov.baseUrl}/openai/deployments/${model}/chat/completions?api-version=2024-02-01`;

    if (onToken) {
      return this._httpRequest(url, 'POST', headers, body, onToken);
    }

    const result = await this._httpRequest(url, 'POST', headers, body);
    return result.choices?.[0]?.message?.content || '';
  }

  // ═══════════════════════════════════════════════════════════
  // HTTP Transport
  // ═══════════════════════════════════════════════════════════

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
        timeout: 180000
      }, (res) => {
        if (onToken) {
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
                const token = parsed.choices?.[0]?.delta?.content;
                if (token) { fullText += token; onToken(token); }
                if (parsed.type === 'content_block_delta') {
                  const text = parsed.delta?.text;
                  if (text) { fullText += text; onToken(text); }
                }
              } catch (e) { }
            }
          });

          res.on('end', () => resolve(fullText));
          res.on('error', reject);
        } else {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try { resolve(JSON.parse(data)); }
            catch (e) { reject(new Error(`Invalid JSON: ${data.slice(0, 200)}`)); }
          });
          res.on('error', reject);
        }
      });

      req.on('error', reject);
      req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout (180s)')); });
      req.write(body);
      req.end();
    });
  }

  // ═══════════════════════════════════════════════════════════
  // Utility Methods
  // ═══════════════════════════════════════════════════════════

  /**
   * List all available providers
   */
  listProviders() {
    return Object.entries(PROVIDERS).map(([id, prov]) => {
      const cfg = config.getProvider(id) || {};
      return {
        id,
        name: prov.name,
        models: prov.models,
        description: prov.description,
        hasKey: !!(cfg.apiKey || prov.apiKey),
        type: prov.type || 'openai',
        isLocal: ['ollama', 'lmstudio', 'jan', 'llamacpp', 'textgen'].includes(id)
      };
    });
  }

  /**
   * List models for a provider
   */
  listModels(provider) {
    const prov = PROVIDERS[provider];
    if (!prov) return [];
    return prov.models;
  }

  /**
   * Test a provider connection
   */
  async testConnection(providerName) {
    try {
      const prov = this._getProvider(providerName);
      if (!prov) return { ok: false, error: 'Unknown provider' };

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

  /**
   * Get provider info
   */
  getProviderInfo(provider) {
    return PROVIDERS[provider] || null;
  }

  /**
   * Auto-detect best available provider
   */
  autoDetect() {
    // Priority order
    const priority = ['anthropic', 'openai', 'gemini', 'deepseek', 'nvidia', 'groq', 'openrouter', 'together', 'mistral', 'ollama'];

    for (const p of priority) {
      const prov = this._getProvider(p);
      if (prov && (prov.apiKey || ['ollama', 'lmstudio', 'jan', 'llamacpp', 'textgen'].includes(p))) {
        return { provider: p, model: prov.models[0] };
      }
    }

    return null;
  }
}

module.exports = new ModelRouter();
module.exports.ModelRouter = ModelRouter;
module.exports.PROVIDERS = PROVIDERS;
