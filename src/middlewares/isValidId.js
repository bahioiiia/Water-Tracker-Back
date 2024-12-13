import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    return next(createHttpError(404, `${userId} not valid user`));
  }
  next();
};