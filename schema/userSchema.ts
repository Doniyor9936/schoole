import { Model, DataTypes } from "sequelize";
import sequelize from "../db/connectDb";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!:string;
  public role!: "user" | "admin" | "teacher" | "student";
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  role: {
    type: DataTypes.ENUM("user", "admin", "teacher", "student"),
    allowNull: false,
  },
},{
    sequelize,
    tableName:"users",
    timestamps:true
});

export default User