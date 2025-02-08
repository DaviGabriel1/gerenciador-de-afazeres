import mongoose from "mongoose";
import {Sequelize} from "sequelize";
import {config} from "dotenv";

config();

const MONGO_URI = process.env.MONGO_URI ? process.env.MONGO_URI : "mongodb://localhost:27017/mongoBase";

export const connectMongo = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("conectado ao mongoDB com sucesso!");
    }
    catch(error){
        console.log("erro ao conectar ao mongoDB: ",error);
        process.exit(1);
    }
}

export const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || "railway",
    process.env.MYSQL_USER || "root",
    process.env.MYSQL_PASSWORD || "",
    {
      host: process.env.MYSQL_HOST || "localhost",
      dialect: "mysql",
      port: Number(process.env.MYSQL_PORT) || 3306,
      logging: false,
    }
);

export const connectMySQL = async () => {
    try {
        console.log(sequelize)
      await sequelize.authenticate();
      console.log("MySQL conectado!");
    } catch (error) {
      console.error("Erro ao conectar no MySQL:", error);
    }
  };