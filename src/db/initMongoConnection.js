/* mongodb+srv://ivan:<db_password>@cluster0.x2ftn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 */

import mongoose from 'mongoose';

import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    await mongoose.connect(`mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,);
    console.log('MongoDB connection successfully established!');
  } catch (error) {
    console.log(`Error while setting up mongo connection ${error.message}`);
    throw error;
  }
};