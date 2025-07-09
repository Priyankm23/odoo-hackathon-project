import {Router} from "express";
import passport from "../controllers/authController.js";
import {
    signIn,
    signUp
} from "../controllers/authController.js"

const authRouter=Router();

// api/v1/auth/sign-up
authRouter.post('/register',signUp)

authRouter.post('/login',signIn)

authRouter.get('/google/login',
    passport.authenticate("google",{scope:["profile","email"]})
);

authRouter.get("/",(req,res)=>{
     res.send("<a href=/api/v1/auth/google/login>login with google</a>")
});

export default authRouter;

