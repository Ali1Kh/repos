import express from "express";
import { sequelize, syncFn } from "./DB/connection.js";
import dotenv from "dotenv";
import userRouter from "./src/modules/user/user.router.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
await syncFn();

app.use(express.json());
app.use("/auth", userRouter);
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
