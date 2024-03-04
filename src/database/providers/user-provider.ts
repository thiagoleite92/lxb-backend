import { UserRepository } from "../../repositories/user-repository";
import { Users } from "../entities/users-entity";

export class UserProvider implements UserRepository {
  async create(user: { name: string; password: string; email: string }) {
    await Users.create(user);
  }

  async findByEmail(email: string) {
    return await Users.findOne({ where: { email } });
  }

  async findAll() {
    return Users.findAll();
  }

  async findById(id: number): Promise<Users | null> {
    return Users.findByPk(id);
  }
}
