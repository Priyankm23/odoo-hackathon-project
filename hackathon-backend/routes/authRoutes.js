import {Router} from "express";
import passport from "../controllers/authController.js";
import {
    signIn,
    signUp
} from "../controllers/authController.js"
import {protect} from "../middlewares/authMiddleware.js";

const authRouter=Router();

// api/v1/auth/sign-up
authRouter.post('/register',signUp)

authRouter.post('/login',signIn)

authRouter.get('/me',protect, (req, res) => {
  // Return the authenticated user info (from token or DB)
  if(!req.user) {
    return res.status(401).json({ message: 'No user found after authentication' });
  }
  res.status(200).json({
    status: 'success', // Optional, but good practice
    user: req.user // Return the entire user object
  });
});

authRouter.get('/google/login',
    passport.authenticate("google",{scope:["profile","email"]})
);

authRouter.get("/",(req,res)=>{
     res.send("<a href=/api/v1/auth/google/login>login with google</a>")
});

export default authRouter;

