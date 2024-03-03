import { User } from "../database/entities/users-entity";

export interface UserRepository {
  create(user: {
    name: string;
    password: string;
    email: string;
  }): Promise<void>;

  findByEmail(email: string): Promise<User | null>;

  findAll(): Promise<User[]>;
}
