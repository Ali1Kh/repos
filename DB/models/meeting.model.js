import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";
import { meeting_Manager } from "./meeting_Manager.model.js";
import { Note } from "./notes.model.js";

export const Meetings = sequelize.define("Meetings", {
  meeting_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  person: { type: DataTypes.STRING, allowNull: false },
  about: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  in_or_out: { type: DataTypes.STRING, allowNull: false },
  statues: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  notes: { type: DataTypes.STRING, allowNull: true },
  addedBy: { type: DataTypes.STRING, allowNull: true },
  attachmentId: { type: DataTypes.STRING },
  attachmentLink: { type: DataTypes.STRING },
});

Meetings.associate = (models) => {
  Meetings.belongsToMany(Manager, {
    through: meeting_Manager,
    foreignKey: "meeting_id",
  });

  Meetings.hasMany(models.meeting_Manager, { foreignKey: "meeting_id" });
  
  Meetings.hasOne(models.Note, { foreignKey: "meeting_id" });
  Note.belongsTo(Meetings, { foreignKey: "meeting_id" });

};
