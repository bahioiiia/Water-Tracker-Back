import Joi from "joi";

export const glassAddSchema = Joi.object({
    date: Joi.date().iso().required(),
    volume: Joi.number().integer().min(0).max(5000).required(),
    curDailyNorm: Joi.number().integer().min(500).max(5000).required(),
});

export const glassUpdateSchema = Joi.object({
    date: Joi.date().iso(),
    volume: Joi.number().integer().min(0).max(5000),
});