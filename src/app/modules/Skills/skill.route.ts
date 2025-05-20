import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../config/multer-config";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { SkillsController } from "./skill.controller";

const router = express.Router();
router.post(
  "/",
  auth(Role.admin),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  SkillsController.addSkill
);

router.get("/", SkillsController.getAllSkill);
router.get("/:id", SkillsController.getSkillById);
router.patch(
  "/:id",

  auth(Role.admin),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  SkillsController.updateSkill
);

router.delete("/:id", auth(Role.admin), SkillsController.deleteSkill);

export const ProjectRoutes = router;
