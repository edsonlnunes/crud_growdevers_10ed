import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { buscarGrowdeversDB, salvarGrowdeversDB } from "../db/growdevers";
import { Growdever, StatusGrowdever } from "../models/growdever";

export class GrowdeverController {
  async cadastrarGrowdever(request: Request, response: Response) {
    const { nome, dataNascimento, cpf, habilidades } = request.body;

    const listaAtual = buscarGrowdeversDB();

    if (listaAtual.some((growdever) => growdever.cpf === cpf)) {
      return response.status(400).json("Este cpf já está cadastrado!");
    }

    const senhaPadrao = `${cpf.slice(0, 3)}@${new Date().getFullYear()}`;

    const senhaEncriptografada = await bcrypt.hash(senhaPadrao, 10);

    const growdever = new Growdever(
      nome,
      dataNascimento,
      cpf,
      habilidades,
      senhaEncriptografada
    );

    listaAtual.push(growdever);

    salvarGrowdeversDB(listaAtual);

    return response.status(201).json(growdever.paraDetalheJSON());
  }

  buscarGrowdevers(request: Request, response: Response) {
    const { status, nome } = request.query;
    const listaFiltrado = buscarGrowdeversDB().filter((growdever) => {
      if (status && nome) {
        return (
          growdever.nome
            .toLowerCase()
            .includes((nome as string).toLowerCase()) &&
          growdever.status === (status as string).toUpperCase()
        );
      }
      if (status || nome) {
        return (
          growdever.nome
            .toLowerCase()
            .includes((nome as string)?.toLowerCase()) ||
          growdever.status === (status as string)?.toUpperCase()
        );
      }
      return true;
    });
    return response
      .status(200)
      .json(listaFiltrado.map((growdever) => growdever.paraModelJson()));
  }

  buscarGrowdeverPorId(request: Request, response: Response) {
    const { id } = request.params;

    const growdeverFiltrado = buscarGrowdeversDB().find(
      (growdever) => growdever.id === id
    );

    return response.status(200).json(growdeverFiltrado?.paraDetalheJSON());
  }

  deletarGrowdever(request: Request, response: Response) {
    const { id } = request.params;
    const listaAtual = buscarGrowdeversDB();
    const growdeverIndex = listaAtual.findIndex(
      (growdever) => growdever.id === id
    );

    listaAtual.splice(growdeverIndex, 1);
    salvarGrowdeversDB(listaAtual);
    return response.status(204).json();
  }

  atualizarGrowdever(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, dataNascimento, status } = request.body;

    const listaAtual = buscarGrowdeversDB();

    const growdeverIndex = listaAtual.findIndex(
      (growdever) => growdever.id === id
    );

    listaAtual[growdeverIndex].atualizar(nome, dataNascimento, status);

    salvarGrowdeversDB(listaAtual);

    return response
      .status(200)
      .json(listaAtual[growdeverIndex].paraDetalheJSON());
  }
}
