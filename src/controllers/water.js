import createHttpError from 'http-errors';

import * as waterServices from '../services/water.js';

import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Water.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

// import { env } from '../utils/env.js';

export const addGlassController = async (req, res) => {
  const user = req.user;
  const { _id: userId, dailyNorm } = req.user;
  const newDailyNorm = req.body.dailyNorm;
  const body = req.body;
  
  const data = await waterServices.addGlass({ user, body, userId, dailyNorm, newDailyNorm});
  res.status(201).json({
    status: 201,
    message: 'Successfully created a glass of water!',
    data,
  });
};

export const deleteGlassController = async (req, res) => {
  const { glassId } = req.params;
  const { _id: userId } = req.user;
  const data = await waterServices.deleteGlass(glassId, userId);
  if (!data) {
    throw createHttpError(404, `Glass id:${glassId} not found`);
  }

  res.status(204).send();
};

/*------------------ ALL BELOW NOT TESTED AT ALL!! ------------------*/

export const patchGlassController = async (req, res) => {
  const { glassId } = req.params;
  const { _id: userId } = req.user;

  const result = await waterServices.patchGlass(glassId, userId, req.body);
  if (!result) {
    throw createHttpError(404, 'Glass not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Glass patched successfully',
    data: result.data,
  });
};

export const getDailyController = async (req, res, next) => {
  const { userId } = req.params;
  const { date } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  if (!date) {
    return res.status(400).json({ message: 'Date is required.' });
  }
  const dailyData = await waterServices.getDaily(userId, date);

  if (dailyData.logs.length === 0) {
    return res.status(404).json({
      message: `No water logs found for user ${userId} on date ${date}`,
    });
  }
  res.status(200).json(dailyData);
};

/*------------------ ALL BELOW ARE JUST TEMPLATE. NOT WORKING !! ------------------*/

export const getMonthlyController = async (req, res, next) => {
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseFilterParams(req.query);
  const { _id: userId } = req.user;
  filter.userId = userId;

  const data = await waterServices.getGlasses({ sortBy, sortOrder, filter });
  res.json({
    status: 200,
    message: 'Successfully found all glasses per month!',
    data,
  });
};
