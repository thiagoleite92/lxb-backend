import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryBrandProvider } from "../../tests/in-memory-database/in-memory-brand-provider";
import { InMemoryColorProvider } from "../../tests/in-memory-database/in-memory-color-provider";
import { InMemoryModelProvider } from "../../tests/in-memory-database/in-memory-model-provider";
import { CreateProductUseCase } from "./create-product-use-case";
import { InMemoryProductProvider } from "../../tests/in-memory-database/in-memory-product-provider";
import { makeColor } from "../../tests/factories/make-color";
import { makeBrand } from "../../tests/factories/make-brand";
import { makeModel } from "../../tests/factories/make-model";
import { ConflictError } from "../errors/ApiErrors";

let sut: CreateProductUseCase;
let inMemoryProductProvider: InMemoryProductProvider;
let inMemoryColorProvider: InMemoryColorProvider;
let inMemoryModelProvider: InMemoryModelProvider;
let inMemoryBrandProvider: InMemoryBrandProvider;

describe("Use Case -> CreateProductUseCase", () => {
  beforeEach(() => {
    inMemoryColorProvider = new InMemoryColorProvider();
    inMemoryBrandProvider = new InMemoryBrandProvider();
    inMemoryModelProvider = new InMemoryModelProvider();
    inMemoryProductProvider = new InMemoryProductProvider(
      inMemoryColorProvider,
      inMemoryBrandProvider,
      inMemoryModelProvider
    );

    sut = new CreateProductUseCase(
      inMemoryProductProvider,
      inMemoryColorProvider,
      inMemoryModelProvider,
      inMemoryBrandProvider
    );
  });

  it("should be able to create a product with existing color, brand and model", async () => {
    const { color } = makeColor();
    const { brand, id: brandId } = makeBrand();
    const model = makeModel({}, brandId);

    await inMemoryColorProvider.create(color);
    await inMemoryBrandProvider.create(brand);
    await inMemoryModelProvider.create(model);

    const product = {
      color,
      brand,
      model: model?.model,
      name: "Novo Produto Teste 1",
      price: 1000,
    };

    await sut.execute(product);

    expect(inMemoryProductProvider?.items).toHaveLength(1);
    expect("id" in inMemoryProductProvider.items[0]).toBe(true);
  });

  it("should not be able to create a product that already exists", async () => {
    const { color } = makeColor();
    const { brand, id: brandId } = makeBrand();
    const model = makeModel({}, brandId);

    await inMemoryColorProvider.create(color);
    await inMemoryBrandProvider.create(brand);
    await inMemoryModelProvider.create(model);

    const product = {
      color,
      brand,
      model: model?.model,
      name: "Novo Produto Teste 1",
      price: 1000,
    };

    await sut.execute(product);

    expect(async () => await sut.execute(product)).rejects.toBeInstanceOf(
      ConflictError
    );
  });
});
