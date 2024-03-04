import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import { Brands } from "./brands-entity";
import { Colors } from "./colors-entity";
import { Models } from "./models-entity";

export class Products extends Model {
  public id!: number;
  public name!: string;
  public brand!: string;
  public model!: string;
  public price!: number;
  public color!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TB_BRANDS",
        key: "brandId",
      },
    },
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TB_COLORS",
        key: "colorId",
      },
    },
    modelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TB_MODELS",
        key: "modelId",
      },
    },
  },
  {
    sequelize,
    modelName: "Products",
    tableName: "TB_PRODUCTS",
  }
);

Products.belongsTo(Brands, { foreignKey: "brandId", as: "brand" });
Products.belongsTo(Colors, { foreignKey: "colorId", as: "color" });
Products.belongsTo(Models, { foreignKey: "modelId", as: "model" });
