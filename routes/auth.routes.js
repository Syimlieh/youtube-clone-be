import express from "express";
import { getMyProfile, login, signUp } from "../controllers/auth.controller.js";
import validator from "../validations/validator.js";
import authMiddleware from "../middlewares/authentication.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// first here is the routes, then we add a validation middleware and then go to our routes handler which is our controller
router.post("/signup", upload.single("profile"), validator("validateSignup"), signUp);

router.post("/login", validator("validateSignin"), login);

router.get("/me", authMiddleware, validator("validateSignin"), getMyProfile);

export default router;
