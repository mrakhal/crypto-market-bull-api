const mysql = require("mysql");
const util = require("util");

const db = mysql.createPool({
  host: "localhost",
  user: "mrakhalf",
  password: "q1r58sv4123",
  database: "dbcrypto",
  port: 3306,
  multipleStatements: true,
});

const dbQuery = util.promisify(db.query).bind(db);

module.exports = { db, dbQuery };
