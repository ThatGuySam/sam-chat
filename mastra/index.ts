import { Mastra } from '@mastra/core';
import { createLogger } from '@mastra/core/logger';
import { VercelDeployer } from '@mastra/deployer-vercel';
import { z } from 'zod';

import { createCryptoAgent } from './agents';


const Env = z.object({
  VERCEL_TOKEN: z.string().min(1),
}).parse(process.env)

export const createMastra = ({
  modelProvider,
  modelName,
}: {
  modelProvider: string;
  modelName: string;
}) =>
  new Mastra({
    agents: { cryptoAgent: createCryptoAgent(modelProvider, modelName) },
    logger: createLogger({
      name: 'CONSOLE',
      level: 'debug',
    }),
    deployer: new VercelDeployer({
      teamId: 'team_qWPz08W5A3Swgz9Tz6hnRlGs',
      projectName: 'act-chat-mastra',
      // https://vercel.com/account/settings/tokens
      token: Env.VERCEL_TOKEN
    })
  });

export const mastra = createMastra({
  modelProvider: 'OPEN_AI',
  modelName: 'gpt-4o-mini',
});
