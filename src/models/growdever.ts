import { randomUUID } from "node:crypto";
import { GrowdeverEntity } from "../db/entities/growdever.entity";
import { HabilidadeJaExiste } from "../errors/habilidade-ja-existe.error";

export interface GrowdeverDetalheDTO {
  id: string;
  nome: string;
  dataNascimento: Date;
  cpf: string;
  status: StatusGrowdever;
  habilidades: Array<string>;
  senha?: string;
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

  private _dataNascimento: Date;

  public get dataNascimento() {
    return this._dataNascimento;
  }

  private _cpf: string;

  public get cpf() {
    return this._cpf;
  }

  private _senha: string;

  public get senha(): string {
    return this._senha;
  }

  private _status: StatusGrowdever;

  public get status() {
    return this._status;
  }

  private _habilidades!: Array<string>;

  public get habilidades() {
    return [...this._habilidades];
  }

  constructor(
    nome: string,
    dataNascimento: Date,
    cpf: string,
    // habilidades: Array<string>,
    senha: string
  ) {
    this._id = randomUUID();
    this._nome = nome;
    this._dataNascimento = dataNascimento;
    this._cpf = cpf;
    this._status = StatusGrowdever.ESTUDANDO;
    this._habilidades = [];
    this._senha = senha;
  }

  static criarAPartirDoBanco(entity: GrowdeverEntity) {
    const growdever = new Growdever(
      entity.nome,
      entity.dataNascimento,
      entity.cpf,
      // entity.skills.split(","),
      entity.senha
    );

    growdever._id = entity.id;
    growdever._status = entity.status as any;

    return growdever;
  }

  atualizar(nome: string, dataNascimento: Date, status: StatusGrowdever) {
    if (nome) this._nome = nome;

    if (dataNascimento) this._dataNascimento = dataNascimento;

    if (status) this._status = status;
  }

  addNovaHabilidade(habilidade: string) {
    const habilidadeJaExiste = this._habilidades.some(
      (h) => h.toUpperCase() === habilidade.toUpperCase()
    );

    if (habilidadeJaExiste)
      throw new HabilidadeJaExiste("Habilidade já existe");

    this._habilidades.push(habilidade);
  }

  paraDetalheJSON(incluirSenha: boolean = false): GrowdeverDetalheDTO {
    return {
      id: this._id,
      nome: this._nome,
      dataNascimento: this._dataNascimento,
      cpf: this._cpf,
      status: this._status,
      habilidades: this._habilidades,
      senha: incluirSenha ? this._senha : undefined,
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
