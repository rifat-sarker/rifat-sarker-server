import { Router } from "express";
import { ProjectRoutes } from "../modules/Project/project.route";
import { AuthRoutes } from "../modules/auth/auth.routes";

const router = Router();
const moduleRoutes = [
  {
    path: "/projects",
    route: ProjectRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
