import express from "express";
import { addVideo, deleteVideo, fetchAllVideos, fetchVideo, updateVideo } from "../controllers/video.controller.js";
import validator from "../validations/validator.js";

const router = express.Router();

// first here is the routes, then we add a validation middleware and then go to our routes handler which is our controller
router.get("/", validator("validateFetchVideos", false, true), fetchAllVideos);

router.post("/", validator("videoValidationSchema"), addVideo);

router.put("/:id", validator("validateUpdateVideoSchema"), validator("validateObjectId", true), updateVideo);

router.get("/:id", fetchVideo);

router.delete("/:id", validator("validateObjectId", true), deleteVideo);

export default router;
