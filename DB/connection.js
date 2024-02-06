import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config();

export const sequelize = new Sequelize('task', 'root', '1234', {
  host : "localhost",
  dialect: "mysql",
  port:3808
});

export const syncFn = async () => {
  await sequelize.sync();
};