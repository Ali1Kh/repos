import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

export const Token = sequelize.define("token",{
    token:DataTypes.STRING,
    isValid:{type:DataTypes.BOOLEAN,defaultValue:true},
    agent:{type:DataTypes.STRING},
})


 
 