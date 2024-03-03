import { ColorRepository } from "../../repositories/color-repository";
import { Color } from "../entities/color-entity";

export class ColorProvider implements ColorRepository {
  async create(name: string): Promise<void> {
    await Color.create({ color: name });
  }
  findByName(name: string): Promise<Color | null> {
    return Color.findOne({ where: { color: name } });
  }
}
