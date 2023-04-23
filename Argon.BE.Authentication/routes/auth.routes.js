import authController from "../controller/auth.controller.js";
import { Router } from "express";

export const authRoutes = (app) => {
  const router = Router();

  router.post("/", authController.Login);
  router.post("/verify", authController.VerifyToken);

  app.use("/api/v1/auth", router);
};
