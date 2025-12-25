import express, { urlencoded } from "express"
import {PORT} from "./config/env.js"
import authRouter from "./routes/authRoutes.js"
import workflowRouter from "./routes/workflowRoute.js"

import itemRouter from './routes/itemRoutes.js';
import dashboardRouter from "./routes/dashboardRoutes.js";
import swapRouter from './routes/swapRoutes.js';
import redeemRouter from './routes/redeemRoutes.js';
import adminRouter from './routes/adminRoutes.js';

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
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow any localhost origin regardless of port
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/workflows',workflowRouter);
app.use('/api/v1/items', itemRouter);
app.use('/api/v1/swaps', swapRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/redeem', redeemRouter);
app.use('/api/v1/admin', adminRouter);

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

