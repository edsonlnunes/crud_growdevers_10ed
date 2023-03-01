import { Growdever, GrowdeverDetalheDTO } from "../models/growdever";
import fs from "node:fs";

// export const listaGrowdevers: Array<Growdever> = [];

const caminho = `${__dirname}\\db.json`;

export function buscarGrowdeversDB(): Array<Growdever> {
  const conteudoBuffer = fs.readFileSync(caminho);

  const listaGrowdeversEmJSON = JSON.parse(
    conteudoBuffer.toString()
  ) as Array<GrowdeverDetalheDTO>;

  return listaGrowdeversEmJSON.map((growdeverJson) =>
    Growdever.criarAPartirDoBanco(growdeverJson)
  );
}

export function salvarGrowdeversDB(lista: Array<Growdever>) {
  fs.writeFileSync(
    caminho,
    JSON.stringify(lista.map((growdever) => growdever.paraDetalheJSON(true)))
  );
}
