import { UserRepository } from "../../repositories/user-repository";
import { User } from "../entities/user-entity";

export class UserProvider implements UserRepository {
  async create(user: { name: string; password: string; email: string }) {
    await User.create(user);
  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async findAll() {
    return User.findAll();
  }
}
