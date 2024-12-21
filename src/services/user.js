import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';
import bckrypt from 'bcrypt';

//  вся логіка запитів
export const getUser = async (payload) => {
  const data = await UserCollection.findOne(payload);
  return {
    name: data.name,
    email: data.email,
    gender: data.gender,
    dailyNorm: data.dailyNorm,
    avatarUrl: data.avatarUrl,
  };
};


export const patchUser = async (user, body) => {
  const outDatePassword = body.outDatePassword;
  const newPassword = body.newPassword;

    if (!newPassword) {
      const data = await UserCollection.findOneAndUpdate(
        user,
        { ...body },
        { new: true },
      );
      return {
        name: data.name,
        email: data.email,
        gender: data.gender,
        dailyNorm: data.dailyNorm,
        avatarUrl: data.avatarUrl,
      };
  }
  
  const passwordCompare = await bckrypt.compare(outDatePassword, user.password);
 
  if (!passwordCompare) {
    throw createHttpError(401, 'Password invalid');
  }

  if (passwordCompare) {
      const hashPassword = await bckrypt.hash(newPassword, 10);

      const data = await UserCollection.findOneAndUpdate(
        user,
        { ...body, password: hashPassword },
        { new: true },
      );
      return {
        name: data.name,
        email: data.email,
        gender: data.gender,
        dailyNorm: data.dailyNorm,
        avatarUrl: data.avatarUrl,
      };
    }


};

export const patchDailyNorm = async (user, body) => {
  const newDailyNorm = body.dailyNorm;

  if (newDailyNorm) {
    const data = await UserCollection.findOneAndUpdate(
      user,
      { ...body, dailyNorm: newDailyNorm },
      { new: true },
    );
    return {
      name: data.name,
      email: data.email,
      gender: data.gender,
      dailyNorm: data.dailyNorm,
      avatarUrl: data.avatarUrl,
    };
  }
};

export const patchAvatar = async (user, avatarUrl) => {
  const data = await UserCollection.findOneAndUpdate(
    user,
    { avatarUrl: avatarUrl },
    { new: true },
  );
  return {
    name: data.name,
    email: data.email,
    gender: data.gender,
    dailyNorm: data.dailyNorm,
    avatarUrl: data.avatarUrl,
  };
};
