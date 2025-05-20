import express, { NextFunction, Request, Response } from "express";
import { multerUpload } from "../../config/multer-config";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { BlogController } from "./blog.controller";

const router = express.Router();
router.post(
  "/",
  auth(Role.admin),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  BlogController.createBlog
);

router.get("/", BlogController.getAllBlog);
router.get("/:id", BlogController.getBlogById);
router.patch(
  "/:id",

  auth(Role.admin),
  multerUpload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  BlogController.updateBlog
);

router.delete("/:id", auth(Role.admin), BlogController.deleteBlog);

export const BlogRoutes = router;
