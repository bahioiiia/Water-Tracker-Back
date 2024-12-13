import { Router } from "express";
import * as userController from '../controllers/user.js';

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { userUpdateSchema} from '../validation/user.js';
import { isValidUserId } from '../middlewares/isValidId.js';
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from '../middlewares/upload.js';


const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/', ctrlWrapper(userController.getUserController));

//  змінюється лише avatar
userRouter.patch('/avatar', isValidUserId, upload.single('photo'), ctrlWrapper(userController.avatarUpdateController),);
//  змінюється body user + newpassord
userRouter.patch('/', validateBody(userUpdateSchema), ctrlWrapper(userController.patchUserController));

// userRouter.delete('/', isValidId, ctrlWrapper(userController.deleteUserController));
export default userRouter;