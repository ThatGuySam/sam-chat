import { openai } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { groq } from '@ai-sdk/groq';

import { customMiddleware } from './custom-middleware';
import { GroqIdentifier } from './models';


export const openaiModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: customMiddleware,
  });
};

export const groqModel = (apiIdentifier: GroqIdentifier) => {
  return wrapLanguageModel({
    model: groq(apiIdentifier),
    middleware: customMiddleware,
  });
};

export const imageGenerationModel = openai.image('dall-e-3');
