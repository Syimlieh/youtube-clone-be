import * as VideoService from "../services/video.service.js";

export const fetchAllVideos = async (req, res, next) => {
    try {
        const filters = req.query; // Get filters from query parameters
        const response = await VideoService.fetchAllVideos(filters);
        return res.status(response.statusCode).json(response);
    } catch (err) {
        next(err);
    }
};

export const fetchVideo = async (req, res, next) => {
    try {
        const { id } = req.params; // get videoId from params
        // as the video is open api we are getting the userId from query params
        const { userId = "" } = req.query; // get userId from query
        const response = await VideoService.fetchVideo({ videoId: id }, userId);
        return res.status(response.statusCode).json(response);
    } catch (err) {
        next(err);
    }
};