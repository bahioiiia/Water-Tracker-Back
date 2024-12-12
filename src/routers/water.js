import { Router } from "express";
import * as waterController from '../controllers/water.js';

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { glassAddSchema, glassUpdateSchema } from "../validation/water.js";
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from "../middlewares/authenticate.js";

import { upload } from '../middlewares/upload.js';


const waterRouter = Router();

waterRouter.use(authenticate);

//contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController)); 

waterRouter.post('/', isValidId, ctrlWrapper(waterController.addGlassController));

waterRouter.post('/', validateBody(glassAddSchema), ctrlWrapper(waterController.addGlassController));
// upload.fields([{name: "poster", maxCount: 1}, {name: "subposter", maxCount: 3}])
// upload.array("poster", 10);
//contactsRouter.put('/:contactId', upload.single('photo'), isValidId, validateBody(contactAddSchema), ctrlWrapper(contactsController.upsertContactController));

waterRouter.patch('/:glassId', isValidId, validateBody(glassUpdateSchema), ctrlWrapper(waterController.patchGlassController));

waterRouter.delete('/:glassId', isValidId, ctrlWrapper(waterController.deleteGlassController));

waterRouter.get('/daily', isValidId, ctrlWrapper(waterController.getDailyController));

waterRouter.get('/monthly', isValidId, ctrlWrapper(waterController.getMonthlyController));

export default waterRouter;