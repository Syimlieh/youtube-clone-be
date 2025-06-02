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
        const result = await CommentService.fetchComments({ parentCommentId: id });
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}

export const fetchComments = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = {
            videoId: id,
            parentCommentId: null // Fetching top-level comments only
        }
        const result = await CommentService.fetchComments(query);
        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}