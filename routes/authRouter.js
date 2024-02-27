import express from "express";
import { validateBody } from "../helpers/validateBody.js";
import { usersJoiSchemas } from "../models/user.js";
import { register } from "../controllers/authControllers.js";

const authRouter = express.Router();
authRouter.post("/register", validateBody(usersJoiSchemas), register);

export default authRouter;