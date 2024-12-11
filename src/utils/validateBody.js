import createHttpError from 'http-errors';

const validateBody = (schema) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) { return next(createHttpError(400, error.message)); };
        next();
    };
    return func;
};

export default validateBody;