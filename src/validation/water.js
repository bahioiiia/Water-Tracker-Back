import Joi from "joi";

export const glassAddSchema = Joi.object({
    date: Joi.date()
    .iso()//date: "2024-12-12"
    .required(),
    volume: Joi.number()
    .integer()
    .min(0)
    .max(5000)
    .required(),
});