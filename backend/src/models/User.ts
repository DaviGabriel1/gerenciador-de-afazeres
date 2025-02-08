import { DataTypes, Model} from "sequelize";
import {sequelize} from "../config/database"; 

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  email_verified_at?: Date | null; 
  password: string;
  remember_token?: string | null; 
  createdAt?: Date;
  updatedAt?: Date;
  phone: string;
  avatar: string;
  level: "admin" | "user"; 
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public email_verified_at?: Date | null;
  public password!: string;
  public remember_token?: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public phone!: string;
  public avatar!: string;
  public level!: "admin" | "user";
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remember_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
         field: 'created_at',
         type: DataTypes.DATE,
     },
     updatedAt: {
         field: 'updated_at',
         type: DataTypes.DATE,
     },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
