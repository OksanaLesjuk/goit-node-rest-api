import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import 'dotenv/config.js'


import { User } from "../models/user.js";
import { HttpError } from "../helpers/HttpError.js";


const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //додаткова перевірка , чи є користувач з таким емайлом, для випадку, якщо портібно кастомний меседж
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email in use");
        }

        //перед зберіганням хешуємо пароль

        const hashPasasword = await bcrypt.hash(password, 10);

        //створюємо нового користувача
        const newUser = await User.create({ ...req.body, password: hashPasasword });
        res.status(201).json({
            "user": {
                "email": newUser.email,
                "subscription": newUser.subscription
            }
        })
    } catch (error) {
        next(error)

    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
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

        res.json({ token })
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
        await User.findByIdAndUpdate(_id, { token: null })
        res.status(20).json({ message: "No content" })

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


export {
    register,
    login,
    getCurrent,
    logout,
    updateUser
}