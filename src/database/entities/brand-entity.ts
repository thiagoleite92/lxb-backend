import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

export class Brand extends Model {
  public id!: number;
  public color!: string;
}

Brand.init(
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
    modelName: "Brand",
    tableName: "TB_BRANDS",
  }
);
