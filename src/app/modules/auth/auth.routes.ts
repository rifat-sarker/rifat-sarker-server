import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validationRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerUserSchema),
  AuthController.registerUser
);
router.post("/login", AuthController.logingUser);
router.post("/refesh-token", AuthController.refeshToken);

export const AuthRoutes = router;
