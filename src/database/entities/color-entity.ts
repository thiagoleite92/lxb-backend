import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

export class Color extends Model {
  public id!: number;
  public color!: string;
}

Color.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Color",
    tableName: "TB_COLORS",
  }
);
