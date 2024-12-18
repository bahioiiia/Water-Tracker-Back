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
  const newpassword = body.password;
  const newDailyNorm = body.dailyNorm;

  if (newpassword) {
    const hashPassword = await bckrypt.hash(newpassword, 10);
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





// export const deleteContactById = async (id, userId) => {
//   // return ContactCollection.findById(id).where('userId').equals(userId);
//   return ContactCollection.findOneAndDelete({ _id: id, userId, });
// };
