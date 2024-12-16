import { Router } from "express";
import * as userController from '../controllers/user.js';

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { dailyNormUpdateSchema, userUpdateSchema} from '../validation/user.js';
import { isValidUserId } from '../middlewares/isValidId.js';
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from '../middlewares/upload.js';


const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/', ctrlWrapper(userController.getUserController));

//  змінюється body user + newpassord
userRouter.patch('/update', validateBody(userUpdateSchema), ctrlWrapper(userController.patchUserController), );
//  змінюється лише avatar
userRouter.patch('/avatar', isValidUserId, upload.single('avatarUrl'), ctrlWrapper(userController.avatarUpdateController),);

userRouter.patch('/daily', validateBody(dailyNormUpdateSchema), ctrlWrapper(userController.patchdailyNormController), );


export default userRouter;