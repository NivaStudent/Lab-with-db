import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./authRoutes.js";

const app = express();

app.use(bodyParser.json());
app.use("/api", authRoutes);

app.listen(4000, () => console.log("Server running"));