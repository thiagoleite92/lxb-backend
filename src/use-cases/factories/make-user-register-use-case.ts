import { BcrypterHasher } from "../../cryptography/bcrypt/bcrypt-hasher";
import { UserProvider } from "../../database/providers/user-provider";
import { UserRegisterUseCase } from "../user-register-use-case";

export const makeUserRegisterUseCase = () => {
  return new UserRegisterUseCase(new UserProvider(), new BcrypterHasher());
};
