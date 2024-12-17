import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  domain: string;
  settings: {
    followUpDelay: number;
    aiTone: 'formal' | 'friendly' | 'casual';
    notificationPreferences: {
      email: boolean;
      slack: boolean;
    };
  };
  integrations: {
    crm?: {
      type: 'hubspot' | 'salesforce';
      apiKey: string;
    };
    email?: {
      provider: 'gmail' | 'outlook';
      configured: boolean;
    };
    slack?: {
      webhookUrl: string;
      channelId: string;
    };
  };
}

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  domain: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  settings: {
    followUpDelay: {
      type: Number,
      default: 48, // hours
    },
    aiTone: {
      type: String,
      enum: ['formal', 'friendly', 'casual'],
      default: 'friendly'
    },
    notificationPreferences: {
      email: {
        type: Boolean,
        default: true
      },
      slack: {
        type: Boolean,
        default: false
      }
    }
  },
  integrations: {
    crm: {
      type: {
        type: String,
        enum: ['hubspot', 'salesforce']
      },
      apiKey: String
    },
    email: {
      provider: {
        type: String,
        enum: ['gmail', 'outlook']
      },
      configured: {
        type: Boolean,
        default: false
      }
    },
    slack: {
      webhookUrl: String,
      channelId: String
    }
  }
}, {
  timestamps: true
});

export const Company = mongoose.model<ICompany>('Company', companySchema); 