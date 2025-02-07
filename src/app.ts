import { config } from '@/config';
import express from 'express';
import { createServer } from 'node:http';
import { Logger } from './loaders/logger';
import '@/errors'

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  const loaders = await import("./loaders")
  await loaders.default({ expressApp: app })

  httpServer.listen(config.port, () => {
    Logger.info(`Server listening on port: ${config.port}`);
  }).on('error', err => {
    Logger.error('Server failed to start:', err);
    process.exit(1);
  });
}

startServer();
