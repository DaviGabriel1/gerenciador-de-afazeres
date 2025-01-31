import express from "express";
import {config} from "dotenv";

import router from "./routes";

config();

const app = express();

app.use(express.json());

app.use("/",router);

const port = process.env.PORT || 8000;

app.listen(port,() => {
    console.log(`servidor rodando na porta ${port}...`);
})