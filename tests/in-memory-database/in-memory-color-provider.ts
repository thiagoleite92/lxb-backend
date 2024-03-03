import { ColorProvider } from "../../src/database/providers/color-provider";

export class InMemoryColorProvider implements ColorProvider {
  public items: any[] = [];

  async create(name: string): Promise<void> {
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
}
