import { beforeEach, describe, expect, it } from "vitest";
import { CreateColorUseCase } from "./create-color-use-case";
import { InMemoryColorProvider } from "../../tests/in-memory-database/in-memory-color-provider";
import { ConflictError } from "../errors/ApiErrors";

let sut: CreateColorUseCase;
let inMemoryColorProvider: InMemoryColorProvider;

describe("Use Case -> Create Color", () => {
  beforeEach(() => {
    inMemoryColorProvider = new InMemoryColorProvider();
    sut = new CreateColorUseCase(inMemoryColorProvider);
  });

  it("should be able to create a color", async () => {
    await sut.execute("laranja");

    expect(inMemoryColorProvider?.items).toHaveLength(1);
    expect("id" in inMemoryColorProvider.items[0]).toBe(true);
  });

  it("should not be able to create a color with existing name", async () => {
    await sut.execute("laranja");

    expect(async () => await sut.execute("laranja")).rejects.toBeInstanceOf(
      ConflictError
    );
  });
});
