/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { UserRepository } from "../../src/repositories/user-repository";
import { registerUserSchema } from "../../src/schemas";

export class InMemoryUserProvider implements UserRepository {
  public items: any[] = [];

  async create(user: z.infer<typeof registerUserSchema>) {
    const createUser = {
      name: user.name,
      password: user.password,
      email: user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: Math.floor(Math.random() * 10000),
    };

    this.items.push(createUser);
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async findAll() {
    const items = this.items;
    return items;
  }
}
