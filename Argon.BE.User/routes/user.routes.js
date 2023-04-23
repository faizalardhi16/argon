import userController from "../controller/user.controller.js";
import { Router } from "express";

export const userRoutes = (app) => {
  const router = Router();

  router.post("/", userController.Create);
  router.get("/", userController.GetByEmail);
  router.get("/getAll", userController.GetAllUser);

  app.use("/api/v1/users", router);
};
