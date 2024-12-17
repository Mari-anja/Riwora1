import { User, IUser } from '../models/User';
import { Company } from '../models/Company';
import jwt from 'jsonwebtoken';
import config from '../config/config';

interface CreateUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'salesperson';
  companyId: string;
}

interface LoginResponse {
  user: Partial<IUser>;
  token: string;
}

export class UserService {
  static async createUser(input: CreateUserInput): Promise<IUser> {
    const company = await Company.findById(input.companyId);
    if (!company) {
      throw new Error('Company not found');
    }

    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user = new User({
      ...input,
      company: input.companyId
    });

    await user.save();
    return user;
  }

  static async login(email: string, password: string): Promise<LoginResponse> {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.auth.jwtSecret,
      { expiresIn: config.auth.expiresIn }
    );

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return {
      user: userWithoutPassword,
      token
    };
  }

  static async getTeamMembers(companyId: string) {
    return User.find({ company: companyId }).select('-password');
  }
} 