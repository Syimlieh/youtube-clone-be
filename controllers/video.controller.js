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
        const response = await VideoService.fetchVideo({ _id: id });
        return res.status(response.statusCode).json(response);
    } catch (err) {
        next(err);
    }
};