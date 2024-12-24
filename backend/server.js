// const express =require('express');
import express from "express";
import dotenv from "dotenv";
import authRouter from "./database/routes/auth.route.js";
import connectDB from "./database/connectDB.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();//to use .env
const port = process.env.PORT || 5000;

// const db =require('./database/connectDB.js');


app.use(express.json()); //parse the incoming request into req.body
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Hello World");
});

//for different routes
app.use("/api/auth", authRouter);


app.listen(port, () => {
  connectDB();
  console.log(`Server is running in port http://localhost:${port}`);
  });
