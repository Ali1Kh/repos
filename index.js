import express from "express";
import { sequelize, syncFn } from "./DB/connection.js";
import dotenv from "dotenv";
import userRouter from "./src/modules/user/user.router.js";
import secretaryRouter from "./src/modules/secretary/secretary.router.js";
import meetingsRouter from "./src/modules/meatings/meetings.router.js";
import noteRouter from "./src/modules/note/note.router.js";
import dashboardRouter from "./src/modules/dashboard/dashboard.router.js";
import managerRouter from "./src/modules/manager/manager.router.js";
import { Server } from "socket.io";
import cors from "cors";
import { Manager } from "./DB/models/manager.model.js";
import { Secertary } from "./DB/models/secertary.model.js";
import { createServer } from "node:http";
import { Notifications } from "./DB/models/notifications.model.js";
import { verifyToken } from "./src/utils/verifyToken.js";
 
dotenv.config();
const port = process.env.PORT;

const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

try {
  io.on("connection", async (socket) => {
    socket.on("updateSocketId", async (data) => {
      if (!data.token) {
        return new Error("Token Is Required");
      }
      verifyToken(data.token).then(async (payload) => {
        await Manager.update(
          { socketId: socket.id },
          { where: { manager_id: payload?.id } }
        );
      });
    });

    socket.on("getNotifications", async (data) => {
      verifyToken(data.token).then(async (payload) => {
        let notifications = await Notifications.findAll({
          where: { manager_id: payload?.id },
          order: [["createdAt", "DESC"]],
        });

        socket.emit("notifications", notifications);
      });
    });
  });
} catch (error) {
  console.log(error);
}
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

server.listen(port, () => console.log("App is running at port :", port));

export default app;
