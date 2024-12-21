import Joi from 'joi';
import { emailRegexp, userGender } from '../constants/users.js';

export const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(32),
  gender: Joi.string().valid(...userGender),
  email: Joi.string().min(3).max(20).pattern(emailRegexp),
  password: Joi.string().min(8).max(64),
  outDatePassword: Joi.string().min(8).max(64),
  newPassword: Joi.string().min(8).max(64),
});

export const dailyNormUpdateSchema = Joi.object({
  dailyNorm: Joi.number().min(50).max(5000),
});
