import { BcrypterHasher } from "../../cryptography/bcrypt/bcrypt-hasher";
import { JwtEncrypter } from "../../cryptography/jwt/jwt";
import { UserProvider } from "../../database/providers/user-provider";
import { AuthenticateSessionUseCase } from "../authenticate-session-use-case";

export const makeAuthenticateSessionUseCase = () => {
  return new AuthenticateSessionUseCase(
    new UserProvider(),
    new BcrypterHasher(),
    new JwtEncrypter(new UserProvider())
  );
};
