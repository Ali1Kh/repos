import { sequelize } from "./../connection.js";
import { DataTypes } from "sequelize";
import { Secertary } from "./secertary.model.js";
import { Manager } from "./manager.model.js";

export const Manager_Secretary = sequelize.define("Manager_Secretary", {
  manager_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  secretary_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isAccepted: { type: DataTypes.BOOLEAN, defaultValue: true },
});

Manager_Secretary.belongsTo(Secertary, { foreignKey: "secretary_id" });

Manager_Secretary.belongsTo(Manager, { foreignKey: "manager_id" });
