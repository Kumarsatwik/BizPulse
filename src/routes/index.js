import express from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
const router = express.Router();

const routes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
];

for (const route of routes) {
  router.use(route.path, route.route);
}

export default router;
