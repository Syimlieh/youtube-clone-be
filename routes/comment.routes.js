import express from "express";
import validator from "../validations/validator.js";
import { addNewComment, deleteComment, fetchCommentReplies, fetchComments, updateComment } from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/authentication.middleware.js";

const router = express.Router();

// first here is the routes, then we add a validation middleware and then go to our routes handler which is our controller
router.post("/", authMiddleware, validator("validateVideoComment"), addNewComment);

router.get("/replies/:id", validator("validateObjectId", true), fetchCommentReplies);

router.get("/:id", validator("validateObjectId", true), fetchComments);

router.put("/:id", authMiddleware, validator("validateObjectId", true), validator("validateUpdateComment"), updateComment);

router.delete("/:id", authMiddleware, validator("validateObjectId", true), deleteComment);

export default router;
