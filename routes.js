import AuthRoutes from "./routes/auth.routes.js";

import VideoRoutes from "./routes/video.routes.js";

import LikeRoutes from "./routes/like.routes.js";

import CommentRoutes from "./routes/comment.routes.js";

// getting ther server from our server.js
export default (server) => {
    // we are prefix the routes with auth for signin and signup
    server.use("/api/auth", AuthRoutes);

    // video routes
    server.use("/api/video", VideoRoutes);

    // like routes
    server.use("/api/video/like", LikeRoutes);

    // comment routes
    server.use("/api/video/comment", CommentRoutes);
};
