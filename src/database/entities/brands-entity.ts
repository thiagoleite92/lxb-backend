import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

export class Brands extends Model {
  public id!: number;
  public color!: string;
}

Brands.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Brands",
    tableName: "TB_BRANDS",
  }
);
