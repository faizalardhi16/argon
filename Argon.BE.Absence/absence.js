import express from "express";
import cors from "cors";
import db from "./models/index.js";
import { absenceRoutes } from "./routes/absence.routes.js";

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:4545"];

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

absenceRoutes(app);

app.listen(4920, () => {
  console.log("App Start on Port 4920");
});
