import {Router} from "express";
import { sendWelcome } from "../controllers/workflow.js";

const workflowRouter=Router();

workflowRouter.post("/user/welcome",sendWelcome);

export default workflowRouter;