import waterCollection from '../db/models/Water.js';
import UserCollection from '../db/models/User.js';

export const addGlass = async ({user, dailyNorm, userId, body, newDailyNorm}) => {
  
  if (!newDailyNorm) {
      const data = await waterCollection.create({...body, dailyNorm: dailyNorm, userId: userId});
    return data;
  }

  const data = await waterCollection.create({ ...body, dailyNorm: newDailyNorm, userId: userId });
  const newData = await UserCollection.findOneAndUpdate(user, { ...body, dailyNorm: newDailyNorm }, { new: true });
  
  return data;
};

export const patchGlass = async (glassId, userId, payload, options = {}) => {
  const rawResult = await waterCollection.findOneAndUpdate(
    { _id: glassId, userId },
    payload,
    { ...options, new: true, includeResultMetadata: true },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteGlass = async (contactId, userId) =>
  await waterCollection.findOneAndDelete({ _id: contactId, userId });



export const getDaily = async (userId, date) => {
  const requestDate = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (requestDate > today) {
    throw new Error('Date cannot be in the future.');
  }
  if (!date) {
    throw new Error('Date is required.');
  }
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  const logs = await waterCollection
    .find({
      userId,
      date: { $gte: dayStart, $lte: dayEnd },
    })
    .sort({ date: 1 });

  const totalWater = logs.reduce((sum, log) => sum + log.volume, 0);

  const user = await UserCollection.findById(userId);
  // console.log(`user`, user);

  const dailyNorm = user.dailyNorm || 1500; //default Daily Norm

  const consumedPercentage = ((totalWater / dailyNorm) * 100).toFixed(0);

  return {
    userId,
    date: date,
    dailyNorma: `${(dailyNorm / 1000).toFixed(1)} L`,
    totalWater: `${(totalWater / 1000).toFixed(1)} L`,
    consumedPercentage: `${consumedPercentage}%`,
    numberGlasses: logs.length,
    logs: logs.map((log) => ({
      id: log._id,
      volume: log.volume,
      date: log.date,
    })),
  };
};

export const getMonthly = async ({
  sortBy = 'date',
  sortOrder = 'asc',
  filter = {},
}) => {
  const query = waterCollection.find();
  if (filter.userId) {
    query.where('userId').equals(filter.userId);
  }
  const data = await query.find().sort({ [sortBy]: sortOrder });
  return data;
};
