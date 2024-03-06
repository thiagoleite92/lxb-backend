import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  config({
    path: ".env.test",
  });
} else {
  config();
}

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("production"),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_DIALECT: z.string().default("postgres"),
  PORT: z.coerce.number().default(3001),
  JWT_SECRET: z.string(),
  SALT: z.coerce.number().default(5),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment vars", _env.error.format());

  throw new Error("Invalid environment vars");
}

export const env = _env.data;
