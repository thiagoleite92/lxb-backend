import { Color } from "../database/entities/colors-entity";

export interface ColorRepository {
  create(name: string): Promise<void>;
  findByName(name: string): Promise<Color | null>;
}
