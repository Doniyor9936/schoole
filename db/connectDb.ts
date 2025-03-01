import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PG_HOST as string,
  port: Number(process.env.PG_PORT) as number,
  database: process.env.PG_DATABASE as string,
  username: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connect succesfully database");
  })
  .catch((err) => {
    console.error("dont connect database anything wrong!!!", err);
  });
sequelize.sync({ force: false });

export default sequelize;
