import { AI09ConfigurationManager, AIModelConfig } from './ai09_configuration.js';

export interface InferenceRequest {
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  timeoutMs?: number;
}

export interface InferenceResponse {
  text: string;
  tokensUsed: number;
  model: string;
  durationMs: number;
}

export class AI01LLMRuntime {
  private available: boolean = false;

  constructor(private configManager: AI09ConfigurationManager) {}

  public async checkAvailability(): Promise<boolean> {
    const cfg = this.configManager.getConfig();
    try {
      const res = await fetch(`${cfg.endpoint}/api/version`, { method: 'GET' });
      this.available = res.ok;
    } catch {
      this.available = false;
    }
    return this.available;
  }

  public isAvailable(): boolean {
    return this.available;
  }

  public async generateInference(req: InferenceRequest): Promise<InferenceResponse> {
    const cfg = this.configManager.getConfig();
    const startTime = Date.now();

    if (!req.prompt || !req.prompt.trim()) {
      throw new Error('Inference request prompt must be a non-empty string');
    }

    // Check if local LLM endpoint is live
    const isOnline = await this.checkAvailability();
    if (!isOnline) {
      throw new Error(`[AI-01 LLM Runtime Unavailable] Local model endpoint '${cfg.endpoint}' is unreachable. Local model provider required.`);
    }

    try {
      const response = await fetch(`${cfg.endpoint}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: cfg.modelName,
          prompt: req.prompt,
          system: req.systemPrompt || cfg.systemPromptPrefix,
          stream: false,
          options: {
            temperature: req.temperature ?? cfg.temperature,
            num_predict: req.maxTokens ?? cfg.maxTokens,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`LLM endpoint returned status ${response.status}`);
      }

      const data = (await response.json()) as { response?: string; eval_count?: number };
      return {
        text: data.response || '',
        tokensUsed: data.eval_count || 0,
        model: cfg.modelName,
        durationMs: Date.now() - startTime,
      };
    } catch (err: unknown) {
      throw new Error(`Inference failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}
