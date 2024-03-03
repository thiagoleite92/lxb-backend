import { beforeEach, describe, expect, it } from "vitest";
import { CreateModelUseCase } from "./create-model-use-case";
import { InMemoryModelProvider } from "../../tests/in-memory-database/in-memory-model-provider";
import { InMemoryBrandProvider } from "../../tests/in-memory-database/in-memory-brand-provider";
import { makeBrand } from "../../tests/factories/make-brand";
import { ConflictError, ResourceNotFoundError } from "../errors/ApiErrors";
import { makeModel } from "../../tests/factories/make-model";

let sut: CreateModelUseCase;
let inMemoryModelProvider: InMemoryModelProvider;
let inMemoryBrandProvider: InMemoryBrandProvider;

describe("Use Case -> Create Model", () => {
  beforeEach(() => {
    inMemoryModelProvider = new InMemoryModelProvider();
    inMemoryBrandProvider = new InMemoryBrandProvider();
    sut = new CreateModelUseCase(inMemoryModelProvider, inMemoryBrandProvider);
  });

  it("should not be able to create a model with no brand", async () => {
    expect(
      async () => await sut.execute({ model: "novo modelo", brandId: 0 })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to create a model with existing name", async () => {
    const brandId = 159;

    const newBrand = makeBrand({}, brandId);

    inMemoryBrandProvider.items.push(newBrand);

    const existingModel = makeModel({ brandId });

    inMemoryModelProvider.items.push(existingModel);

    expect(
      async () => await sut.execute({ model: existingModel.model, brandId })
    ).rejects.toBeInstanceOf(ConflictError);
  });

  it("should be able to create a model new model", async () => {
    const brandId = 159;

    const newBrand = makeBrand({}, brandId);

    inMemoryBrandProvider.items.push(newBrand);

    await sut.execute({ model: "teste", brandId });

    expect(inMemoryModelProvider.items).toHaveLength(1);
    expect("id" in inMemoryModelProvider.items[0]).toBe(true);
  });
});
