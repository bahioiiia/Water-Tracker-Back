import Joi from "joi";

import { emailRegexp } from "../constants/users.js";

// signup
export const authRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

// signin
export const authLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
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