import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

export class Models extends Model {
  public id!: number;
  public color!: string;
}

Models.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TB_BRANDS",
        key: "brandId",
      },
    },
  },
  {
    sequelize,
    modelName: "Models",
    tableName: "TB_MODELS",
  }
);
