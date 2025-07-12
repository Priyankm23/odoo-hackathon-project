import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).redirect("/login.html");
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Please login first." });
  if (req.user.role !== 'admin') return res.status(403).json({ error: "Admin access required." });
  next();
};
