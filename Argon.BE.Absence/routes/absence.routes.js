import absenceController from "../controller/absence.controller.js";
import { Router } from "express";
import { authMiddleware } from "../../Argon.BE.Library/helper/authMiddleware.js";

export const absenceRoutes = (app) => {
  const router = Router();

  router.post("/", authMiddleware, absenceController.Create);
  router.get("/", absenceController.GetAllAbsence);

  app.use("/api/v1/absence", router);
};
