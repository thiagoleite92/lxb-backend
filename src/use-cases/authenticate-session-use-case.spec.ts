import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateSessionUseCase } from "./authenticate-session-use-case";
import { InMemoryUserProvider } from "../../tests/in-memory-database/in-memory-user-provider";
import { Encrypter } from "../cryptography/encrypter";
import { JwtEncrypter } from "../cryptography/jwt/jwt";
import { makeUser } from "../../tests/factories/make-user";
import { FakeHasher } from "../../tests/cryptography/cryptograhy";

let sut: AuthenticateSessionUseCase;
let inMemoryUserProvider: InMemoryUserProvider;
let fakeHasher: FakeHasher;
let encrypt: Encrypter;

describe("Use Case -> Authenticate Session", () => {
  beforeEach(() => {
    inMemoryUserProvider = new InMemoryUserProvider();
    fakeHasher = new FakeHasher();
    encrypt = new JwtEncrypter();

    sut = new AuthenticateSessionUseCase(
      inMemoryUserProvider,
      fakeHasher,
      encrypt
    );
  });

  it("should be able to authenticate a session", async () => {
    const user = makeUser({
      password: await fakeHasher.hash("123321"),
      email: "usuario@email.com",
    });

    inMemoryUserProvider.items.push(user);

    const result = await sut.execute({
      login: user.email,
      password: "123321",
    });

    expect(result).toEqual({
      token: expect.any(String),
    });
  });
});
