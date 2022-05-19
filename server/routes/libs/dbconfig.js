const mysql = require("mysql2");
const config = {
  host: "rct-dev.com",
  user: "rctdev_zen",
  password: "zen@9107",
  port: 3306,
  database: "wtw",
};

const db = mysql.createPool(config).promise();

module.exports = db;
