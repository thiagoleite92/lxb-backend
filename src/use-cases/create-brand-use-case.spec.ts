import { beforeEach, describe, expect, it } from "vitest";
import { CreateBrandUseCase } from "./create-brand-use-case";
import { InMemoryBrandProvider } from "../../tests/in-memory-database/in-memory-brand-provider";
import { ConflictError } from "../errors/ApiErrors";

let sut: CreateBrandUseCase;
let inMemoryBrandProvider: InMemoryBrandProvider;

describe("Use Case -> Create Brand", () => {
  beforeEach(() => {
    inMemoryBrandProvider = new InMemoryBrandProvider();
    sut = new CreateBrandUseCase(inMemoryBrandProvider);
  });

  it("should be able to create a brand", async () => {
    await sut.execute("xaiomi");

    expect(inMemoryBrandProvider?.items).toHaveLength(1);
    expect("id" in inMemoryBrandProvider.items[0]).toBe(true);
  });

  it("should not be able to create a brand with existing name", async () => {
    await sut.execute("xaiomi");

    expect(async () => await sut.execute("xaiomi")).rejects.toBeInstanceOf(
      ConflictError
    );
  });
});
