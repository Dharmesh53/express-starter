import winston from 'winston';
import { config, Env } from '@/config';
import morgan from "morgan"

const transports = [];
if (process.env.NODE_ENV !== Env.DEV) {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
        winston.format.colorize({ all: true }),
        winston.format.align(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.timestamp({ format: 'hh:mm:ss.SSS A' }),
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`),
      ),
    }),
  );
}

const Logger = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  transports,
});

const morganStream = {
  write: (message: string) => {
    Logger.info(message.trim())
  }
}

const skip = () => {
  return config.nodeEnv !== Env.DEV
}

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream: morganStream, skip }
)

export { Logger, morganMiddleware };
