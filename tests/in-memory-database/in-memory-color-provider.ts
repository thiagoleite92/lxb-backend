/* eslint-disable @typescript-eslint/no-explicit-any */
import { Colors } from "../../src/database/entities/colors-entity";
import { ColorProvider } from "../../src/database/providers/color-provider";

export class InMemoryColorProvider implements ColorProvider {
  public items: any[] = [];

  async create(name: string) {
    this.items.push({
      color: name,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: Math.floor(Math.random() * 10000),
    });
  }

  async findByName(name: string) {
    const color = this.items.find((item) => item.color === name);

    if (color) {
      return color;
    } else {
      return null;
    }
  }

  async findOrCreate(color: string): Promise<[Colors, boolean]> {
    const existingColor = await this.findByName(color);

    if (existingColor) {
      return [existingColor, false];
    } else {
      const newColor = await this.create(color);

      return [newColor!, true];
    }
  }
}
