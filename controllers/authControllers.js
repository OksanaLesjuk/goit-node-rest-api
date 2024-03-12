import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import 'dotenv/config.js'
import gravatar from "gravatar"
import path from 'path';
import fs from "fs/promises"

import { User } from "../models/user.js";
import { HttpError } from "../helpers/HttpError.js";
import { nanoid } from "nanoid";
import { sendEmail } from "../helpers/sendEmail.js";

const { SECRET_KEY, BAZE_URL } = process.env;


const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        //додаткова перевірка , чи є користувач з таким емайлом, для випадку, якщо портібно кастомний меседж
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email in use");
        }

        //перед зберіганням хешуємо пароль

        const hashPasasword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const verificationToken = nanoid();
        //створюємо нового користувача
        const newUser = await User.create({ ...req.body, password: hashPasasword, avatarURL, verificationToken });
        console.log(newUser);
        const verifyEmail = {
            Recipients: {
                To: [email]
            },
            Content: {
                Body: [
                    {
                        ContentType: "HTML",
                        Charset: "utf-8",
                        Content: `<a target='_blank' href = '${BAZE_URL}/api/users/verify/${verificationToken}'>Click verify email</a>`
                    },

                ],

                Subject: "Verify email"
            }
        }

        await sendEmail(verifyEmail);
        res.status(201).json({
            "user": {
                "email": newUser.email,
                "subscription": newUser.subscription,

            }
        })
    } catch (error) {
        next(error)

    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;

        const user = await User.findOne({ verificationToken });
        if (!user) {
            throw HttpError(404, "User not found ");
        }
        await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null })
        res.status(200).json({ message: 'Verification successful' })

    } catch (error) {
        next(error)
    }
}

const resendVerifyEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email not found")
        };
        if (user.verify) {
            res.status(400).json({
                "message": "Verification has already been passed"
            })
        }
        const verifyEmail = {
            Recipients: {
                To: [email]
            },
            Content: {
                Body: [
                    {
                        ContentType: "HTML",
                        Charset: "utf-8",
                        Content: `<a target='_blank' href = '${BAZE_URL}/api/users/verify/${user.verificationToken}'>Click verify email</a>`
                    },

                ],

                Subject: "Verify email"
            }
        }
        await sendEmail(verifyEmail);
        res.status(200).json({
            "message": "Verification email sent"
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }

        if (!user.verify) {
            throw HttpError(404, "User not found");
        }

        const loginCompare = await bcrypt.compare(password, user.password)

        if (!loginCompare) {
            throw HttpError(401, "Email or password is wrong");
        }
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '48h' });
        await User.findByIdAndUpdate(user._id, { token });

        res.status(200).json({
            "token": token,
            "user": {
                "email": user.email,
                "subscription": user.subscription
            }
        })
    }
    catch (error) {
        next(error)
    }

}

const getCurrent = async (req, res, next) => {
    try {

        const { email, subscription } = req.user;

        res.status(200).json({ email, subscription })

    } catch (error) {
        next(error)

    }
}


const logout = async (req, res, next) => {
    try {

        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: null });
        res.status(204).json({ message: "No content" })

    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { _id } = req.user;

        const user = await User.findByIdAndUpdate(_id, req.body, { new: true })

        res.status(200).json({ user })


    } catch (error) {
        next(error)
    }
}

const updateAvatar = async (req, res, next) => {
    try {
        const { _id } = req.user;


        await fs.rename(
            req.file.path,
            path.join(process.cwd(), "public/avatars", req.file.filename)
        )
        const avatarURL = path.join("avatars", req.file.filename);

        const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })

        res.status(200).json({ avatarURL })


    } catch (error) {
        next(error)
    }
}



export {
    register,
    login,
    getCurrent,
    logout,
    updateUser,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail
}