import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { GrowdeverEntity } from "./growdever.entity";

@Entity({ name: "growdevers_skills" })
export class GrowdeverSkillEntity {
  @PrimaryColumn({ type: "uuid", nullable: false })
  id!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  nome!: string;

  @Column({ name: "growdever_id", type: "uuid", nullable: false })
  growdeverId!: string;

  @ManyToOne(() => GrowdeverEntity, (entity) => entity.habilidadesDoGrowdever)
  @JoinColumn({ name: "growdever_id", referencedColumnName: "id" })
  growdever?: GrowdeverEntity;
}

/**
 * JS,
 * TS,
 * NodeJS
 */
