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

function publicIdFromUrl(url, folder) {
    const urlParts = url.split('/'); // Розбиваємо URL на частини
    const fileName = urlParts[urlParts.length - 1]; // Ім'я файлу з розширенням

    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.'); // Видаляємо розширення

    return folder ? `${folder}/${fileNameWithoutExtension}`: `${fileNameWithoutExtension}`;
}

export const saveFileToCloudinary = async (file, folder, oldAvatarUrl) => {
    
    try {
        const response = await cloudinary.uploader.upload(file.path, { folder, });
        if (oldAvatarUrl) { // Якщо старий аватар був, то видаляємо його з Cloudinary
            const publicId = publicIdFromUrl(oldAvatarUrl, folder);
            await cloudinary.uploader.destroy(publicId);
        }
        return response.secure_url;
    }
    //catch (error) { throw error; }
    finally { await unlink(file.path); }
};
