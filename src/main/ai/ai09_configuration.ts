import { SettingsStore } from '../persistence/settings_store.js';

export interface AIModelConfig {
  provider: 'local-llm' | 'ollama' | 'llama-cpp';
  endpoint: string;
  modelName: string;
  temperature: number;
  maxTokens: number;
  contextWindowTokens: number;
  systemPromptPrefix: string;
}

export class AI09ConfigurationManager {
  private config: AIModelConfig;

  constructor(private settingsStore?: SettingsStore) {
    this.config = {
      provider: 'local-llm',
      endpoint: 'http://127.0.0.1:11434',
      modelName: 'llama3:8b-instruct',
      temperature: 0.7,
      maxTokens: 2048,
      contextWindowTokens: 8192,
      systemPromptPrefix: 'You are ATLAS, an offline-first AI desktop assistant.',
    };

    if (this.settingsStore) {
      const persisted = this.settingsStore.getSettings();
      if ((persisted as unknown as { aiConfig?: Partial<AIModelConfig> }).aiConfig) {
        this.config = {
          ...this.config,
          ...(persisted as unknown as { aiConfig: Partial<AIModelConfig> }).aiConfig,
        };
      }
    }
  }

  public getConfig(): AIModelConfig {
    return { ...this.config };
  }

  public updateConfig(partial: Partial<AIModelConfig>): AIModelConfig {
    this.config = {
      ...this.config,
      ...partial,
    };
    if (this.settingsStore) {
      this.settingsStore.updateSettings({
        aiConfig: this.config,
      } as any);
    }
    return this.getConfig();
  }
}
