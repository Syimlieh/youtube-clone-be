import mongoose from "mongoose";
import { COLLECTIONS } from "../utils/constants.js"

// here we are creating a new mongo schema for our User collection
const ProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        select: false,
        required: true,
    },
    channelId: {
        type: String,
        trim: true,
        required: true,
    },
    profileFile: {
        url: String,           // secure Cloudinary image URL
        publicId: String,     // for deletion or updates
        name: String,
    }
}, {
    timestamps: true
})

ProfileSchema.pre('save', function (next) {
    if (!this.channelId.startsWith('@')) {
        this.channelId = `@${this.channelId}`;
    }
    next();
});

const Users = mongoose.model(COLLECTIONS.PROFILE, ProfileSchema);

export default Users;