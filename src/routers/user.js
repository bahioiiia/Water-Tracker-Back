import { Router } from "express";
import * as userController from '../controllers/user.js';

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { avatarUpdateSchema, userUpdateSchema } from "../validation/users.js";
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from "../middlewares/authenticate.js";

import { upload } from '../middlewares/upload.js';


const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/', ctrlWrapper(userController.getUserController)); 

userRouter.patch('/avatar', upload.single('photo'), validateBody(avatarUpdateSchema), ctrlWrapper(userController.avatarUpdateController));
// upload.fields([{name: "poster", maxCount: 1}, {name: "subposter", maxCount: 3}])
// upload.array("poster", 10);

userRouter.patch('/', isValidId, validateBody(userUpdateSchema), ctrlWrapper(userController.patchContactController));

//userRouter.delete('/', isValidId, ctrlWrapper(userController.deleteUserController));
export default userRouter;