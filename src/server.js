import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from "./utils/env.js";
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './middlewares/logger.js';

import waterRouter from "./routers/water.js";
import authRouter from "./routers/auth.js";
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';


export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.static("uploads"));
    //app.use(logger);

    
    // app.use('/water', waterRouter);
    // app.use('/uploads', express.static(UPLOAD_DIR));
    app.use('/api-docs', swaggerDocs());
    app.use('/auth', authRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

	const port = Number(env("PORT", 3000));
	app.listen(port, () => console.log(`Server is running on ${port}`));
};
