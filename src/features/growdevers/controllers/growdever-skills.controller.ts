import { Request, Response } from "express";

// addNovaHabilidade(habilidade: string) {
//   const habilidadeJaExiste = this._habilidades.some(
//     (h) => h.toUpperCase() === habilidade.toUpperCase()
//   );

//   if (habilidadeJaExiste)
//     throw new HabilidadeJaExiste("Habilidade já existe");

//   this._habilidades.push(habilidade);
// }

export class GrowdeverSkillsController {
  addGrowdeverSkill(request: Request, response: Response) {
    // const { id } = request.params;
    // const { skill } = request.body;
    // if (!skill) {
    //   return response.status(400).json("Skill não informada!");
    // }
    // const listaGrowdevers = buscarGrowdeversDB();
    // const indexGrowdever = listaGrowdevers.findIndex(
    //   (growdever) => growdever.id === id
    // );
    // try {
    //   listaGrowdevers[indexGrowdever].addNovaHabilidade(skill);
    //   salvarGrowdeversDB(listaGrowdevers);
    //   return response
    //     .status(200)
    //     .json(listaGrowdevers[indexGrowdever].paraDetalheJSON());
    // } catch (error: any) {
    //   if (error instanceof HabilidadeJaExiste) {
    //     return response.status(400).json(error.message);
    //   }
    //   throw error;
    // }
  }
}
