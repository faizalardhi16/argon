import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.routes.js";

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4555"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

authRoutes(app);

app.listen(4545, () => {
  console.log("App Start on Port 4545");
});
