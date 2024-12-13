import { Router } from "express";
import * as waterController from '../controllers/water.js';

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { glassAddSchema, glassUpdateSchema } from "../validation/water.js";
import { isValidGlassId } from '../middlewares/isValidId.js';
import { authenticate } from "../middlewares/authenticate.js";

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.post('/glass', validateBody(glassAddSchema), ctrlWrapper(waterController.addGlassController));

waterRouter.patch('/glass/:glassId', isValidGlassId, validateBody(glassUpdateSchema), ctrlWrapper(waterController.patchGlassController));
waterRouter.delete('/glass/:glassId', isValidGlassId, ctrlWrapper(waterController.deleteGlassController));

waterRouter.get('/daily/:userId', ctrlWrapper(waterController.getDailyController));
waterRouter.get('/monthly', ctrlWrapper(waterController.getMonthlyController));

export default waterRouter;
