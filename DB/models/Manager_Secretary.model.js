import { sequelize } from "./../connection.js";
import { DataTypes } from "sequelize";
import { Secertary } from "./secertary.model.js";

export const Manager_Secretary = sequelize.define(
  "Manager_Secretary",
 {
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      secretary_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
 }
);
