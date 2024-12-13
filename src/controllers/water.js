import createHttpError from 'http-errors';

import * as waterServices from '../services/water.js';

import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Water.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { env } from '../utils/env.js';

export const addGlassController = async (req, res) => {
    const { _id: userId } = req.user;
    
    const data = await waterServices.addGlass({ ...req.body, userId });
    res.status(201).json({
        status: 201,
        message: "Successfully created a glass of water!",
        data,
    });
};

export const deleteGlassController = async (req, res) => {
    const { glassId } = req.params;
    const { _id: userId } = req.user;
    const data = await waterServices.deleteGlass(glassId, userId);
    if (!data) { throw createHttpError(404, `Glass id:${glassId} not found`); }

    res.status(204).send();
};

/*------------------ ALL BELOW NOT TESTED AT ALL!! ------------------*/

export const patchContactController = async (req, res) => {
    const { glassId } = req.params;
    const { _id: userId } = req.user;

    const result = await waterServices.updateContact(glassId, userId, req.body);
    if (!result) { throw createHttpError(404, 'Glass not found'); }

    res.status(200).json({
        status: 200,
        message: 'Glass patched successfully',
        data: result.data,
    });
};

/*------------------ ALL BELOW ARE JUST TEMPLATE. NOT WORKING !! ------------------*/

export const getDailyController = async (req, res, next) => {
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    const filter = parseFilterParams(req.query);
    const { _id: userId } = req.user;
    filter.userId = userId;

    const data = await waterServices.getGlasses({sortBy, sortOrder, filter });
    res.json({
        status: 200,
        message: 'Successfully found all glasses per month!',
        data,
    });
};

export const getMonthlyController = async (req, res, next) => {
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    const filter = parseFilterParams(req.query);
    const { _id: userId } = req.user;
    filter.userId = userId;

    const data = await waterServices.getGlasses({sortBy, sortOrder, filter });
    res.json({
        status: 200,
        message: 'Successfully found all glasses per month!',
        data,
    });
};