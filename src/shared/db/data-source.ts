import { DataSource } from "typeorm";
import config from "../config";
import migrations from "./migrations";
import entities from "./entities";

export const appDataSource = new DataSource({
  type: "postgres",
  url: config.databaseUrl,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities,
  migrations,
  synchronize: false,
});
