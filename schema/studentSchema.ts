import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connectDb";

class Student extends Model {
  public id!: number;
  public username!: string;
  public joinedAt!:Date;
  public leftAt!:Date | null
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    joinedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    leftAt:{
        type:DataTypes.DATE,
        allowNull:true
    }
  },
  {
    sequelize,
    tableName: "student",
    timestamps: true,
  }
);

export default Student;
