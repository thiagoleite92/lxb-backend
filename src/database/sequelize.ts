import { Sequelize } from "sequelize";
import { env } from "../env";

import { readFileSync } from "fs";

const rootCert = readFileSync("/etc/ssl/certs/ca-certificates.crt");

const dbUser = env.DATABASE_USERNAME;
const dbPassword = env.DATABASE_PASSWORD;
const dbHost = env.DATABASE_HOST;
const dbName = env.DATABASE_NAME;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres",
  host: dbHost,
  dialectOptions: {
    project: "ep-soft-cell-a55m5ghc",
    ssl: {
      require: true,
      rejectUnauthorized: false,
      ca: rootCert,
    },
  },
});

export default sequelize;
