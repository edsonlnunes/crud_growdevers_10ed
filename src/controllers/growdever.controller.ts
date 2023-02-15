import { Request, Response } from "express";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { buscarGrowdeversDB, salvarGrowdeversDB } from "../db/growdevers";
import { Growdever, StatusGrowdever } from "../models/growdever";

export class GrowdeverController {
  cadastrarGrowdever(request: Request, response: Response) {
    const { nome, dataNascimento, cpf, habilidades } = request.body;

    const listaAtual = buscarGrowdeversDB();

    if (listaAtual.some((growdever) => growdever.cpf === cpf)) {
      return response.status(400).json("Este cpf já está cadastrado!");
    }

    const growdever = new Growdever(nome, dataNascimento, cpf, habilidades);

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
    if (!growdeverFiltrado) {
      return response
        .status(404)
        .json("Growdever não encontrado. Verifique o ID e tente novamente");
    }
    return response.status(200).json(growdeverFiltrado.paraDetalheJSON());
  }

  deletarGrowdever(request: Request, response: Response) {
    const { id } = request.params;
    const listaAtual = buscarGrowdeversDB();
    const growdeverIndex = listaAtual.findIndex(
      (growdever) => growdever.id === id
    );
    if (growdeverIndex === -1) {
      return response
        .status(404)
        .json("Growdever não localizado, verifique o ID e tente novamente.");
    }
    listaAtual.splice(growdeverIndex, 1);
    salvarGrowdeversDB(listaAtual);
    return response.status(204).json();
  }

  atualizarGrowdever(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, dataNascimento, status } = request.body;
    if (status) {
      if (
        !Object.values(StatusGrowdever).some((s) => s === status.toUpperCase())
      ) {
        return response.status(400).json("O Status informado é inválido");
      }
    }
    const listaAtual = buscarGrowdeversDB();
    const growdeverIndex = listaAtual.findIndex(
      (growdever) => growdever.id === id
    );
    if (growdeverIndex === -1) {
      return response
        .status(404)
        .json("Growdever não localizado, verifique o ID e tente novamente.");
    }
    listaAtual[growdeverIndex].atualizar(
      nome,
      dataNascimento,
      status?.toUpperCase()
    );
    salvarGrowdeversDB(listaAtual);
    return response
      .status(200)
      .json(listaAtual[growdeverIndex].paraDetalheJSON());
  }
}
