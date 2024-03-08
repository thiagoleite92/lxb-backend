import { ColorRepository } from "../repositories/color-repository";

export class GetAlLColorsUseCase {
  constructor(private readonly colorProvider: ColorRepository) {}

  async execute() {
    const colors = await this.colorProvider.getAllColors();

    return colors.map(parseColors);
  }
}

const parseColors = ({ color }: { color: string }) => ({
  value: color,
});
