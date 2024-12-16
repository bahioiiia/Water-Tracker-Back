import waterCollection from '../db/models/Water.js';
import UserCollection from '../db/models/User.js';

export const addGlass = async ({ dailyNorm, userId, body}) => {
    const data = await waterCollection.create({ ...body, dailyNorm: dailyNorm, userId: userId, });
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
  // console.log(user, user);

  const dailyNorm = user.dailyNorm || 1500; //default Daily Norm

  const consumedPercentage = ((totalWater / dailyNorm) * 100).toFixed(0);

  return {
    date: date,
    // dailyNorma: ${(dailyNorm / 1000).toFixed(1)} L,
    // totalWater: ${(totalWater / 1000).toFixed(1)} L,
    dailyNorma: dailyNorm,
    totalWater,
    consumedPercentage: `${consumedPercentage}%`,
    numberGlasses: logs.length,
    logs: logs.map((log) => ({
      id: log._id,
      volume: log.volume,
      date: log.date,
    })),
  };
};

export const getMonthly = async (userId, date) => {
  const requestDate = new Date(date);

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (requestDate > today) {
    throw new Error('Date cannot be in the future.');
  }

  const [year, monthIndex] = date.split('-');
  const startOfMonth = new Date(year, monthIndex - 1, 1);
  const endOfMonth = new Date(year, monthIndex, 0);

  const logs = await waterCollection.find({
    userId,
    date: { $gte: startOfMonth, $lte: endOfMonth },
  });

  const user = await UserCollection.findById(userId);
  const dailyNorm = user.dailyNorm || 1500;

  const groupedByDay = logs.reduce((acc, log) => {
    const day = new Date(log.date).toISOString().split('T')[0];
    if (!acc[day]) {
      acc[day] = { totalVolume: 0, totalGlasses: 0, count: 0 };
    }
    acc[day].totalVolume += log.volume;
    acc[day].count++;
    return acc;
  }, {});

  const result = Object.keys(groupedByDay).map((day) => {
    const { totalVolume, count } = groupedByDay[day];
    const consumedPercentage = ((totalVolume / dailyNorm) * 100).toFixed(0);
    return {
      date: date,
      // dailyNorma: ${(dailyNorm / 1000).toFixed(1)} L,
      dailyNorma: dailyNorm,
      consumedPercentage: `${consumedPercentage}%`,
      numberGlasses: count,
    };
  });

  result.sort((a, b) => new Date(a.date) - new Date(b.date));

  return result;
};