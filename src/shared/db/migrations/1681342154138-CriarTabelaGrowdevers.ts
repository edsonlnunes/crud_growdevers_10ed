import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CriarTabelaGrowdevers1681342154138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "growdevers",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nome",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "data_nascimento",
            type: "varchar",
            length: "100",
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            length: "11",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "senha",
            type: "text",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("growdevers", true, true, true);
  }
}
