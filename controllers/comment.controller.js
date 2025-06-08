import * as CommentService from "../services/comment.service.js";
import * as VideoService from "../services/video.service.js";

export const addNewComment = async (req, res, next) => {
    try {
        // not using destructuring here as we are dumping the whole body to our service, it should be fine as we already validate using JOI.
        const payload = req.body;
        const { _id } = req.user;

        const checkedVideoId = await VideoService.fetchVideo({ _id: payload.videoId });
        if (!checkedVideoId.success) {
            return res.status(404).json(checkedVideoId);
        }

        payload.userId = _id;

        const result = await CommentService.addNewComment(payload);
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const fetchCommentReplies = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId = "" } = req.query; // get userId from query for reaction as this api is open to all users
        const result = await CommentService.fetchComments({ parentCommentId: id }, userId);
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

export const fetchComments = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId = "" } = req.query; // get userId from query for reaction as this api is open to all users
        const query = {
            videoId: id,
            parentCommentId: null // Fetching top-level comments only
        }
        const result = await CommentService.fetchComments(query, userId);
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

export const updateComment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const query = {
            _id: id,
        };

        const result = await CommentService.updateComment(query, payload);
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}