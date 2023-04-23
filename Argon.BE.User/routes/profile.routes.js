import profileController from "../controller/profile.controller.js";
import { Router } from "express";

export const profileRoutes = (app) => {
  const router = Router();

  router.put("/", profileController.Update);

  app.use("/api/v1/profile", router);
};
