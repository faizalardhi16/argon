import userController from "../controller/user.controller.js";
import { Router } from "express";
import { authMiddleware } from "../../Argon.BE.Library/helper/authMiddleware.js";

export const userRoutes = (app) => {
  const router = Router();

  router.post("/", authMiddleware, userController.Create);
  router.get("/", userController.GetByEmail);
  router.get("/getAll", authMiddleware, userController.GetAllUser);
  router.get("/detail", authMiddleware, userController.GetByUserId);

  app.use("/api/v1/users", router);
};
