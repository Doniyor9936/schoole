import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false,
    },
  },
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
