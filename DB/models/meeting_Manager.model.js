import { sequelize } from "./../connection.js";
import { DataTypes } from "sequelize";

export const Meeting_Manager = sequelize.define(
  "meeting_Manager",
  {
    manager_id: {
      type: DataTypes.INTEGER,
    },
    meeting_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
Meeting_Manager.removeAttribute('id');