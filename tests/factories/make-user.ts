import { faker } from "@faker-js/faker";

import { RegisterUserSchema } from "../../src/schemas";

export function makeUser(
  override: Partial<RegisterUserSchema> = {},
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
