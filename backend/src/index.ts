import express from "express";
import {config} from "dotenv";
import cors from "cors";

import { connectMongo,connectMySQL } from "./config/database";
import router from "./routes";

config();

connectMongo();
connectMySQL();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api",router);

const port = process.env.PORT || 8000;

app.listen(port,() => {
    console.log(`servidor rodando na porta ${port}...`);
})