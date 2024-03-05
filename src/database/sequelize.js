import { Sequelize } from "sequelize";
import { env } from "../env";

import dbConfig from "./config";

const dbDialect = dbConfig[env.NODE_ENV].dialect;
const dbUser = dbConfig[env.NODE_ENV].username;
const dbPassword = dbConfig[env.NODE_ENV].password;
const dbHost = dbConfig[env.NODE_ENV].host;
const dbName = env.DATABASE_NAME;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: dbDialect,
  host: dbHost,
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
