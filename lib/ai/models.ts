// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const openaiModels = [
  {
    id: 'gpt-4o-mini',
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'gpt-4o',
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'For complex, multi-step tasks',
  }
] as const satisfies Array<Model>;

export const groqModels = [
  {
    id: 'deepseek-r1-distill-llama-70b',
    label: 'DeepSeek R1',
    apiIdentifier: 'deepseek-r1-distill-llama-70b',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'llama-3.3-70b-versatile',
    label: 'Llama 3.3',
    apiIdentifier: 'llama-3.3-70b-versatile',
    description: 'For general-purpose tasks',
  },
] as const satisfies Array<Model>;

export type GroqIdentifier = typeof groqModels[number]['apiIdentifier'];

export function isGroqModel(model: Model): model is typeof groqModels[number] {
  return groqModels.some((m) => m.id === model.id);
}

export const models = [...openaiModels, ...groqModels] as const satisfies Array<Model>;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o-mini';
