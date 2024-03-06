import {
  CreateProduct,
  ProductRepository,
  UpdateProduct,
} from "../../repositories/product-repository";
import { CreateProductV1 } from "../../schemas";
import { Brands } from "../entities/brands-entity";
import { Colors } from "../entities/colors-entity";
import { Models } from "../entities/models-entity";
import { Products } from "../entities/products-entity";

export class ProductProvider implements ProductRepository {
  async create(createProduct: CreateProduct) {
    await Products.create(createProduct);
  }

  async createBulk(createProduct: CreateProduct[]) {
    console.log(createProduct, "bulk");
  }

  async findExistingProduct({
    name,
    brand,
    color,
    model,
    price,
  }: CreateProductV1): Promise<Products | null> {
    return Products.findOne({
      where: { name, price },
      attributes: ["name", "price", "id"],
      include: [
        {
          model: Colors,
          where: { color },
          as: "color",
          attributes: ["color", "id"],
        },
        {
          model: Brands,
          where: { brand },
          as: "brand",
          attributes: ["brand", "id"],
        },
        {
          model: Models,
          where: { model },
          as: "model",
          attributes: ["model", "id"],
        },
      ],
    });
  }

  async findById(id: number): Promise<Products | null> {
    return Products.findByPk(id);
  }

  async update(updateProduct: UpdateProduct) {
    await Products.update(
      { ...updateProduct },
      { where: { id: updateProduct.id } }
    );
    return;
  }

  async delete(id: number) {
    await Products.destroy({ where: { id } });
  }

  async findAll() {
    return Products.findAll({
      attributes: { exclude: ["brandId", "colorId", "modelId"] },
      include: [
        {
          model: Models,
          as: "model",
          attributes: ["model"],
        },
        {
          model: Brands,
          as: "brand",
          attributes: ["brand"],
        },
        {
          model: Colors,
          as: "color",
          attributes: ["color"],
        },
      ],
    });
  }
}
