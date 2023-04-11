import { resolve } from "path";
import { DataSource } from "typeorm";
import config from "../config";
import { GrowdeverSkillEntity } from "./entities/growdever-skill.entity";
import { GrowdeverEntity } from "./entities/growdever.entity";

export const appDataSource = new DataSource({
  type: "postgres",
  url: config.databaseUrl,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [GrowdeverEntity, GrowdeverSkillEntity],
  synchronize: false,
});
