import bcrypt from "bcryptjs"


import { User } from "../models/user.js";
import { HttpError } from "../helpers/HttpError.js";


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

export {
    register
}