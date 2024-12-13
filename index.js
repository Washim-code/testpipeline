import  Express  from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = Express();

app.use(Express.json());

app.use(cookieParser());

const port = 8800 || process.env.PORT;
const connect = () =>{
    mongoose.connect("mongodb://localhost:27017").then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        console.log(err);
    });
}

// Routes

app.get("/",(req, res)=>{
    res.status(200).json({message: "okay washim 1"})
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

app.listen(port, ()=>{
    connect();
    console.log("Connected to Server");
});