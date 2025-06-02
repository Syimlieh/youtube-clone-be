import mongoose from "mongoose";
import { logger } from "../log/logger.js";
import Videos from "../models/video.model.js";
import { VideoJson } from "../utils/seeding/video.seed.js";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    // this will be our connection string. we are getting it from our .env
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MongoDB connection string not provided");
    }
    logger.info("Connecting to Database...");
    await mongoose.connect(MONGO_URI, {
      authSource: "admin",
    });

    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected');
    });

    logger.info("Connected to Database");

    const checkVideo = await Videos.findOne({});
    if (!checkVideo) {
      const addExist = await Videos.insertMany(VideoJson)
      if (addExist.length) {
        logger.info("Videos seeded successfully")
      }
    }
  } catch (err) {
    logger.error("Failed to connect to Database:\n" + err);
    throw err;
  }
};

export default connectDB;
