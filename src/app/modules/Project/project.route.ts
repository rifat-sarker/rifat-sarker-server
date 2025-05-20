import express, { NextFunction, Request, Response } from "express";
import { ProjectController } from "./project.controller";
import { multerUpload } from "../../config/multer-config";

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
export const ProjectRoutes = router;
