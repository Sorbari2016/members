import pg from "pg";
import getDbConfig from "./config.js";

const { Pool } = pg;

const pgConfig = getDbConfig();

// configure database
export default new Pool(pgConfig);
