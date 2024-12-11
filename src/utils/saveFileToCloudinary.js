import {v2 as cloudinary} from "cloudinary";
import {unlink} from "node:fs/promises";

import { env } from "./env.js";
import { CLOUDINARY } from '../constants/index.js';

const cloud_name = env(CLOUDINARY.CLOUD_NAME);
const api_key = env(CLOUDINARY.API_KEY);
const api_secret = env(CLOUDINARY.API_SECRET);

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

export const saveFileToCloudinary = async (file, folder) => {
    try {
        const response = await cloudinary.uploader.upload(file.path, { folder,});
        return response.secure_url;
    }
    //catch (error) { throw error; }
    finally { await unlink(file.path); }
};
