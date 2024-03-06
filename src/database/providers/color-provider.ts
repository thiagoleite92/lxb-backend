import { ColorRepository } from "../../repositories/color-repository";
import { Colors } from "../entities/colors-entity";

export class ColorProvider implements ColorRepository {
  async create(name: string): Promise<void> {
    await Colors.create({ color: name });
  }
  async findOrCreate(color: string): Promise<[Colors, boolean]> {
    return Colors.findOrCreate({ where: { color }, defaults: { color } });
  }

  async getAllColors() {
    return Colors.findAll({
      attributes: ["id", "color"],
    });
  }
}
