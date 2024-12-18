import Joi from "joi";

import { emailRegexp } from "../constants/users.js";

// signup
export const authRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(8).max(64).required(),
});

// signin
export const authLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(64).required(),
});

export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
});
// OAuth
export const loginWithGoogleOAuthSchema = Joi.object({
    code: Joi.string().required(),
});