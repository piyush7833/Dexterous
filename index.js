import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import materialRoute from "./routes/material.route.js";
import cors from "cors";


const app = express();
dotenv.config();


const connect = () => {
    mongoose.set('strictQuery', false);
    mongoose
        .connect(process.env.DB_URI)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            throw err;
        });
}; 

const allowedOrigins = ['http://localhost:3000', process.env.FRONTEND_URI]; // Add your frontend URLs


app.use(cors({
  origin: allowedOrigins,
  credentials: true // Allow cookies to be sent
}));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/material", materialRoute);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({
        success: false,
        status: status,
        message: message,
    });
});

app.listen(8080, () => {
    connect();
    console.log("Connected to Server");
});
