import { getUser } from "../services/auth.service.js";
import { verifyToken } from "../utils/jwt.utils.js";


const authMiddleware = async (req, res, next) => {
    // getting the token from our headers
    const authHeader = req?.headers?.authorization;

    // check if it actually exist or not
    if (!authHeader) {
        return res.status(401).json({ statusCode: 401, message: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // verify and get the token
        const decoded = verifyToken(token, process.env.JWT_SECRET);

        const user = await getUser({ email: decoded.email });
        req.user = user.data;
        next();
    } catch (error) {
        return res.status(401).json({ statusCode: 401, message: 'Invalid or expired token' });
    }
};

export default authMiddleware;
