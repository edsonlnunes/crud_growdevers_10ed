import { Column, Entity, OneToMany } from "typeorm";
import { StatusGrowdever } from "../../../features/growdevers/enums";
import { EntidadeBase, GrowdeverSkillEntity } from ".";

@Entity({ name: "growdevers" })
export class GrowdeverEntity extends EntidadeBase {
  @Column()
  nome!: string;

  @Column({ name: "data_nascimento" })
  dataNascimento!: Date;

  @Column()
  cpf!: string;

  @Column()
  senha!: string;

  @Column({ type: "enum", enum: StatusGrowdever })
  status!: StatusGrowdever;

  @OneToMany(() => GrowdeverSkillEntity, (entity) => entity.growdever)
  habilidadesDoGrowdever?: GrowdeverSkillEntity[];
}

// UM growdever possui MUITAS skills
// Muitas skills pertencem a UM growdever

//  {
//   id: "ID_GROW_1"
//   nome: "Edson"
//   dataNascimento: "2020-11-31"
//   cpf: "1231231231"
//   senha: "12312321"
//   status: "CANCELADO"
//   skill: [
//     {
//       id: "ID_SKILLS_1"
//       nome: "js"
//       growdeverId: "ID_GROW_1"
//     },
//     {
//       id: "ID_SKILLS_2"
//       nome: "ts"
//       growdeverId: "ID_GROW_1"
//     },
//     {
//       id: "ID_SKILLS_3"
//       nome: "nodejs"
//       growdeverId: "ID_GROW_1"
//     },
//   ];
//  }
