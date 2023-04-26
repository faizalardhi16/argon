import profileController from "../controller/profile.controller.js";
import { Router } from "express";
import { authMiddleware } from "../../Argon.BE.Library/helper/authMiddleware.js";

export const profileRoutes = (app) => {
  const router = Router();

  router.put("/", authMiddleware, profileController.Update);

  app.use("/api/v1/profile", router);
};
