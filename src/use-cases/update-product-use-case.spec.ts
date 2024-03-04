import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryBrandProvider } from "../../tests/in-memory-database/in-memory-brand-provider";
import { InMemoryColorProvider } from "../../tests/in-memory-database/in-memory-color-provider";
import { InMemoryModelProvider } from "../../tests/in-memory-database/in-memory-model-provider";
import { InMemoryProductProvider } from "../../tests/in-memory-database/in-memory-product-provider";
import { makeColor } from "../../tests/factories/make-color";
import { makeBrand } from "../../tests/factories/make-brand";
import { makeModel } from "../../tests/factories/make-model";
import { UpdateProductUseCase } from "./update-product-use-case";
import { ResourceNotFoundError } from "../errors/ApiErrors";

let sut: UpdateProductUseCase;
let inMemoryProductProvider: InMemoryProductProvider;
let inMemoryColorProvider: InMemoryColorProvider;
let inMemoryModelProvider: InMemoryModelProvider;
let inMemoryBrandProvider: InMemoryBrandProvider;

describe("Use Case -> UpdateProductUseCase", () => {
  beforeEach(() => {
    inMemoryColorProvider = new InMemoryColorProvider();
    inMemoryBrandProvider = new InMemoryBrandProvider();
    inMemoryModelProvider = new InMemoryModelProvider();
    inMemoryProductProvider = new InMemoryProductProvider(
      inMemoryColorProvider,
      inMemoryBrandProvider,
      inMemoryModelProvider
    );

    sut = new UpdateProductUseCase(
      inMemoryProductProvider,
      inMemoryColorProvider,
      inMemoryModelProvider,
      inMemoryBrandProvider
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should be able to update a product with existing color, brand and model", async () => {
    const { color } = makeColor();
    const { brand, id: brandId } = makeBrand();
    const model = makeModel({}, brandId);

    await inMemoryColorProvider.create(color);
    await inMemoryBrandProvider.create(brand);
    await inMemoryModelProvider.create(model);

    const product = {
      name: "Novo Produto Teste 1",
      price: 1000,
      colorId: inMemoryColorProvider.items[0].id,
      brandId: inMemoryBrandProvider.items[0].id,
      modelId: inMemoryModelProvider.items[0].id,
    };

    await inMemoryProductProvider.create(product);

    const updateProduct = {
      id: inMemoryProductProvider.items[0].id,
      name: "Produto atualizado",
      price: 1000,
      color,
      brand,
      model: model.model,
    };

    await sut.execute(updateProduct);

    expect(inMemoryProductProvider.items[0].name).toEqual("Produto atualizado");
  });

  it("should be able to update a product with no existing brand, model or color", async () => {
    const { color } = makeColor();
    const { brand, id: brandId } = makeBrand();
    const model = makeModel({}, brandId);

    await inMemoryColorProvider.create(color);
    await inMemoryBrandProvider.create(brand);
    await inMemoryModelProvider.create(model);

    const product = {
      name: "Novo Produto Teste 1",
      price: 1000,
      colorId: inMemoryColorProvider.items[0].id,
      brandId: inMemoryBrandProvider.items[0].id,
      modelId: inMemoryModelProvider.items[0].id,
    };

    await inMemoryProductProvider.create(product);

    const updateProduct = {
      id: inMemoryProductProvider.items[0].id,
      name: "Produto atualizado",
      price: 1000,
      color: "cor diferente",
      brand: "marca diferente",
      model: "novo modelo",
    };

    await sut.execute(updateProduct);

    expect(inMemoryColorProvider.items).toHaveLength(2);
    expect(inMemoryBrandProvider.items).toHaveLength(2);
    expect(inMemoryModelProvider.items).toHaveLength(2);
    expect(inMemoryProductProvider.items).toHaveLength(1);
    expect(inMemoryProductProvider.items[0].name).toEqual("Produto atualizado");
  });

  it("should not be able to update a product that not existgs", async () => {
    const { color } = makeColor();
    const { brand, id: brandId } = makeBrand();
    const model = makeModel({}, brandId);

    await inMemoryColorProvider.create(color);
    await inMemoryBrandProvider.create(brand);
    await inMemoryModelProvider.create(model);

    const product = {
      name: "Novo Produto Teste 1",
      price: 1000,
      colorId: inMemoryColorProvider.items[0].id,
      brandId: inMemoryBrandProvider.items[0].id,
      modelId: inMemoryModelProvider.items[0].id,
    };

    await inMemoryProductProvider.create(product);

    const notExistProduct = {
      id: 123321,
      name: "Produto atualizado",
      price: 1000,
      color: "cor diferente",
      brand: "marca diferente",
      model: "novo modelo",
    };

    expect(
      async () => await sut.execute(notExistProduct)
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
