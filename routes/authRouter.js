import express from "express";
import { validateBody } from "../helpers/validateBody.js";
import { loginJoiSchemas, registerJoiSchemas, } from "../models/user.js";
import { login, register } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerJoiSchemas), register);
authRouter.post("/login", validateBody(loginJoiSchemas), login)

export default authRouter;