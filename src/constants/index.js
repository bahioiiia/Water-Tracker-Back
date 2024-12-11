import path from 'node:path';

export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
};

export const CLOUDINARY = {
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
};

//export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
//export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
//export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const TEMPLATES_DIR = path.resolve("src", "templates");
export const TEMP_UPLOAD_DIR = path.resolve("temp");
export const UPLOAD_DIR = path.resolve("uploads");
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');