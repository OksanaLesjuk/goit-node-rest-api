import { Schema, model } from "mongoose";
import { handleMangoosErr } from "../helpers/handleMangoosErr.js";
import Joi from "joi";


const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    avatarURL: {
        type: String
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
},
    { versionKey: false })


userSchema.post("save", handleMangoosErr)

const User = model('user', userSchema);



const registerJoiSchemas = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    // subscription: Joi.string().valid("starter", "pro", "business").default("starter"),
})

const emailJoiSchemas = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'missing required field email"'

    })
})

const loginJoiSchemas = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})
const subscriptionJoiSchemas = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").default("starter")
})

export {
    User,
    registerJoiSchemas,
    emailJoiSchemas,
    loginJoiSchemas,
    subscriptionJoiSchemas
}