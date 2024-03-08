import { BrandRepository } from "../repositories/brand-repository";

export class GetAlLBrandsUseCase {
  constructor(private readonly brandProvider: BrandRepository) {}

  async execute() {
    const brands = await this.brandProvider.getAllBrands();

    return brands.map(parseBrands);
  }
}

const parseBrands = ({ brand }: { brand: string }) => ({
  value: brand,
});
