import createHttpError from 'http-errors';

import * as waterServices from '../services/water.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Water.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { env } from '../utils/env.js';

export const addGlassController = async (req, res) => {
    const { _id: userId } = req.user;
    
    const glassWater = await waterServices.createGlassWater({ ...req.body, userId });
    res.status(201).json({
        status: 201,
        message: "Successfully created a glass water!",
        data: glassWater,
    });

};

export const getDailyController = async (req, res, next) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
    //console.log("contr", page, perPage, sortBy, sortOrder);

    const filter = parseFilterParams(req.query);
    const { _id: userId } = req.user;
    filter.userId = userId;

    const data = await waterServices.getContacts({ page, perPage, sortBy, sortOrder, filter });
    res.json({
        status: 200,
        message: 'Successfully found all glasses per month!',
        data,
    });
};