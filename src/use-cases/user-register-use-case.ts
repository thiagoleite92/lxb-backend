import { UserRepository } from "../repositories/user-repository";
import { ConflictError } from "./errors/conflict-error";

export class UserRegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: { name: string; email: string; password: string }) {
    const existingUser = await this.userRepository.findByEmail(user?.email);

    if (existingUser) {
      throw new ConflictError("E-mail already in use");
    }

    return this.userRepository.create(user);
  }
}
