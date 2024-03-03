import { ConflictError, ResourceNotFoundError } from "../errors/ApiErrors";
import { BrandRepository } from "../repositories/brand-repository";
import { ModelRepository } from "../repositories/models-repository";
import { CreateModelSchema } from "../schemas";

export class CreateModelUseCase {
  constructor(
    private readonly modelRepository: ModelRepository,
    private readonly brandRepository: BrandRepository
  ) {}

  async execute({ model, brandId }: CreateModelSchema): Promise<void> {
    const brandExists = await this.brandRepository.findById(brandId);

    if (!brandExists) {
      throw new ResourceNotFoundError("Brand not found");
    }

    const existingModel = await this.modelRepository.findByName(model);

    if (existingModel) {
      throw new ConflictError("Model already exists");
    }

    await this.modelRepository.create({ model, brandId });
  }
}
