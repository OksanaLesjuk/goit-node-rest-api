import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { loginJoiSchemas, registerJoiSchemas, subscriptionJoiSchemas, } from "../models/user.js";
import { getCurrent, login, logout, register, updateUser } from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.patch("/", authenticate, validateBody(subscriptionJoiSchemas), updateUser)
authRouter.post("/register", validateBody(registerJoiSchemas), register);
authRouter.post("/login", validateBody(loginJoiSchemas), login),
    authRouter.get("/current", authenticate, getCurrent),
    authRouter.post("/logout", authenticate, logout)

export default authRouter;