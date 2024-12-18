import { getUser, patchAvatar, patchUser } from '../services/user.js';
import createHttpError from 'http-errors';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import * as path from "node:path";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';


const enableCloudnary = env("ENABLE_CLOUDNARY");

export const getUserController = async (req, res) => {
  const data = await getUser(req.user);
    if (!data) {
      throw createHttpError(404, `Not found`);
    }
  res.json({
    stasus: 200,
    message: `Successfull find user`,
    data,
  });
};


export const patchUserController = async (req, res) => {
  const user = req.user;
  const body = req.body;
  const data = await patchUser(user, body);

  if (!data) {
    throw createHttpError(404, `Not found`);
  }
  res.json({
    status: 200,
    message: `Successfully patched a user!`,
    data,
  });
};


export const avatarUpdateController = async (req, res) => {
  const user = req.user;
  let avatarUrl = null; //  пуста
// console.log(`user`, user);
  if (req.file) {
    if (enableCloudnary === 'true') {
      avatarUrl = await saveFileToCloudinary(req.file, 'avatarUrl');
    } else {
      await saveFileToUploadDir(req.file);
      avatarUrl = path.join(req.file.filename);
    }
  }
  
  const data = await patchAvatar(user, avatarUrl);

  if (!data) {
    throw createHttpError(404, `Not found`);
  }
  res.json({
    status: 200,
    message: `Successfully patched a user!`,
    data: data,
  });
};


export const patchdailyNormController = async (req, res) => {
  const user = req.user;
  const body = req.body;
  if (body) {
    const data = await patchUser(user, body);
    if (!data) {
      throw createHttpError(404, `Not found`);
    }
    res.json({
      status: 200,
      message: `Successfully patched a dailyNorm!`,
      data: data,
    });
  }
};


// export const deleteUserController = async (req, res) => {
//   const { id } = req.params;
//   const userId = req.user.userId;
  
//   const data = await deleteContactById(id, userId);
//     // console.log(data);
//     if (!data) {
//       throw createHttpError(404, `Contact id= ${id} not found`);
//     }
//     res.status(204).json();
// };

 
