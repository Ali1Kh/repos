import express from "express";
import { sequelize, syncFn } from "./DB/connection.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
await syncFn();

app.listen(port);

export default app;
