import 'reflect-metadata';

import { config } from '@/config';

import express from 'express';

import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  const loaders = await import("./loaders")
  await loaders.default({ expressApp: app })

  app.listen(config.port, () => {
    Logger.info(`Server listening on port: ${config.port}`);
  }).on('error', err => {
    Logger.error('Server failed to start:', err);
    process.exit(1);
  });
}

startServer();
