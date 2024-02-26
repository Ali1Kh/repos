import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

export const Admin = sequelize.define(
  "Admin",
  {
    Admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    E_mail: { type: DataTypes.STRING, unique: true },
    First_name: { type: DataTypes.STRING, allowNull: false },
    Last_name: { type: DataTypes.STRING, allowNull: false },
    Password: DataTypes.STRING,
    UserName: DataTypes.STRING,
    resetCode: { type: DataTypes.STRING, defaultValue: null },
    resetCodeVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
    timestamps:false
  }
);
