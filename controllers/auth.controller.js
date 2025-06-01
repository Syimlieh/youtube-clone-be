// I personally like to do this in controller instead of destructure each function because i sometimes use the same name for both controller and service. this allow me to reuse the name without any issue
import * as AuthService from "../services/auth.service.js";
import * as FileService from "../services/file.metadata.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

// purpose of controller is to handle the routes so i moved the logic to service and input validation seperately as a middeware
// POST /signup
export const signUp = async (req, res, next) => {
    try {
        const payload = req.body;
        const file = req.file; // will have access to this because of multer

        // checking if file is send
        if (req.file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const maxSize = 5 * 1024 * 1024; // 2 MB

            if (!allowedTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: 'Invalid file type. Only JPEG and PNG are allowed.' });
            }

            if (req.file.size > maxSize) {
                return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
            }

            const uploadRes = await uploadToCloudinary(file.buffer, file.originalname);
            const saveFile = await FileService.saveFile(uploadRes);
            if (!saveFile || !saveFile.data) {
                return res.status(500).json({ message: 'Failed to save file metadata.' });
            }
            payload.profileFile = {
                url: saveFile.data.url,
                publicId: saveFile.data.public_id,
                name: saveFile.data?.original_filename || file.originalname,
            };
        }
        // if no image just normal signup
        const response = await AuthService.signUp(payload);
        return res.status(response.statusCode).json(response);

    } catch (err) {
        // we can return response here to but i prefer to handle it from the global error handler
        next(err);
    }
};

// POST /login
export const login = async (req, res, next) => {
    try {
        const payload = req.body;
        const response = await AuthService.login(payload);
        return res.status(response.statusCode).json(response);
    } catch (err) {
        next(err);
    }
};


// getting user profile based on logged in details from token
export const getMyProfile = async (req, res, next) => {
    try {
        return res.status(200).json(req.user);
    } catch (err) {
        next(err);
    }
};
