import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";

import mongoose from 'mongoose';
import dotenv from 'dotenv'



dotenv.config()
const { DB_HOST, PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful")
    app.listen(PORT),
      console.log("Server is running. Use our API on port: 3000")

  })
  .catch(err => {
    console.log(err.message),
      process.exit(1)
  })

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});


