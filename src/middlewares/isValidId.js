import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { glassId } = req.params;
  if (!isValidObjectId(glassId)) {
    return next(createHttpError(404, `${glassId} not valid id`));
  }
  next();
};