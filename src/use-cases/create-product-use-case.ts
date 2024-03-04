import { BrandProvider } from "../database/providers/brand-provider";
import { ColorProvider } from "../database/providers/color-provider";
import { ModelProvider } from "../database/providers/models-provider";
import { ConflictError } from "../errors/ApiErrors";
import { ProductRepository } from "../repositories/product-repository";
import { CreateProductV1 } from "../schemas";

export class CreateProductUseCase {
  constructor(
    private readonly productProvider: ProductRepository,
    private readonly colorProvider: ColorProvider,
    private readonly modelProvider: ModelProvider,
    private readonly brandProvider: BrandProvider
  ) {}

  async execute(createProduct: CreateProductV1) {
    const existingProduct = await this.productProvider.findExistingProduct(
      createProduct
    );

    if (existingProduct) {
      throw new ConflictError("Product already exists");
    }

    const [color] = await this.colorProvider.findOrCreate(createProduct?.color);

    const [brand] = await this.brandProvider.findOrCreate(createProduct?.brand);

    const [model] = await this.modelProvider.findOrCreate(
      createProduct?.model,
      brand?.id
    );

    const newProduct = {
      colorId: color?.id,
      modelId: model?.id,
      brandId: brand?.id,
      name: createProduct?.name,
      price: createProduct?.price,
    };

    await this.productProvider.create(newProduct);
  }
}
