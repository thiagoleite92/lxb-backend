import { BrandProvider } from "../database/providers/brand-provider";
import { ColorProvider } from "../database/providers/color-provider";
import { ModelProvider } from "../database/providers/models-provider";
import { ResourceNotFoundError } from "../errors/ApiErrors";
import { ProductRepository } from "../repositories/product-repository";
import { UpdateProduct } from "../schemas";

export class UpdateProductUseCase {
  constructor(
    private readonly productProvider: ProductRepository,
    private readonly colorProvider: ColorProvider,
    private readonly modelProvider: ModelProvider,
    private readonly brandProvider: BrandProvider
  ) {}

  async execute(updateProduct: UpdateProduct) {
    const product = await this.productProvider.findById(updateProduct?.id);

    if (!product) {
      throw new ResourceNotFoundError("Product not found");
    }

    const [color] = await this.colorProvider.findOrCreate(updateProduct?.color);

    const [brand] = await this.brandProvider.findOrCreate(updateProduct?.brand);

    const [model] = await this.modelProvider.findOrCreate(
      updateProduct?.model,
      brand?.id
    );

    const newProduct = {
      name: updateProduct?.name,
      price: updateProduct?.price,
      colorId: color?.id,
      brandId: brand?.id,
      modelId: model?.id,
      id: updateProduct?.id,
    };

    await this.productProvider.update(newProduct);
  }
}
