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

//  змінив шлях т.я. не допустимо два одинакові шляхи в свагері
waterRouter.patch('/:glassId', isValidGlassId, validateBody(glassUpdateSchema), ctrlWrapper(waterController.patchGlassController));
waterRouter.delete('/glass/:glassId', isValidGlassId, ctrlWrapper(waterController.deleteGlassController));


//  видалив / т.я. не допустимий шлях в свагері
waterRouter.get('/daily', ctrlWrapper(waterController.getDailyController));
waterRouter.get('/monthly', ctrlWrapper(waterController.getMonthlyController));

export default waterRouter;
