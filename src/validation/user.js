import Joi from 'joi';
// import { typeContacts } from '../constants/contacts.js';
import { emailRegexp, userGender } from '../constants/users.js';

export const userUpdateSchema = Joi.object({
  name: Joi.string().min(8).max(20),
  gender: Joi.string().valid(...userGender),
  email: Joi.string().min(3).max(20).pattern(emailRegexp),
  password: Joi.string().min(3).max(20),
  newpassword: Joi.string().min(8).max(20),
});
