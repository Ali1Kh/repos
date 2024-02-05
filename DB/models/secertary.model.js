import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";
import { Token } from "./token.model.js";
import { Manager } from './manager.model.js';

export const Secertary = sequelize.define("secertary",{
    Accepted_Acc:{type:DataTypes.BOOLEAN,defaultValue:false},
    E_mail:{type:DataTypes.STRING,unique:true},
    first_name:{type:DataTypes.STRING,allowNull:false},
    last_name:{type:DataTypes.STRING,allowNull:false},
    PassWord:DataTypes.STRING,
    UserName:DataTypes.STRING
})

Secertary.hasMany(Token);
Token.belongsTo(Secertary);

Secertary.hasMany(Manager);
Manager.belongsTo(Secertary);