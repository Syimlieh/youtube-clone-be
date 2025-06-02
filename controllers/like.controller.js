import * as LikeService from '../services/like.service.js';
import * as VideoService from "../services/video.service.js";

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