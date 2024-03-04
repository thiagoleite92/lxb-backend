import { faker } from "@faker-js/faker";

export function makeColor(override = {}, id?: number) {
  const color = {
    id,
    color: faker.color.human(),
    ...override,
  };

  return color;
}
