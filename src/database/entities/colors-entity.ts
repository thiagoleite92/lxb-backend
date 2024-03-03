import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

export class Colors extends Model {
  public id!: number;
  public color!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Colors.init(
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
    modelName: "Colors",
    tableName: "TB_COLORS",
  }
);
