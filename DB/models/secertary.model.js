import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";
import { Token } from "./token.model.js";
import { Manager } from "./manager.model.js";

export const Secertary = sequelize.define(
  "Secretary",
  {
    secretary_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Accepted_Acc: { type: DataTypes.BOOLEAN, defaultValue: false },
    E_mail: { type: DataTypes.STRING, unique: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    PassWord: DataTypes.STRING,
    UserName: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Secertary.hasMany(Token, { foreignKey: "secretary_id" });
Token.belongsTo(Secertary, { foreignKey: "secretary_id" });

Secertary.hasMany(Manager, { foreignKey: "secretary_id" });
Manager.belongsTo(Secertary, { foreignKey: "secretary_id" });
