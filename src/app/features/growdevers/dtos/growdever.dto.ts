import { StatusGrowdever } from "../enums";
import { HabilidadeDetalheDTO } from "./habilidades.dto";

export interface GrowdeverDetalheDTO {
  id: string;
  nome: string;
  dataNascimento: Date;
  cpf: string;
  status: StatusGrowdever;
  habilidades: Array<HabilidadeDetalheDTO>;
}

export interface GrowdeverListaDTO {
  id: string;
  nome: string;
  status: StatusGrowdever;
  habilidades: Array<HabilidadeDetalheDTO>;
}

export interface AtualizarGrowdeverDTO {
  id: string;
  nome?: string;
  dataNascimento?: Date;
  status?: StatusGrowdever;
}

export type CriarGrowdeverDTO = Omit<
  GrowdeverDetalheDTO,
  "habilidades" | "id"
> & {
  habilidades: string[];
  senha: string;
};
