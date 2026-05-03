/**
 * GentCoDesign - Configuration Manager
 * Handles all configuration: models, API keys, paths, defaults
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const CONFIG_DIR = path.join(os.homedir(), '.gentcodesign');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
const DB_FILE = path.join(CONFIG_DIR, 'gentcodesign.db');
const WORKSPACE_DIR = path.join(CONFIG_DIR, 'workspaces');
const EXPORTS_DIR = path.join(CONFIG_DIR, 'exports');

const DEFAULT_CONFIG = {
  version: '1.0.0',
  models: {
    default: 'claude',
    providers: {
      anthropic: {
        name: 'Anthropic',
        baseUrl: 'https://api.anthropic.com/v1',
        models: ['claude-sonnet-4-20250514', 'claude-3-5-haiku-20241022', 'claude-3-opus-20240229'],
        apiKey: '',
        headers: { 'anthropic-version': '2023-06-01' }
      },
      openai: {
        name: 'OpenAI',
        baseUrl: 'https://api.openai.com/v1',
        models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'o1-preview'],
        apiKey: ''
      },
      gemini: {
        name: 'Google Gemini',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        models: ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-1.5-flash'],
        apiKey: ''
      },
      deepseek: {
        name: 'DeepSeek',
        baseUrl: 'https://api.deepseek.com/v1',
        models: ['deepseek-chat', 'deepseek-coder', 'deepseek-reasoner'],
        apiKey: ''
      },
      nvidia: {
        name: 'NVIDIA NIM',
        baseUrl: 'https://integrate.api.nvidia.com/v1',
        models: ['meta/llama-3.1-405b-instruct', 'meta/llama-3.1-70b-instruct', 'mistralai/mixtral-8x22b-instruct-v0.1', 'nvidia/llama-3.1-nemotron-70b-instruct', 'deepseek-ai/deepseek-r1'],
        apiKey: ''
      },
      groq: {
        name: 'Groq',
        baseUrl: 'https://api.groq.com/openai/v1',
        models: ['llama-3.1-405b-reasoning', 'llama-3.1-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'],
        apiKey: ''
      },
      mistral: {
        name: 'Mistral',
        baseUrl: 'https://api.mistral.ai/v1',
        models: ['mistral-large-latest', 'mistral-medium-latest', 'mistral-small-latest', 'codestral-latest'],
        apiKey: ''
      },
      together: {
        name: 'Together AI',
        baseUrl: 'https://api.together.xyz/v1',
        models: ['meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo', 'mistralai/Mixtral-8x22B-Instruct-v0.1', 'Qwen/Qwen2.5-72B-Instruct-Turbo'],
        apiKey: ''
      },
      fireworks: {
        name: 'Fireworks AI',
        baseUrl: 'https://api.fireworks.ai/inference/v1',
        models: ['accounts/fireworks/models/llama-v3p1-405b-instruct', 'accounts/fireworks/models/llama-v3p1-70b-instruct'],
        apiKey: ''
      },
      cohere: {
        name: 'Cohere',
        baseUrl: 'https://api.cohere.com/v2',
        models: ['command-r-plus', 'command-r', 'command-light'],
        apiKey: ''
      },
      huggingface: {
        name: 'Hugging Face',
        baseUrl: 'https://api-inference.huggingface.co/v1',
        models: ['meta-llama/Meta-Llama-3.1-405B-Instruct', 'mistralai/Mixtral-8x22B-Instruct-v0.1'],
        apiKey: ''
      },
      azure: {
        name: 'Azure OpenAI',
        baseUrl: '',
        models: ['gpt-4o', 'gpt-4', 'gpt-35-turbo'],
        apiKey: ''
      },
      lmstudio: {
        name: 'LM Studio (Local)',
        baseUrl: 'http://localhost:1234/v1',
        models: ['local-model'],
        apiKey: 'lm-studio'
      },
      jan: {
        name: 'Jan (Local)',
        baseUrl: 'http://localhost:1337/v1',
        models: ['local-model'],
        apiKey: 'jan'
      },
      llamacpp: {
        name: 'llama.cpp (Local)',
        baseUrl: 'http://localhost:8080/v1',
        models: ['local-model'],
        apiKey: 'llamacpp'
      },
      textgen: {
        name: 'text-generation-webui',
        baseUrl: 'http://localhost:5000/v1',
        models: ['local-model'],
        apiKey: 'textgen'
      },
      openrouter: {
        name: 'OpenRouter',
        baseUrl: 'https://openrouter.ai/api/v1',
        models: ['auto'],
        apiKey: ''
      },
      ollama: {
        name: 'Ollama (Local)',
        baseUrl: 'http://localhost:11434/v1',
        models: ['llama3.1', 'codellama', 'mistral'],
        apiKey: 'ollama'
      },
      custom: {
        name: 'Custom OpenAI-compatible',
        baseUrl: '',
        models: [],
        apiKey: ''
      }
    }
  },
  defaults: {
    exportFormat: 'html',
    theme: 'dark',
    responsive: true,
    designStyle: 'modern',
    language: 'en'
  },
  api: {
    port: 3700,
    host: '0.0.0.0',
    cors: true,
    rateLimit: 60
  },
  rendering: {
    sandboxMode: true,
    timeout: 30000,
    viewport: { width: 1440, height: 900 }
  },
  workspace: {
    maxDesigns: 1000,
    autoSave: true,
    snapshotOnGenerate: true
  }
};

class ConfigManager {
  constructor() {
    this.config = null;
    this._ensureDirs();
  }

  _ensureDirs() {
    for (const dir of [CONFIG_DIR, WORKSPACE_DIR, EXPORTS_DIR]) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  }

  load() {
    try {
      if (fs.existsSync(CONFIG_FILE)) {
        const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
        this.config = this._merge(DEFAULT_CONFIG, JSON.parse(raw));
      } else {
        this.config = { ...DEFAULT_CONFIG };
        this.save();
      }
    } catch (e) {
      this.config = { ...DEFAULT_CONFIG };
    }
    return this.config;
  }

  save() {
    this._ensureDirs();
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2));
  }

  get(key, fallback) {
    if (!this.config) this.load();
    const keys = key.split('.');
    let val = this.config;
    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) {
        val = val[k];
      } else {
        return fallback;
      }
    }
    return val !== undefined ? val : fallback;
  }

  set(key, value) {
    if (!this.config) this.load();
    const keys = key.split('.');
    let obj = this.config;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in obj) || typeof obj[keys[i]] !== 'object') {
        obj[keys[i]] = {};
      }
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this.save();
  }

  getProvider(name) {
    if (!this.config) this.load();
    return this.config.models.providers[name] || null;
  }

  getApiKey(provider) {
    const p = this.getProvider(provider);
    return p ? p.apiKey : '';
  }

  setApiKey(provider, key) {
    this.set(`models.providers.${provider}.apiKey`, key);
  }

  resolveModel(modelSpec) {
    if (!this.config) this.load();
    // modelSpec can be "provider/model" or just "model" or "default"
    if (modelSpec === 'default' || !modelSpec) {
      const def = this.config.models.default;
      return this.resolveModel(def);
    }
    if (modelSpec.includes('/')) {
      const [provider, model] = modelSpec.split('/');
      return { provider, model };
    }
    // Try to find the model in providers
    for (const [pname, prov] of Object.entries(this.config.models.providers)) {
      if (prov.models.includes(modelSpec)) {
        return { provider: pname, model: modelSpec };
      }
    }
    // Fallback to default provider
    return { provider: this.config.models.default, model: modelSpec };
  }

  _merge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this._merge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  paths() {
    return {
      config: CONFIG_DIR,
      config_file: CONFIG_FILE,
      db: DB_FILE,
      workspaces: WORKSPACE_DIR,
      exports: EXPORTS_DIR
    };
  }
}

module.exports = new ConfigManager();
module.exports.ConfigManager = ConfigManager;
module.exports.DEFAULT_CONFIG = DEFAULT_CONFIG;
