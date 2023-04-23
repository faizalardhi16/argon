import express from "express";
import cors from "cors";
import db from "./models/index.js";
import { userRoutes } from "./routes/user.routes.js";
import { profileRoutes } from "./routes/profile.routes.js";

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

userRoutes(app);
profileRoutes(app);

app.listen(4555, () => {
  console.log("App Start on Port 4555");
});
