import { User } from "../database/entities/user-entity";

export interface UserRepository {
  create(user: {
    name: string;
    password: string;
    email: string;
  }): Promise<void>;

  findByEmail(email: string): Promise<User | null>;
}
