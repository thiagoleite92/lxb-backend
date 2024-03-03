import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

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
  },
  {
    sequelize,
    modelName: "Products",
    tableName: "TB_PRODUCTS",
  }
);
