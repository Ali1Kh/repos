import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";
import { Token } from "./token.model.js";

export const Secertary = sequelize.define(
  "Secretary",
  {
    secretary_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Accepted_Acc: { type: DataTypes.BOOLEAN, defaultValue: false },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    E_mail: { type: DataTypes.STRING, unique: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    PassWord: DataTypes.STRING,
    UserName: DataTypes.STRING,
    resetCode: { type: DataTypes.STRING, defaultValue: null },
    resetCodeVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
  }
);

Secertary.hasMany(Token, { foreignKey: "secretary_id" });
Token.belongsTo(Secertary, { foreignKey: "secretary_id" });
