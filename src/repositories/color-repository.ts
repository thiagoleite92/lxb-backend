import { Colors } from "../database/entities/colors-entity";

export interface ColorRepository {
  create(name: string): Promise<void>;
  findOrCreate(brand: string): Promise<[Colors, boolean]>;
  getAllColors(): Promise<Colors[]>;
}
