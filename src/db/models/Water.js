import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';

const waterSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    dailyNorm: {
      type: Number,
      required: true,
    },
    newDailyNorm: {
      type: Number,
      required: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

waterSchema.post('save', handleSaveError);
waterSchema.pre('findOneAndUpdate', setUpdateSettings);
waterSchema.post('findOneAndUpdate', handleSaveError);

export const sortByList = ['date'];

const waterCollection = model('water', waterSchema);

export default waterCollection;