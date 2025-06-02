import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/constants.js"

// here we are creating a new mongo schema for our User collection
const VideoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    thumbnail: {
        type: String,
        trim: true,
        default: ''
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
    category: [{
        type: String,
        trim: true,
        default: ''
    }],
    duration: {
        type: String,
        trim: true,
        default: ''
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    channel: {
        type: String,
        trim: true,
        required: true
    },
    channelId: {
        type: String,
        trim: true,
        required: true
    },
    profile: {
        type: String,
        trim: true,
        default: ''
    },
    banner: {
        type: String,
        trim: true,
        default: ''
    },
    subscriberCount: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

const Videos = mongoose.model(COLLECTIONS.VIDEOS, VideoSchema);

export default Videos;