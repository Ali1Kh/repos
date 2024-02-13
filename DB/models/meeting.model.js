import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";
import { Manager } from "./manager.model.js";

export const Meetings = sequelize.define("Meetings", {
  meeting_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,

  },
  person: { type: DataTypes.STRING, allowNull: false },
  about: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  notes: { type: DataTypes.STRING, allowNull: true },
});
Meetings.associate = (models) => {
  Meetings.belongsToMany(models.Manager, { through: "Meeting_Manager" });
};
