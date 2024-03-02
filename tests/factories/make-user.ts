import { faker } from "@faker-js/faker";

import { registerUserSchema } from "../../src/schemas";
import { z } from "zod";

export function makeUser(
  override: Partial<z.infer<typeof registerUserSchema>> = {},
  id?: number
) {
  const user = {
    id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...override,
  };

  return user;
}
