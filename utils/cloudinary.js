import {
    v2 as cloudinary,
} from 'cloudinary';
import fs from 'fs';
import path from 'path';
import os from 'os';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (
    buffer,
    filename
) => {
    return new Promise((resolve, reject) => {
        const tempFilePath = path.join(os.tmpdir(), filename);
        console.log('Temporary file path:', tempFilePath);
        fs.writeFile(tempFilePath, buffer, (err) => {
            if (err) {
                return reject(err);
            }

            let resourceType = 'image'; // we are defaulting to image
            console.log("resourceType", resourceType);

            cloudinary.uploader.upload(
                tempFilePath,
                { folder: '/youtube-clone/profiles', resource_type: resourceType },
                (
                    error,
                    result
                ) => {
                    fs.unlink(tempFilePath, (unlinkErr) => {
                        if (unlinkErr)
                            console.error('Failed to delete local file:', unlinkErr);
                    });

                    if (error) {
                        reject(error);
                    } else if (result) {
                        resolve(result);
                    }
                }
            );
        });
    });
};
