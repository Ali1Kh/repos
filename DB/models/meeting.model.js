import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

export const Meetings = sequelize.define("Meetings", {
  meeting_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  person: { type: DataTypes.STRING, allowNull: false },
  about: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  notes: { type: DataTypes.STRING, allowNull: true },
});
