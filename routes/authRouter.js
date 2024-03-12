import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { emailJoiSchemas, loginJoiSchemas, registerJoiSchemas, subscriptionJoiSchemas, } from "../models/user.js";
import { getCurrent, login, logout, register, resendVerifyEmail, updateAvatar, updateUser, verifyEmail } from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
import { jimp } from "../middlewares/jimp.js";

const authRouter = express.Router();

authRouter.patch("/", authenticate, validateBody(subscriptionJoiSchemas), updateUser);

authRouter.post("/register", upload.single("avatar"), validateBody(registerJoiSchemas), register);

authRouter.get("/verify/:verificationToken", verifyEmail)

authRouter.post("/verify", validateBody(emailJoiSchemas), resendVerifyEmail)

authRouter.post("/login", validateBody(loginJoiSchemas), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), jimp, updateAvatar)

export default authRouter;