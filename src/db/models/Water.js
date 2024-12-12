import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const waterSchema = new Schema({
    volume: {
        type: String,
        required: true,
    },
    curDailyNorm: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { versionKey: false, timestamps: true });

waterSchema.post("save", handleSaveError);

waterSchema.pre("findOneAndUpdate", setUpdateSettings);

waterSchema.post("findOneAndUpdate", handleSaveError);

export const sortByList = [
    'date',
];

const waterCollection = model('contacts', waterSchema);

export default waterCollection;
