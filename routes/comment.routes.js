import express from "express";
import validator from "../validations/validator.js";
import { addNewComment, fetchCommentReplies, fetchComments } from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();

// first here is the routes, then we add a validation middleware and then go to our routes handler which is our controller
router.post("/", authMiddleware, validator("validateVideoComment"), addNewComment);

router.get("/replies/:id", authMiddleware, validator("validateObjectId", true), fetchCommentReplies);

router.get("/:id", authMiddleware, validator("validateObjectId", true), fetchComments);

export default router;
