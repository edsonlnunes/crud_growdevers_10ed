import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarTabelaGrowdeversSkills1681347714364
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "growdever_skills",
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
            name: "growdever_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["growdever_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "growdevers",
            name: "fk_growdevers_skills_growdevers",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("growdevers_skills", true, true, true);
  }
}
