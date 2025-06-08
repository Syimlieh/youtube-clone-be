import * as LikeService from '../services/like.service.js';
import * as VideoService from "../services/video.service.js";
import * as CommentService from "../services/comment.service.js";

export const handleVideoReaction = async (req, res, next) => {
    try {
        // i am destructuring the body to get videoId and isLiked
        const { videoId, isLiked } = req.body;
        const { _id } = req.user;

        // checking if the videoId is a valid id or not
        const checkedVideoId = await VideoService.fetchVideo({ _id: videoId });
        if (!checkedVideoId.success) {
            return res.status(404).json(checkedVideoId);
        }
        const result = await LikeService.likeOrDislikeVideo({ videoId, userId: _id, isLiked });

        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const handleCommentReaction = async (req, res, next) => {
    try {
        // i am destructuring the body to get commentID and isLiked
        const { commentId, isLiked } = req.body;
        const { _id } = req.user;

        // checking if the commentId is a valid id or not
        const checkedVideoId = await CommentService.fetchComment({ _id: commentId });
        if (!checkedVideoId.success) {
            return res.status(404).json(checkedVideoId);
        }
        const result = await LikeService.likeOrDislikeComment({ commentId, userId: _id, isLiked });

        return res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};