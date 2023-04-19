import "reflect-metadata";

import express from "express";
import routes from "./routes";
import cors from "cors";
import "dotenv/config";
import { appDataSource } from "../app/shared/db/data-source";

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes());

// só deve iniciar o servidor depois que for estabelecida
// a comunicação entre o ORM e o banco de dados.
// Assim, garantimos que quando receber uma requisição,
// a comunição com o banco de dados já estara feita.
appDataSource.initialize().then(() => {
  app.listen(process.env.PORT || 8080, () =>
    console.log("API running... alterada")
  );
});

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
