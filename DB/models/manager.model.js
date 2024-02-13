import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";
import { Token } from "./token.model.js";
import { Meetings } from "./meeting.model.js";

export const Manager = sequelize.define(
  "Manager",
  {
    manager_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    E_mail: { type: DataTypes.STRING, unique: true, allowNull: false },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    PassWord: { type: DataTypes.STRING, allowNull: false },
    UserName: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Manager.associate = (models) => {
  Manager.belongsToMany(models.Meetings, { through: "Meeting_Manager" });
  Manager.hasMany(models.Token, { foreignKey: "manager_id" });
  Token.belongsTo(Manager, { foreignKey: "manager_id" });
};
