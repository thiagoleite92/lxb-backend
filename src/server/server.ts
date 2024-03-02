import { app } from "../app/app";
import { env } from "../env";

try {
  app.listen(
    {
      host: "0.0.0.0",
      port: env.PORT,
    },
    () => {
      console.log("Listening on port " + env.PORT);
    }
  );
} catch (error) {
  console.log(error);
}
