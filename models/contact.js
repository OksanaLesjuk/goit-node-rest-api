import { Schema, model } from "mongoose";
import { handleMangoosErr } from "../helpers/handleMangoosErr.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },

    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
},
    { versionKey: false })
//встановлюєм обробник на подію save
contactSchema.post("save", handleMangoosErr)



export const Contact = model('contact', contactSchema);

