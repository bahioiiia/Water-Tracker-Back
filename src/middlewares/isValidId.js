import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {

  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    return next(createHttpError(404, `${userId} not valid user`));

  const { glassId } = req.params;
  if (!isValidObjectId(glassId)) {
    return next(createHttpError(404, `${glassId} not valid id`));

  }
  next();
};