import { sequelize } from "./../connection.js";
import { DataTypes } from "sequelize";
import { Manager } from "./manager.model.js";
import { Meetings } from "./meeting.model.js";

export const meeting_Manager = sequelize.define(
  "meeting_Manager",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      //   references:{
      //     model:Manager,
      //     key:"manager_id"
      //   }
    },
    meeting_id: {
      type: DataTypes.INTEGER,
      //   references:{
      //     model:Meetings,
      //     key:"meeting_id"
      //   }
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

meeting_Manager.associate = (models) => {
  meeting_Manager.belongsTo(models.Manager, { foreignKey: "manager_id" });
  meeting_Manager.belongsTo(models.Meetings, { foreignKey: "meeting_id" });
};
