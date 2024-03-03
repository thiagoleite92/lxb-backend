import { faker } from "@faker-js/faker";

import { CreateBrandSchema } from "../../src/schemas";

export function makeBrand(
  override: Partial<CreateBrandSchema> = {},
  id?: number
) {
  const brand = {
    id,
    brand: faker.lorem.words(),
    ...override,
  };

  return brand;
}
