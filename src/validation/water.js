import Joi from "joi";

export const glassAddSchema = Joi.object({
  date: Joi.date().iso().required(),
  volume: Joi.number().min(0).max(5000).required(),
  dailyNorm: Joi.number().min(50).max(15000)
});

export const glassUpdateSchema = Joi.object({
    date: Joi.date().iso(),
    volume: Joi.number().integer().min(0).max(5000),
});