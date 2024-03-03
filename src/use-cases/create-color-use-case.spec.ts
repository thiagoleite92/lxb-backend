import { beforeEach, describe, it } from "vitest";
import { CreateColorUseCase } from "./create-color-use-case";
import { ColorRepository } from "../repositories/color-repository";
import { ColorProvider } from "../database/providers/color-provider";

let sut: CreateColorUseCase;
let colorRepository: ColorRepository;

describe("Use Case -> Create Color", () => {
  beforeEach(() => {
    colorRepository = new ColorProvider();
    sut = new CreateColorUseCase(colorRepository);
  });

  it("should be able to create a color", async () => {
    await sut.execute("laranja");
  });
});
