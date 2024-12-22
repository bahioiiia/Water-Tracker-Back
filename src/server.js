import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { logger } from './middlewares/logger.js';
import userRouter from "./routers/user.js";
import waterRouter from "./routers/water.js";
import authRouter from "./routers/auth.js";
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const allowedOrigins = ['https://water-tracker-murex.vercel.app', 'http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

export const setupServer = () => {
    const app = express();

    app.use(cors(corsOptions));
//    app.use(cors({ origin: 'https://water-tracker-murex.vercel.app', credentials: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.static('uploads'));
    //app.use(logger);
    app.use('/user', userRouter);
    app.use('/water', waterRouter);
    app.use('/uploads', express.static(UPLOAD_DIR));
    app.use('/api-docs', swaggerDocs());
    app.use('/auth', authRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

    const port = Number(env('PORT', 3000));
    app.listen(port, () => console.log(`Server is running on ${port}`));
};
