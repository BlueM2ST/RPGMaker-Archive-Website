import mariadb from "mariadb"
import dotenv from "dotenv"

dotenv.config();

const dbPool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

// get db connection from pool
async function fetchConn() {
    let conn = await dbPool.getConnection();
    // console.log("Total connections: ", dbPool.totalConnections());
    // console.log("Active connections: ", dbPool.activeConnections());
    // console.log("Idle connections: ", dbPool.idleConnections());
    return conn;
}

// query database
export async function queryDatabase(query="") {
    let conn;
    let result;
    try {
        conn = await fetchConn();
        if (!query){
            result = await conn.query(`SELECT * FROM game`);
        } else{
            result = await conn.query(`SELECT * FROM game WHERE TITLE LIKE ?`, ["%"+query+"%"]);
        }
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
        return result
    }
}