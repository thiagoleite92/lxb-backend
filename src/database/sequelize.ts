import { Sequelize } from "sequelize";
import { env } from "../env";

const dbName = env.DATABASE_NAME;
const dbUser = env.DATABASE_USERNAME;
const dbHost = env.DATABASE_HOST;
const dbPassword = env.DATABASE_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres",
  host: dbHost,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
