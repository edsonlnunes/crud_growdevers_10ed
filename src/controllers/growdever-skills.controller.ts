import { Request, Response } from "express";
import { buscarGrowdeversDB, salvarGrowdeversDB } from "../db/growdevers";
import { HabilidadeJaExiste } from "../errors/habilidade-ja-existe.error";

export class GrowdeverSkillsController {
  addGrowdeverSkill(request: Request, response: Response) {
    const { id } = request.params;
    const { skill } = request.body;

    if (!skill) {
      return response.status(400).json("Skill não informada!");
    }

    const listaGrowdevers = buscarGrowdeversDB();

    const indexGrowdever = listaGrowdevers.findIndex(
      (growdever) => growdever.id === id
    );

    try {
      listaGrowdevers[indexGrowdever].addNovaHabilidade(skill);

      salvarGrowdeversDB(listaGrowdevers);

      return response
        .status(200)
        .json(listaGrowdevers[indexGrowdever].paraDetalheJSON());
    } catch (error: any) {
      if (error instanceof HabilidadeJaExiste) {
        return response.status(400).json(error.message);
      }

      throw error;
    }
  }
}
