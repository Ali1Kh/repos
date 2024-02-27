import express from "express";
import { sequelize, syncFn } from "./DB/connection.js";
import dotenv from "dotenv";
import userRouter from "./src/modules/user/user.router.js";
import secretaryRouter from "./src/modules/secretary/secretary.router.js";
import meetingsRouter from "./src/modules/meatings/meetings.router.js";
import noteRouter from "./src/modules/note/note.router.js";
import dashboardRouter from "./src/modules/dashboard/dashboard.router.js";
import managerRouter from "./src/modules/manager/manager.router.js";

import cors from "cors";
import { Manager } from "./DB/models/manager.model.js";
import { Secertary } from "./DB/models/secertary.model.js";
import { Manager_Secretary } from "./DB/models/Manager_Secretary.model.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

await syncFn();

Manager.belongsToMany(Secertary, {
  through: "Manager_Secretary",
  foreignKey: "manager_id",
});
Secertary.belongsToMany(Manager, {
  through: "Manager_Secretary",
  foreignKey: "secretary_id",
});

app.use("/auth", userRouter);
app.use("/secretary", secretaryRouter);
app.use("/meetings", meetingsRouter);
app.use("/manager", managerRouter);

app.use("/notes", noteRouter);
app.use("/dashboard", dashboardRouter);

// uptime req
app.all("/uptime", (req, res) => {
  console.log("Up Time Requested");
  res.status(200).send("success");
});
// all
app.all("*", (req, res) => {
  return res.json({
    success: false,
    message: "Api Endpoint Not Found",
  });
});

// global error
app.use((error, req, res, next) => {
  return res.json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
});

app.listen(port, () => console.log("App is running at port :", port));

export default app;
