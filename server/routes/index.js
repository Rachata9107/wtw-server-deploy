const express = require("express");
const router = express.Router();
const db = require("./libs/dbconfig");

const axios = require("axios");

router.get("/popular", function (req, res, next) {
  const sql = "SELECT * FROM t_popular_movies ORDER BY rank ASC ;";
  db.query(sql).then(([row]) => {
    res.send(row);
  });
});

router.get("/detail", async (req, res) => {
  const { idTitle } = req.query;
  const sql = `SELECT * FROM t_movies WHERE id = '${idTitle}'`;
  const [row] = await db.query(sql);
  if (row.length > 0) {
    res.send(...row);
  } else {
    const url = `https://imdb-api.com/en/API/Title/k_07dyrfoh/${idTitle}/Ratings,`;
    const { data } = await axios.get(url);
    const sqlInsert = `INSERT INTO t_movies (id, title, image, fullTitle, runtimeStr, stars, imDbRating, genres, plot, errorMessage, datetime) VALUES ('${
      data.id
    }', '${data.title.replace(/'/g, "''")}', '${
      data.image
    }', '${data.fullTitle.replace(/'/g, "''")}', '${data.runtimeStr}', '${
      data.stars
    }', '${data.imDbRating}', '${data.genres}', '${data.plot.replace(
      /'/g,
      "''"
    )}', '${data.errorMessage}', NOW());`;
    await db.query(sqlInsert);
    res.send(data);
  }
});

module.exports = router;
