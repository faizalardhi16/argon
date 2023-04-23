import mysql from "mysql2";

const sql = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "argon_db_absence",
});

sql.connect();

export default sql;
