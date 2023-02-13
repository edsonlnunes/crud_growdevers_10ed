import { randomUUID } from "node:crypto";

export interface GrowdeverDetalheDTO {
  id: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  status: StatusGrowdever;
  habilidades: Array<string>;
}

// DTO = DATA TRANSFER OBJECT
interface GrowdeverModelDTO {
  id: string;
  nome: string;
  status: StatusGrowdever;
  habilidades: Array<string>;
}

export enum StatusGrowdever {
  CANCELADO = "CANCELADO",
  ESTUDANDO = "ESTUDANDO",
  FORMADO = "FORMADO",
}

export class Growdever {
  private _id: string;

  public get id() {
    return this._id;
  }

  private _nome: string;

  public get nome() {
    return this._nome;
  }

  private _dataNascimento: string;

  public get dataNascimento() {
    return this._dataNascimento;
  }

  private _cpf: string;

  public get cpf() {
    return this._cpf;
  }

  private _status: StatusGrowdever;

  public get status() {
    return this._status;
  }

  private _habilidades: Array<string>;

  public get habilidades() {
    return this._habilidades;
  }

  constructor(
    nome: string,
    dataNascimento: string,
    cpf: string,
    habilidades: Array<string>
  ) {
    this._id = randomUUID();
    this._nome = nome;
    this._dataNascimento = dataNascimento;
    this._cpf = cpf;
    this._status = StatusGrowdever.ESTUDANDO;
    this._habilidades = habilidades;
  }

  static criarAPartirDoBanco(growdeverDTO: GrowdeverDetalheDTO) {
    const growdever = new Growdever(
      growdeverDTO.nome,
      growdeverDTO.dataNascimento,
      growdeverDTO.cpf,
      growdeverDTO.habilidades
    );

    growdever._id = growdeverDTO.id;
    growdever._status = growdeverDTO.status;

    return growdever;
  }

  atualizar(nome: string, dataNascimento: string, status: StatusGrowdever) {
    if (nome) this._nome = nome;

    if (dataNascimento) this._dataNascimento = dataNascimento;

    if (status) this._status = status;
  }

  paraDetalheJSON(): GrowdeverDetalheDTO {
    return {
      id: this._id,
      nome: this._nome,
      dataNascimento: this._dataNascimento,
      cpf: this._cpf,
      status: this._status,
      habilidades: this._habilidades,
    };
  }

  paraModelJson(): GrowdeverModelDTO {
    return {
      id: this._id,
      nome: this._nome,
      status: this._status,
      habilidades: this._habilidades,
    };
  }
}
