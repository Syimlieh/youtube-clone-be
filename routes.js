import AuthRoutes from "./routes/auth.routes.js";

// getting ther server from our server.js
export default (server) => {
    // we are prefix the routes with auth for signin and signup
    server.use("/api/auth", AuthRoutes);
};
