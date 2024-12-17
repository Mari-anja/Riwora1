import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  company: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  lastContact?: Date;
  nextFollowUp?: Date;
  preferences: {
    communicationChannel: 'email' | 'phone' | 'both';
    frequency: 'daily' | 'weekly' | 'monthly';
  };
  tags: string[];
  notes: Array<{
    content: string;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
  }>;
}

const clientSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['lead', 'prospect', 'customer', 'inactive'],
    default: 'lead'
  },
  lastContact: Date,
  nextFollowUp: Date,
  preferences: {
    communicationChannel: {
      type: String,
      enum: ['email', 'phone', 'both'],
      default: 'email'
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly'
    }
  },
  tags: [String],
  notes: [{
    content: {
      type: String,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

export const Client = mongoose.model<IClient>('Client', clientSchema); 