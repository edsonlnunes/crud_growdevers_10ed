import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Growdever } from "../models/growdever";
import config from "../config";
import { GrowdeverRepository } from "../repositories/growdever.repository";

export class GrowdeverController {
  async cadastrarGrowdever(request: Request, response: Response) {
    const { nome, dataNascimento, cpf, habilidades } = request.body;

    const repositorio = new GrowdeverRepository();

    const growdeverJaExiste = await repositorio.existePeloCpf(cpf);

    if (growdeverJaExiste) {
      return response.status(400).json("Este cpf já está cadastrado!");
    }

    const senhaPadrao = `${cpf.slice(0, 3)}@${new Date().getFullYear()}`;

    const senhaCriptografada = await bcrypt.hash(
      senhaPadrao,
      config.bcryptSalt
    );

    const growdever = new Growdever(
      nome,
      dataNascimento,
      cpf,
      habilidades,
      senhaCriptografada
    );

    await repositorio.criaGrowdever(growdever);

    return response.status(201).json(growdever.paraDetalheJSON());
  }

  async buscarGrowdevers(request: Request, response: Response) {
    const { status, nome } = request.query as any;

    const repositorio = new GrowdeverRepository();

    const growdevers = await repositorio.listarGrowdevers(status, nome);

    return response.status(200).json(growdevers.map((g) => g.paraModelJson()));
  }

  async buscarGrowdeverPorId(request: Request, response: Response) {
    const { id } = request.params;

    const repositorio = new GrowdeverRepository();
    const growdever = await repositorio.buscarPorId(id);

    return response.status(200).json(growdever.paraDetalheJSON());
  }

  async deletarGrowdever(request: Request, response: Response) {
    const { id } = request.params;

    const repositorio = new GrowdeverRepository();
    await repositorio.removerPeloId(id);

    return response.status(204).json();
  }

  async atualizarGrowdever(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, dataNascimento, status } = request.body;

    const repositorio = new GrowdeverRepository();

    const growdever = await repositorio.buscarPorId(id);

    growdever.atualizar(nome, dataNascimento, status);

    await repositorio.atualizarGrowdever(growdever);

    return response.status(200).json(growdever.paraDetalheJSON());
  }
}
