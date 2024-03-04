import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryBrandProvider } from "../../tests/in-memory-database/in-memory-brand-provider";
import { InMemoryColorProvider } from "../../tests/in-memory-database/in-memory-color-provider";
import { InMemoryModelProvider } from "../../tests/in-memory-database/in-memory-model-provider";
import { InMemoryProductProvider } from "../../tests/in-memory-database/in-memory-product-provider";
import { makeColor } from "../../tests/factories/make-color";
import { makeBrand } from "../../tests/factories/make-brand";
import { makeModel } from "../../tests/factories/make-model";
import { DeleteProductUseCase } from "./delete-product-use-case";
import { ResourceNotFoundError } from "../errors/ApiErrors";

let sut: DeleteProductUseCase;
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

    sut = new DeleteProductUseCase(inMemoryProductProvider);
  });

  it("should be able to exclude a existing product", async () => {
    const { color } = makeColor();
    const { brand, id: brandId } = makeBrand();
    const model = makeModel({}, brandId);

    await inMemoryColorProvider.create(color);
    await inMemoryBrandProvider.create(brand);
    await inMemoryModelProvider.create(model);

    const product = {
      id: 1,
      colorId: inMemoryColorProvider.items[0]?.id,
      brandId: inMemoryBrandProvider.items[0]?.id,
      modelId: inMemoryModelProvider.items[0]?.id,
      name: "Novo Produto Teste 1",
      price: 1000,
    };

    inMemoryProductProvider.items.push(product);

    expect(inMemoryProductProvider?.items).toHaveLength(1);

    await sut.execute(inMemoryProductProvider.items[0].id);

    expect(inMemoryProductProvider?.items).toHaveLength(0);
  });

  it("should be able to exclude a existing product", async () => {
    const { color } = makeColor();
    const { brand, id: brandId } = makeBrand();
    const model = makeModel({}, brandId);

    await inMemoryColorProvider.create(color);
    await inMemoryBrandProvider.create(brand);
    await inMemoryModelProvider.create(model);

    const product = {
      id: 1,
      colorId: inMemoryColorProvider.items[0]?.id,
      brandId: inMemoryBrandProvider.items[0]?.id,
      modelId: inMemoryModelProvider.items[0]?.id,
      name: "Novo Produto Teste 1",
      price: 1000,
    };

    inMemoryProductProvider.items.push(product);

    expect(inMemoryProductProvider?.items).toHaveLength(1);

    expect(async () => await sut.execute(123)).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );

    expect(inMemoryProductProvider?.items).toHaveLength(1);
  });
});
