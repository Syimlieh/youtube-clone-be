import mongoose from 'mongoose';
import { COLLECTIONS } from "../utils/constants.js"

const Fileschema = new mongoose.Schema({
    asset_id: { type: String, required: true },
    public_id: { type: String, required: true },
    version: { type: Number, required: true },
    version_id: { type: String, required: true },
    signature: { type: String, required: true },
    resource_type: { type: String, required: true },
    created_at: { type: Date, required: true },
    tags: { type: [String], default: [] },
    bytes: { type: Number, required: true },
    type: { type: String, required: true },
    etag: { type: String, required: true },
    placeholder: { type: Boolean, default: false },
    url: { type: String, required: true },
    secure_url: { type: String, required: true },
    asset_folder: { type: String, default: '' },
    display_name: { type: String, required: true },
    original_filename: { type: String, required: true },
});

const FileMetada = mongoose.model(COLLECTIONS.FILE_METADATA, Fileschema);

export default FileMetada;
