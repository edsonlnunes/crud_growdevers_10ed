import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default {
  query: async (sql: string, params?: any[]) => {
    const cliente = await pool.connect();
    const resultado = await cliente.query(sql, params);
    cliente.release();
    return resultado;
  },
};
