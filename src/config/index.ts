import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

const getenv = (key: string, defaultValue: string = '') => {
  const value = process.env[key];

  if (value === undefined) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error('Cannot find the key named: ${key} or the defaultValue not provided');
  }
  return value;
};

process.env.NODE_ENV = getenv('NODE_ENV', 'development');

export const config = {
  port: parseInt(getenv('PORT'), 10),

  databaseUrl: getenv('MONGODB_URI'),

  origins: getenv('ORIGINS').split(','),

  jwt: {
    secret: getenv('JWT_SECRET'),
    algorithm: getenv('JWT_ALGO'),
  },

  logs: {
    level: getenv('LOG_LEVEL', 'silly'),
  },

  api: {
    prefix: '/api',
  },
};

