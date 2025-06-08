import express from "express";
import { fetchAllVideos, fetchVideo } from "../controllers/video.controller.js";
import validator from "../validations/validator.js";

const router = express.Router();

// first here is the routes, then we add a validation middleware and then go to our routes handler which is our controller
router.get("/", validator("validateFetchVideos", false, true), fetchAllVideos);

router.get("/:id", fetchVideo);

export default router;
