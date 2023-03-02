import express from "express";
import routes from "./routes";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes());

app.listen(process.env.PORT || 8080, () => console.log("API running..."));

/**
 * M = MODELs      - classes de modelos de dados - regras de negócio
 * V = VIEWs       - definições das rotas
 * C = CONTROLLERs - o recebimento e tratamento da requisição
 *
 * Arquitetura estrutural do projeto
 *
 * arquitetura limpa
 * DDD
 * mvvm
 */
