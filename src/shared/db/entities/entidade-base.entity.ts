import { randomUUID } from "crypto";
import { BeforeInsert, BeforeUpdate, Column, PrimaryColumn } from "typeorm";

export class EntidadeBase {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @BeforeInsert()
  antesDeSalvar() {
    // INSERT
    this.id = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  antesDeAtualizar() {
    // UPDATE
    this.updatedAt = new Date();
  }
}
