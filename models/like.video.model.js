

import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/constants.js"

// here we are creating a new mongo schema for our User collection
const LikeSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTIONS.VIDEOS,
        trim: true,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTIONS.PROFILE,
        trim: true,
        required: true
    },
    isLiked: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const Likes = mongoose.model(COLLECTIONS.LIKES, LikeSchema);

export default Likes;