import { Column, PrimaryColumn, Entity, OneToMany } from "typeorm";
import { StatusGrowdever } from "../../../features/growdevers/enums";
import { GrowdeverSkillEntity } from "./growdever-skill.entity";

@Entity({ name: "growdevers" })
export class GrowdeverEntity {
  @PrimaryColumn({ type: "uuid", nullable: false })
  id!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  nome!: string;

  @Column({ name: "data_nascimento", type: "date", nullable: false })
  dataNascimento!: Date;

  @Column({ type: "varchar", length: 11, nullable: false, unique: true })
  cpf!: string;

  @Column({ type: "text", nullable: false })
  senha!: string;

  @Column({ type: "enum", enum: StatusGrowdever, nullable: false })
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
