import UserCollection from '../db/models/User.js';
import bckrypt from 'bcrypt';


//  вся логіка запитів 
export const getUser = async (user) => {
  const data = await UserCollection.find(user);
return { data };
};

export const patchAvatar = async (user, photo) => {
  const data = await UserCollection.findOneAndUpdate(
    user,
    { photo: photo },
    { new: true },
  ); // new: true повернути оновлений об'єкт
  return data;
}; 

export const patchUser = async (user, body) => {
    const newpassword = body.newpassword;
  
  if (newpassword) {
    const hashPassword = await bckrypt.hash(newpassword, 10);
    const data = await UserCollection.findOneAndUpdate(user, { ...body, password: hashPassword }, { new: true },);
  return data;
  }
  
  const data = await UserCollection.findOneAndUpdate(user,{ ...body},{ new: true },);
return data;
}; 



// export const deleteContactById = async (id, userId) => {
//   // return ContactCollection.findById(id).where('userId').equals(userId);
//   return ContactCollection.findOneAndDelete({ _id: id, userId, });
// };
