import { pipeline, env } from '@xenova/transformers';

// Configuration for local environments to prevent 404/JSON errors
// This ensures the library fetches from Hugging Face hub and doesn't try to load from local server
env.allowLocalModels = false;
env.useBrowserCache = true;
// Explicitly use the Xenova CDN which is optimized for Transformers.js
env.remoteHost = 'https://huggingface.co';
env.remotePathTemplate = '{model}/resolve/main/';
// Additional fallback to ensure it doesn't try to load from current origin
if (typeof window !== 'undefined') {
    (env as any).localModelPath = 'https://huggingface.co/Xenova/';
}

/**
 * Local AI Service - "True Freedom" Implementation
 * Powered by Transformers.js (Running 100% in the user's browser)
 * Cost: $0 | API Keys: None | Privacy: Absolute
 */
export class LocalAiService {
  private static instance: LocalAiService;
  private pipelines: Record<string, any> = {};
  private isLoading: Record<string, boolean> = {};

  private constructor() {}

  public static getInstance(): LocalAiService {
    if (!LocalAiService.instance) {
      LocalAiService.instance = new LocalAiService();
    }
    return LocalAiService.instance;
  }

  /**
   * Summarize text locally using a quantized model.
   */
  public async summarize(text: string, onProgress?: (msg: string) => void) {
    try {
      const summarizer = await this.getPipeline('summarization', 'Xenova/distilbart-cnn-6-6', onProgress);
      const result = await summarizer(text, {
        max_new_tokens: 100,
        chunk_length: 512,
      });
      return result[0].summary_text;
    } catch (error) {
      console.error('[LocalAI] Error during summarization:', error);
      throw error;
    }
  }

  /**
   * Classify text sentiment locally.
   */
  public async classifySentiment(text: string, onProgress?: (msg: string) => void) {
    try {
      const classifier = await this.getPipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', onProgress);
      const result = await classifier(text);
      return result[0];
    } catch (error) {
      console.error('[LocalAI] Error during classification:', error);
      throw error;
    }
  }

  /**
   * Zero-shot classification to identify topics.
   */
  public async identifyTopics(text: string, candidateLabels: string[], onProgress?: (msg: string) => void) {
    try {
      const classifier = await this.getPipeline('zero-shot-classification', 'Xenova/distilbert-base-uncased-mnli', onProgress);
      const result = await classifier(text, candidateLabels);
      return result;
    } catch (error) {
      console.error('[LocalAI] Error during topic identification:', error);
      throw error;
    }
  }

  /**
   * Translate text locally.
   */
  public async translate(text: string, sourceLang: string, targetLang: string, onProgress?: (msg: string) => void) {
    try {
      // Using a very small T5 model for translation demos
      const translator = await this.getPipeline('translation', 'Xenova/t5-small', onProgress);
      const result = await translator(text, {
        src_lang: sourceLang,
        tgt_lang: targetLang,
      });
      return result[0].translation_text;
    } catch (error) {
      console.error('[LocalAI] Error during translation:', error);
      throw error;
    }
  }

  /**
   * Grammar Error Correction (GEC).
   */
  public async fixGrammar(text: string, onProgress?: (msg: string) => void) {
    try {
      // T5 is excellent for "grammar correction" tasks
      const corrector = await this.getPipeline('text2text-generation', 'Xenova/t5-small', onProgress);
      const result = await corrector(`gec: ${text}`, {
        max_new_tokens: 256,
        temperature: 0.1,
      });
      return result[0].generated_text;
    } catch (error) {
      console.error('[LocalAI] Error during grammar correction:', error);
      throw error;
    }
  }

  /**
   * Simple local logic to identify potential citation gaps.
   */
  public findCitationGaps(text: string) {
    // Look for statistics, complex claims, or years that usually require a source
    const claimsRegex = /\d{1,3}%|\d{4}|(according to|study|research|suggests|indicates)/gi;
    const sentences = text.split(/[.!?]/);
    const gaps: string[] = [];

    sentences.forEach(sentence => {
      if (claimsRegex.test(sentence) && !sentence.includes('(') && !sentence.includes('[')) {
        if (sentence.trim().length > 10) {
          gaps.push(sentence.trim());
        }
      }
    });

    return gaps;
  }

  /**
   * Internal helper to load and cache models.
   */
  private async getPipeline(task: string, model: string, onProgress?: (msg: string) => void) {
    const key = `${task}-${model}`;
    
    if (this.pipelines[key]) return this.pipelines[key];
    if (this.isLoading[key]) {
      // Wait for existing load if possible (simplified for now)
      while (this.isLoading[key]) {
        await new Promise(r => setTimeout(r, 500));
      }
      return this.pipelines[key];
    }

    this.isLoading[key] = true;
    onProgress?.(`Starting to load ${model} (${task})... this only happens once.`);

    try {
      this.pipelines[key] = await pipeline(task as any, model, {
        progress_callback: (info: any) => {
          if (info.status === 'progress') {
            onProgress?.(`Downloading model: ${info.file} (${Math.round(info.progress)}%)`);
          } else if (info.status === 'ready') {
            onProgress?.(`Model ${model} is ready!`);
          }
        }
      });
      return this.pipelines[key];
    } finally {
      this.isLoading[key] = false;
    }
  }
}

export const getLocalAi = () => LocalAiService.getInstance();
