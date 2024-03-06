import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";
import { Meetings } from "./meeting.model.js";

export const Notifications = sequelize.define(
  "Notifications",
  {
    notificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: { type: DataTypes.STRING, allowNull: false },
    manager_id: {
      type: DataTypes.INTEGER,
    },
    meeting_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

Notifications.associate = (models) => {
  Notifications.hasOne(Meetings, {
    foreignKey: "meeting_id",
    sourceKey: "meeting_id",
  });
};
