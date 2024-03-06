import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.pass,
  {
    host: process.env.host,
    dialect: "mysql",
    port: 3306,
    logging: false,
  }
);


export const syncFn = async () => {
  await sequelize.sync();
};
