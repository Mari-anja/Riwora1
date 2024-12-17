import mongoose from 'mongoose';
import config from './config/config';

export const connectDatabase = async (): Promise<void> => {
  try {
    // Temporary mock connection
    console.log('Database connection mocked for development');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}; 