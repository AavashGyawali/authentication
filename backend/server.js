// const express =require('express');
import express from "express";
import dotenv from "dotenv";
import authRouter from "./database/routes/auth.route.js";
import connectDB from "./database/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"

const app = express();



dotenv.config();//to use .env
const port = process.env.PORT || 5000;
const __dirname =path.resolve();

// const db =require('./database/connectDB.js');

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use(express.json()); //parse the incoming request into req.body
app.use(cookieParser())



//for different routes
app.use("/api/auth", authRouter);

if(process.env.NODE_ENV ==="production"){
  app.use(express.static(path.join(__dirname, "/dist")))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"dist","index.html"))
  })
}

app.listen(port, () => {
  connectDB();
  console.log(`Server is running in port http://localhost:${port}`);
  });
