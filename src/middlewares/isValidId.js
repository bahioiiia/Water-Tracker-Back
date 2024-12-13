import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidUserId = (req, res, next) => {
  const userId = req.user._id;
  if (!isValidObjectId(userId)) {
    return next(createHttpError(404, `${userId} not valid userId`));
  }
  next();
};

export const isValidGlassId = (req, res, next) => {
  const { glassId } = req.params;
  if (!isValidObjectId(glassId)) {
    return next(createHttpError(404, `${glassId} not valid glassId`));
  }
  next();
};