import { ConflictError } from "../errors/ApiErrors";
import { BrandRepository } from "../repositories/brand-repository";

export class CreateBrandUseCase {
  constructor(private readonly brandRepository: BrandRepository) {}

  async execute(brand: string): Promise<void> {
    const existingBrand = await this.brandRepository.findByName(brand);

    if (existingBrand) {
      throw new ConflictError("Brand already exists");
    }

    await this.brandRepository.create(brand);
  }
}
