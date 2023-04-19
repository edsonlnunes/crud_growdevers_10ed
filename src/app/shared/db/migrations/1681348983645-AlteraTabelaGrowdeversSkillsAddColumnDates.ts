import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlteraTabelaGrowdeversSkillsAddColumnDates1681348983645
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("growdever_skills", "growdevers_skills");

    await queryRunner.addColumns("growdevers_skills", [
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        isNullable: false,
      }),
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        isNullable: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("growdevers_skills", [
      "created_at",
      "updated_at",
    ]);
  }
}
