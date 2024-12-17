import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/config';
import { connectDatabase } from './database';
import type { CorsOptions } from 'cors';
import { errorHandler } from './middleware/errorHandler';

// Add type declarations
import '@types/morgan';
import '@types/morgan';
import routes from './routes';

// Add type for error handling
interface ErrorWithStatus extends Error {
  status?: number;
}

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Add health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api', routes);

// Improve error handler type safety
app.use((err: ErrorWithStatus, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

// Start server
const startServer = async () => {
  try {
    // Temporarily skip database connection
    console.log('Starting server without database...');
    const server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      server.close(() => {
        console.log('Server shutdown complete');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app; 
