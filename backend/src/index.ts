import express from "express";
import {config} from "dotenv";
import cors from "cors";

import { connectMongo,connectMySQL } from "./config/database";
import eventRouter from "./routes/events";
import authRouter from "./routes/auth";

config();

connectMongo();
connectMySQL();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api",eventRouter);
app.use("/auth",authRouter);

const port = process.env.PORT || 8000;

app.listen(port,() => {
    console.log(`servidor rodando na porta ${port}...`);
})