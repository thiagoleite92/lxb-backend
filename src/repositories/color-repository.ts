import { Colors } from "../database/entities/colors-entity";

export interface ColorRepository {
  create(name: string): Promise<void>;
  findOrCreate(name: string): Promise<[Colors, boolean]>;
}
