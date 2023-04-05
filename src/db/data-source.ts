import { DataSource } from "typeorm";
import config from "../config";
import { GrowdeverEntity } from "./entities/growdever.entity";

export const appDataSource = new DataSource({
  type: "postgres",
  url: config.databaseUrl,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [GrowdeverEntity],
});
