import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { buscarGrowdeversDB, salvarGrowdeversDB } from "../db/growdevers";
import { Growdever, StatusGrowdever } from "../models/growdever";
import config from "../config";
import db from "../db";

export class GrowdeverController {
  async cadastrarGrowdever(request: Request, response: Response) {
    const { nome, dataNascimento, cpf, habilidades } = request.body;

    const resultadoExiste = await db.query(
      `SELECT * FROM growdevers WHERE cpf = '${cpf}'`
    );

    if (resultadoExiste.rowCount > 0) {
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

    await db.query(
      "INSERT INTO growdevers VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        growdever.id,
        growdever.nome,
        growdever.dataNascimento,
        growdever.cpf,
        growdever.senha,
        growdever.status,
        growdever.habilidades.join(),
      ]
    );

    return response.status(201).json(growdever.paraDetalheJSON());
  }

  async buscarGrowdevers(request: Request, response: Response) {
    const { status, nome } = request.query;

    let sql = `
      SELECT 
        * 
      FROM 
        growdevers 
      WHERE
        nome ILIKE '%${nome ?? ""}%' 
      AND 
        status ILIKE '%${status ?? ""}%'
     `;

    // if (status && nome) {
    //   sql += ` WHERE status = '${status
    //     .toString()
    //     .toUpperCase()}' AND nome ILIKE '%${nome}%'`;
    // }

    // if (nome && !status) {
    //   sql += ` WHERE nome ILIKE '%${nome}%'`;
    // }

    // if (status && !nome) {
    //   sql += ` WHERE status = '${status.toString().toUpperCase()}'`;
    // }

    const resultado = await db.query(sql);

    const growdevers = resultado.rows.map((row) =>
      Growdever.criarAPartirDoBanco({
        id: row.id,
        nome: row.nome,
        cpf: row.cpf,
        dataNascimento: row.datanascimento,
        status: row.status,
        senha: row.senha,
        habilidades: row.habilidades ? row.habilidade.split() : [],
      })
    );

    return response
      .status(200)
      .json(growdevers.map((g) => g.paraDetalheJSON()));
  }

  async buscarGrowdeverPorId(request: Request, response: Response) {
    const { id } = request.params;

    const resultado = await db.query(
      `SELECT * FROM growdevers WHERE id = '${id}'`
    );

    const growdever = Growdever.criarAPartirDoBanco({
      id: resultado.rows[0].id,
      nome: resultado.rows[0].nome,
      cpf: resultado.rows[0].cpf,
      dataNascimento: resultado.rows[0].datanascimento,
      status: resultado.rows[0].status,
      senha: resultado.rows[0].senha,
      habilidades: resultado.rows[0].habilidades
        ? resultado.rows[0].habilidade.split()
        : [],
    });

    return response.status(200).json(growdever.paraDetalheJSON());
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

  async atualizarGrowdever(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, dataNascimento, status } = request.body;

    const resultado = await db.query(
      `SELECT * FROM growdevers WHERE id = '${id}'`
    );

    const growdever = Growdever.criarAPartirDoBanco({
      id: resultado.rows[0].id,
      nome: resultado.rows[0].nome,
      cpf: resultado.rows[0].cpf,
      dataNascimento: resultado.rows[0].datanascimento,
      status: resultado.rows[0].status,
      senha: resultado.rows[0].senha,
      habilidades: resultado.rows[0].habilidades
        ? resultado.rows[0].habilidade.split()
        : [],
    });

    growdever.atualizar(nome, dataNascimento, status);

    await db.query(
      `UPDATE growdevers SET nome = $1, datanascimento = $2, status = $3 WHERE id = $4`,
      [growdever.nome, growdever.dataNascimento, growdever.status, growdever.id]
    );

    return response.status(200).json(growdever.paraDetalheJSON());
  }
}
