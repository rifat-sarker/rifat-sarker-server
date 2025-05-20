import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../config/multer-config";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { SkillsController } from "./skill.controller";

const router = express.Router();
router.post("/", auth(Role.admin), SkillsController.addSkill);
router.get("/", SkillsController.getAllSkill);
router.get("/:id", SkillsController.getSkillById);
router.patch("/:id", auth(Role.admin), SkillsController.updateSkill);

router.delete("/:id", auth(Role.admin), SkillsController.deleteSkill);

export const SkillsRoutes = router;
