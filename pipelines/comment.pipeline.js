import { COLLECTIONS } from "../utils/constants.js";
import mongoose from "mongoose";

export const fetchCommentsPipeline = (query) => {
    const { videoId = "", parentCommentId = "" } = query;

    // this is similar to the find query in mongoose
    const $match = {
        parentCommentId: null
    };

    if (videoId) {
        $match.videoId = new mongoose.Types.ObjectId(videoId);
    }

    if (parentCommentId) {
        $match.parentCommentId = new mongoose.Types.ObjectId(parentCommentId);
    }

    // this is like joing in SQL or populating in mongoose
    const $lookupUser = {
        from: COLLECTIONS.PROFILE,
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
        pipeline: [
            {
                $project: { // this will only return the fields we need
                    firstName: 1,
                    lastName: 1,
                    channelId: 1,
                    profileFile: 1,
                }
            }
        ]
    }

    const $unwindUser = {
        path: "$userDetails",
        preserveNullAndEmptyArrays: false
    }

    const $lookupReplies = {
        from: COLLECTIONS.COMMENTS,
        localField: "_id",
        foreignField: "parentCommentId",
        as: "replies"
    }

    // returning all the stages
    return [
        { $match },
        { $lookup: $lookupUser },
        { $unwind: $unwindUser },
        { $lookup: $lookupReplies },
        { $addFields: { replyCount: { $size: "$replies" } } },
        { $project: { replies: 0 } },
        { $sort: { createdAt: -1 } }
    ]
}