import { ConflictError } from "../errors/ApiErrors";
import { ColorRepository } from "../repositories/color-repository";

export class CreateColorUseCase {
  constructor(private readonly colorRepository: ColorRepository) {}

  async execute(color: string): Promise<void> {
    const existingColor = await this.colorRepository.findByName(color);

    if (existingColor) {
      throw new ConflictError("Color already exists");
    }

    await this.colorRepository.create(color);
  }
}
