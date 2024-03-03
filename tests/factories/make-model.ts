import { faker } from "@faker-js/faker";

import { CreateModelSchema } from "../../src/schemas";

export function makeModel(
  override: Partial<CreateModelSchema> = {},
  id?: number
) {
  const model = {
    id,
    model: faker.lorem.words(),
    brandId: faker.number.int(),
    ...override,
  };

  return model;
}
