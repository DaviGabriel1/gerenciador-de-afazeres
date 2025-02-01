import mongoose from "mongoose";
import {config} from "dotenv";

config();

const MONGO_URI = process.env.MONGO_URI ? process.env.MONGO_URI : "mongodb://localhost:27017/mongoBase";

export const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("conectado ao mongoDB com sucesso!");
    }
    catch(error){
        console.log("erro ao conectar ao mongoDB: ",error);
        process.exit(1);
    }
}