import express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());

app.use(routes());

app.listen(8080, () => console.log("API running..."));

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
