import waterCollection from "../db/models/Water.js";

export const addGlass = async payload => await waterCollection.create(payload);

export const patchGlass = async ( glassId, userId, payload, options = {}) => {
    const rawResult = await waterCollection.findOneAndUpdate(
        { _id: glassId, userId },
        payload,
        { ...options, new: true, includeResultMetadata: true, });
    if (!rawResult || !rawResult.value) return null;
    return {
        data: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted),
    };
};

export const deleteGlass = async (contactId, userId) => await waterCollection.findOneAndDelete({ _id: contactId, userId });

export const getDaily = async ({ sortBy = 'date', sortOrder = 'asc', filter={},}) => {
    const query = waterCollection.find();
    if (filter.userId) {
        query.where('userId').equals(filter.userId);
    }
    const data = await query.find().sort({ [sortBy]: sortOrder });    
    return data;
};

export const getMonthly = async ({ sortBy = 'date', sortOrder = 'asc', filter={},}) => {
    const query = waterCollection.find();
    if (filter.userId) {
        query.where('userId').equals(filter.userId);
    }
    const data = await query.find().sort({ [sortBy]: sortOrder });    
    return data;
};