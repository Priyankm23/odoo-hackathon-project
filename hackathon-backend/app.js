import express, { urlencoded } from "express"
import {PORT} from "./config/env.js"
import authRouter from "./routes/authRoutes.js"
import workflowRouter from "./routes/workflowRoute.js"

import itemRouter from './routes/itemRoutes.js';
// import swapRouter from './routes/swapRoutes.js';
// import redeemRouter from './routes/redeemRoutes.js';
// import adminRouter from './routes/adminRoutes.js';

import connectToDatabase from './config/dbConnection.js'
import errorMiddleware from "./middlewares/errorMiddleware.js"
import cookieParser from "cookie-parser"
import passport from "./controllers/authController.js";
import morgan from "morgan"
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
app.use('/api/v1/workflows',workflowRouter);
app.use('/api/v1/items', itemRouter);
// app.use('/api/swaps', swapRouter);
// app.use('/api/redeem', redeemRouter);
// app.use('/api/admin', adminRouter);

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

