import { beforeEach, describe, expect, it } from "vitest";
import { CreateBrandUseCase } from "./create-brand-use-case";
import { InMemoryBrandProvider } from "../../tests/in-memory-database/in-memory-brand-provider";
import { ConflictError } from "../errors/ApiErrors";

let sut: CreateBrandUseCase;
let inMemoryBrandRepository: InMemoryBrandProvider;

describe("Use Case -> Create Brand", () => {
  beforeEach(() => {
    inMemoryBrandRepository = new InMemoryBrandProvider();
    sut = new CreateBrandUseCase(inMemoryBrandRepository);
  });

  it("should be able to create a brand", async () => {
    await sut.execute("xaiomi");

    expect(inMemoryBrandRepository?.items).toHaveLength(1);
    expect("id" in inMemoryBrandRepository.items[0]).toBe(true);
  });

  it("should not be able to create a brand with existing name", async () => {
    await sut.execute("xaiomi");

    expect(async () => await sut.execute("xaiomi")).rejects.toBeInstanceOf(
      ConflictError
    );
  });
});
