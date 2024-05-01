import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";
import { Token } from "./token.model.js";
import { Note } from "./notes.model.js";

export const Manager = sequelize.define(
  "Manager",
  {
    manager_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    E_mail: { type: DataTypes.STRING, unique: true, allowNull: false },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    PassWord: { type: DataTypes.STRING, allowNull: false },
    UserName: DataTypes.STRING,
    socketId:DataTypes.STRING,
    Accepted_Acc: { type: DataTypes.BOOLEAN, defaultValue: null },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    resetCode: { type: DataTypes.STRING, defaultValue: null },
    resetCodeVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
  }
);




Manager.hasMany(Token, { foreignKey: "manager_id" });
Token.belongsTo(Manager, { foreignKey: "manager_id" });

Manager.hasMany(Note, { foreignKey: "manager_id" });
Note.belongsTo(Manager, { foreignKey: "manager_id" });
