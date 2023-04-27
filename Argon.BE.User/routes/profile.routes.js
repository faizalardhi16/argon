import profileController from "../controller/profile.controller.js";
import { Router } from "express";
import { authMiddleware } from "../../Argon.BE.Library/helper/authMiddleware.js";
import { upload } from "../controller/profile.controller.js";

export const profileRoutes = (app) => {
  const router = Router();

  router.put("/", authMiddleware, profileController.Update);
  router.post(
    "/file",
    [authMiddleware, upload.single("image")],
    profileController.UploadAvatar
  );

  app.use("/api/v1/profile", router);
};
