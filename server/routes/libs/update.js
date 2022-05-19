const axios = require("axios");
const db = require("./dbconfig");

module.exports = (timer = 60 * 1000) => {
  setInterval(async () => {
    const now = new Date().toISOString().slice(11, 16);
    if ("08:00".includes(now)) {
      const url = "https://imdb-api.com/en/API/MostPopularMovies/k_07dyrfoh";
      const {
        data: { items },
      } = await axios.get(url);
      const sqlValues = items
        .map(
          (item) =>
            `('${item.id}','${item.rank}','${
              item.rankUpDown
            }','${item.title.replace(/'/g, "''")}','${item.fullTitle.replace(
              /'/g,
              "''"
            )}','${item.year}','${item.image}','${item.crew.replace(
              /'/g,
              "''"
            )}','${item.imDbRating}','${item.imDbRatingCount}')`
        )
        .join(",");
      const sqlTruncate = "TRUNCATE TABLE t_popular_movies;";
      const sql = `INSERT INTO t_popular_movies (idTitle,rank,rankUpDown,title,fullTitle,year,image,crew,imDbRating,imDbRatingCount) VALUES ${sqlValues} ;`;
      await db.query(sqlTruncate);
      await db.query(sql);
    }
  }, timer);
};
