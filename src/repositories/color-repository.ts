import { Color } from "../database/entities/color-entity";

export interface ColorRepository {
  create(name: string): Promise<void>;
  findByName(name: string): Promise<Color | null>;
}
