import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntidadeBase, GrowdeverEntity } from ".";

@Entity({ name: "growdevers_skills" })
export class GrowdeverSkillEntity extends EntidadeBase {
  @Column()
  nome!: string;

  @Column({ name: "growdever_id" })
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
