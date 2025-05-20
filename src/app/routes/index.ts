import { Router } from "express";
import { ProjectRoutes } from "../modules/Project/project.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { BlogRoutes } from "../modules/Blogs/blog.route";
import { ContactRoutes } from "../modules/Contact/contact.route";
import { SkillsRoutes } from "../modules/Skills/skill.route";

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
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/contact",
    route: ContactRoutes,
  },
  {
    path: "/skills",
    route: SkillsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
