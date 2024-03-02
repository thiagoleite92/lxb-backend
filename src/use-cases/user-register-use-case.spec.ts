import { describe, it, expect, beforeEach } from "vitest";
import { UserRegisterUseCase } from "./user-register-use-case";
import { InMemoryUserProvider } from "../../tests/in-memory-database/in-memory-user-provider";
import { makeUser } from "../../tests/factories/make-user";
import { FakeHasher } from "../../tests/cryptography/cryptograhy";
import { HashGenerator } from "../cryptography/hash-generator";

let sut: UserRegisterUseCase;
let inMemoryUserProvider: InMemoryUserProvider;
let hashGenerator: HashGenerator;

describe("Use Case -> User Register", () => {
  beforeEach(() => {
    inMemoryUserProvider = new InMemoryUserProvider();
    hashGenerator = new FakeHasher();
    sut = new UserRegisterUseCase(inMemoryUserProvider, hashGenerator);
  });

  it("should be able to register a user", async () => {
    const user = makeUser();

    await sut.execute(user);

    expect(inMemoryUserProvider?.items).toHaveLength(1);
    expect("id" in inMemoryUserProvider.items[0]).toBe(true);
  });

  it("should be able to hash a password user upon register", async () => {
    const user = makeUser({ password: "Senha@123" });

    await sut.execute(user);

    const hashedPassword = await hashGenerator.hash("Senha@123");

    expect(inMemoryUserProvider?.items).toHaveLength(1);
    expect("id" in inMemoryUserProvider.items[0]).toBe(true);
    expect(inMemoryUserProvider.items[0]?.password).toEqual(hashedPassword);
  });
});
