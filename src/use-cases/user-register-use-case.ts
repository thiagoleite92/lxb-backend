import { z } from "zod";
import { UserRepository } from "../repositories/user-repository";
import { ConflictError } from "../errors/ApiErrors";
import { registerUserSchema } from "../schemas";
import { HashGenerator } from "../cryptography/hash-generator";

export class UserRegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute(user: z.infer<typeof registerUserSchema>) {
    const existingUser = await this.userRepository.findByEmail(user?.email);

    if (existingUser) {
      throw new ConflictError("E-mail already in use");
    }

    const hashedPassowrd = await this.hashGenerator.hash(user?.password);

    user.password = hashedPassowrd;

    return this.userRepository.create(user);
  }
}
