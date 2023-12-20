/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { ZodError, z } from 'zod';

const envVariablesSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),

  DATABASE_URL: z.string(),

  PORT: z.string().default('3333'),

  ORIGIN: z.string(),

  DISCORD_CLIENT_ID: z.string(),
  DISCORD_SECRET_KEY: z.string(),

  ACCESS_TOKEN_SECRET_KEY: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
});

try {
  const parsed = envVariablesSchema.parse(process.env);

  process.env = {
    ...process.env,
    ...parsed,
  };

  console.info('Environment variables loaded.');
} catch (err: Error | unknown) {
  if (err instanceof ZodError) {
    const variables: { env: string; message: string }[] = err.issues.map((issue) => ({
      env: issue.path.join('.'),
      message: issue.message,
    }));

    console.error('\nWrong environment variables:');

    variables.forEach((variable) => {
      console.error(`- ${variable.env}: ${variable.message}`);
    });

    process.exit(-1);
  }

  throw err;
}

declare global {
  namespace NodeJS {
    // @ts-ignore
    interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
  }
}
