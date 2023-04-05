import { Column, PrimaryColumn, Entity } from "typeorm";

@Entity({ name: "growdevers" })
export class GrowdeverEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  nome!: string;

  @Column({ name: "datanascimento" })
  dataNascimento!: Date;

  @Column()
  cpf!: string;

  @Column()
  senha!: string;

  @Column()
  status!: string;

  @Column({ name: "habilidades" })
  skills!: string;
}
