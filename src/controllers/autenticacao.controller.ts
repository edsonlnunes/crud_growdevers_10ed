import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { buscarGrowdeversDB } from "../db/growdevers";

export class AutenticacaoController {
  async entrar(request: Request, response: Response) {
    const { cpf, senha } = request.body;

    const growdevers = buscarGrowdeversDB();

    const growdever = growdevers.find((growd) => growd.cpf === cpf);

    if (!growdever) {
      return response.status(401).json("CPF ou senha inválidos");
    }

    const senhaCerta = await bcrypt.compare(senha, growdever.senha);

    if (!senhaCerta) {
      return response.status(401).json("CPF ou senha inválidos");
    }

    const token = jwt.sign(
      { id: growdever.id, cpf: growdever.cpf },
      "growFullStack10ed",
      { expiresIn: "1h" }
    );

    return response
      .status(200)
      .json({ token, growdever: growdever.paraDetalheJSON() });
  }
}
