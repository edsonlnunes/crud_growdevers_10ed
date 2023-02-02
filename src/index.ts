import express, { Request, Response } from "express";
import { Growdever } from "./growdever";
import { v4 as uuid } from "uuid";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

const app = express();
app.use(express.json());

const listaGrowdevers: Array<Growdever> = [];

app.get("/", (request: Request, response: Response) =>
  response.status(200).json("API OK")
);

app.listen(8080, () => console.log("API running..."));

app.post("/growdevers", (request: Request, response: Response) => {
  const { nome, dataNascimento, cpf, habilidades } = request.body;

  if (!nome || !dataNascimento || !cpf || !habilidades) {
    return response.status(400).json("Verifique os dados e tente novamente :(");
  }

  if (!cpfValidator.isValid(cpf)) {
    return response.status(400).json("Cpf não valido :(");
  }

  if (listaGrowdevers.some((growdever) => growdever.cpf === cpf)) {
    return response.status(400).json("Este cpf já está cadastrado!");
  }

  const growdever = new Growdever(
    uuid(),
    nome,
    dataNascimento,
    cpf,
    habilidades
  );

  listaGrowdevers.push(growdever);

  return response.status(201).json(growdever.paraDetalheJSON());
});

app.get("/growdevers", (request: Request, response: Response) => {
  const growdevers = listaGrowdevers.map((growdever) =>
    growdever.paraModelJson()
  );
  return response.status(200).json(growdevers);
});
