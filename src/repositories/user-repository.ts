import { Users } from "../database/entities/users-entity";

export interface UserRepository {
  create(user: {
    name: string;
    password: string;
    email: string;
  }): Promise<void>;

  findByEmail(email: string): Promise<Users | null>;

  findAll(): Promise<Users[]>;

  findById(id: number): Promise<Users | null>;
}
