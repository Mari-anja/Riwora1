/// <reference types="node" />

interface Config {
  port: number;
  environment: string;
  database: {
    url: string;
    name: string;
  };
  auth: {
    jwtSecret: string;
    expiresIn: string;
  };
  ai: {
    openaiApiKey: string;
    modelName: string;
  };
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000'),
  environment: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017',
    name: process.env.DB_NAME || 'riwora'
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h'
  },
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    modelName: 'gpt-4-turbo-preview'
  }
};

export default config; 