import express, { urlencoded } from "express"
import {PORT} from "./config/env.js"
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoute.js"
import workflowRouter from "./routes/workflowRoute.js"
import dataRouter from "./routes/mockRoute.js"
import connectToDatabase from './config/dbConnection.js'
import errorMiddleware from "./middlewares/errorMiddleware.js"
import cookieParser from "cookie-parser"
import passport from "./controllers/authController.js";
import { authorize ,restrictTo } from "./middlewares/authMiddleware.js"
import morgan from "morgan"
import './controllers/monthlySummary.js';
import cors from "cors";

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173', // replace with your frontend origin
  credentials: true,
}));

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',authorize,restrictTo(["ADMIN"]),userRouter);
app.use('/api/v1/workflows',workflowRouter);
app.use('/api/v1/data',dataRouter);

app.use(errorMiddleware);

app.get('/auth/google/callback',
    passport.authenticate("google",{session: false, failureRedirect: "/" }),
    (req,res)=>{
        res.cookie("token",req.user.jwt,{httpOnly: true, secure: false,path: "/"});
        res.status(200).json({success: 'true' , data: req.user._json});
    }
);

app.listen(PORT,async()=>{
    console.log("hackathon backend API is runnig on http://localhost:5000")

    await connectToDatabase()
});

