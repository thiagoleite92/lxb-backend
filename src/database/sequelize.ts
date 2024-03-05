import { Sequelize } from "sequelize";
import { env } from "../env";

const dbUser = env.DATABASE_USERNAME;
const dbPassword = env.DATABASE_PASSWORD;
const dbHost = env.DATABASE_HOST;
const dbName = env.DATABASE_NAME;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres",
  host: dbHost,
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
  },
});

export default sequelize;
