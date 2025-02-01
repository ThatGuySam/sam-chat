// Define your models here.
import { z } from "zod";
import type { Tagged } from 'type-fest';

import groqModelsRaw from './groq-models.json';

export type GroqIdentifier = Tagged<string, 'GroqIdentifier'>;

/**
 * Zod schema for a Unix timestamp.
 * Ensures the value is a positive integer.
 */
export const CreatedTimestampSchema = z.number()
  .int()
  .positive()
  .describe('Unix timestamp representing seconds since the Unix epoch');

export const GroqIdentifierSchema: z.Schema<GroqIdentifier> = z.string()
  .min(2)
  .describe('The identifier for the model in the API') as any;

export const ModelSchema = z.object({
  id: z.string()
    .min(2)
    .describe('The unique identifier for the model'),
  created: CreatedTimestampSchema,
  label: z.string()
    .min(2)
    .describe('The human-readable label for the model'),
  apiIdentifier: GroqIdentifierSchema,
  description: z.string()
    .min(2)
    .describe('A human-readable description of the model'),
});

// Parse the groq models so that, from here, we know that the
// models are valid.
export const groqKnownModels = [
  {
    id: 'deepseek-r1-distill-llama-70b',
    created: 1737924940,
    label: 'DeepSeek R1',
    apiIdentifier: 'deepseek-r1-distill-llama-70b',
    description: 'For complex, multi-step tasks'
  },
] as const;

const groqModels = z.array(ModelSchema).parse([
  ...groqKnownModels,
  ...groqModelsRaw
]);

export type Model = z.infer<typeof ModelSchema>;

/**
 * Parse the OpenAI models from a JSON literal.
 * We use an array schema to ensure the result is iterable.
 */
export const openaiModels = z.array(ModelSchema).parse([
  {
    id: 'gpt-4o-mini',
    created: 1737924940,
    label: 'GPT 4o mini',
    apiIdentifier: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'gpt-4o',
    created: 1737924940,
    label: 'GPT 4o',
    apiIdentifier: 'gpt-4o',
    description: 'For complex, multi-step tasks',
  }
] as const);

export function isGroqModel(model: Model): model is typeof groqModels[number] {
  return groqModels.some((m) => m.id === model.id);
}

export const models = [
  ...openaiModels,
  ...groqModels
] as const satisfies Array<Model>;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o-mini';
