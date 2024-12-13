import { getUser, patchAvatar, patchUser } from '../services/user.js';
import createHttpError from 'http-errors';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import * as path from "node:path";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';


const enableCloudnary = env("ENABLE_CLOUDNARY");

export const getUserController = async (req, res) => {
  const user = req.user;
  const data = await getUser(user);
  res.json({
    stasus: 200,
    message: `Successfull find user`,
    data,
  });
};


export const avatarUpdateController = async (req, res) => {
  const user = req.user;

  let photo = null; //  пуста

  if (req.file) {
    if (enableCloudnary === 'true') {
      photo = await saveFileToCloudinary(req.file, 'photos');
    } else {
      await saveFileToUploadDir(req.file); 
      photo = path.join(req.file.filename); 
    }
  }
  const body = req.body;
  const data = await patchAvatar(user, photo, body);

  if (!data) {
    throw createHttpError(404, `Not found`);
  }
  res.json({
    status: 200,
    message: `Successfully patched a user!`,
    data: data,
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
    data: data,
  });
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

 
