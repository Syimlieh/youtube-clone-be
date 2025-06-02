import express from "express";
import validator from "../validations/validator.js";
import { handleVideoReaction } from "../controllers/like.controller.js";
import authMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();

// first here is the routes, then we add a validation middleware and then go to our routes handler which is our controller
router.post("/", authMiddleware, validator("validateVideoReaction"), handleVideoReaction);

export default router;
