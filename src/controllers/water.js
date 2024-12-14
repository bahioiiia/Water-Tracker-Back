import createHttpError from 'http-errors';

import * as waterServices from '../services/water.js';

export const addGlassController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await waterServices.addGlass({ ...req.body, userId });

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
  const { _id } = req.user;
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: 'Date is required.' });
  }
  const dailyData = await waterServices.getDaily(_id, date);

  if (dailyData.logs.length === 0) {
    return res.status(404).json({
      message: `No water logs found for user ${_id} on date ${date}`,
    });
  }
  res.status(200).json(dailyData);
};

export const getMonthlyController = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: 'Date is required.' });
  }

  const monthlyData = await waterServices.getMonthly(_id, date);

  if (monthlyData.length === 0) {
    return res.status(404).json({
      message: `No water logs found for user ${_id} on date ${date}`,
    });
  }

  res.status(200).json(monthlyData);
};
