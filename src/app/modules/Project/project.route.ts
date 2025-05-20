import express, { NextFunction, Request, Response } from "express";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../config/multer-config";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = express.Router();
router.post(
  "/",
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.patch(
  "/:id",

  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(Role.ADMIN),
  ProjectController.updateProject
);

router.delete("/:id", auth(Role.ADMIN), ProjectController.deleteProject);

export const ProjectRoutes = router;
