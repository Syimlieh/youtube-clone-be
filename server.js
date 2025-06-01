import express from 'express';
import cors from 'cors';
import { logger } from './log/logger.js';
import { httpLogger } from './log/http.logger.js';
import connectDB from "./config/db.js"
import errorHandler from "./middlewares/error.middleware.js"
import dotenv from 'dotenv';
import routes from "./routes.js";

//dotenv for accessing .env 
dotenv.config();

const app = express();

// CORS we can whitelist only specific ip inside cors if required
app.use(cors());

// logging request 
app.use(httpLogger)

// JSON Parsing
app.use(express.json({ limit: "50mb" }));

// Routes
routes(app);

app.use(errorHandler);

// will either get from .env or default
const PORT = process.env.PORT || 4000;

// connect to DB and listening to our server if connection is successfull
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Backend Server running on PORT: [${PORT}]`);
        });
    })
    .catch((err) => {
        logger.error(`Error while starting server due to DB error ${err}`);
        process.exit(1);
    });
