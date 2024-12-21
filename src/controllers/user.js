import { getUser, patchAvatar, patchDailyNorm, patchUser } from '../services/user.js';
import createHttpError from 'http-errors';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import * as path from "node:path";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';


const enableCloudnary = env("ENABLE_CLOUDINARY");

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
    const data = await patchDailyNorm(user, body);
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


 
