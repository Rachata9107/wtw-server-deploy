import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import Poster from "./Poster";
import Preloading from "./Preloading";

function Contents() {
  const [moviesInfo, setMoviesInfo] = useState([]);
  const [fetchData, setFetchData] = useState(7);
  const [hasMore, setHasMors] = useState(true);

  const fetchMore = () => {
    setTimeout(() => {
      if (moviesInfo.length <= fetchData) setHasMors(false);
      setFetchData(fetchData + 8);
    }, 2000);
  };

  const getMovieInfo = () => {
    axios.get("/api/popular").then(({ data }) => setMoviesInfo(data));
  };

  useEffect(() => {
    setTimeout(() => getMovieInfo(), 100);
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <InfiniteScroll
        dataLength={fetchData}
        next={fetchMore}
        hasMore={hasMore}
        loader={<Preloading />}
        style={{ overflow: "unset" }}
      >
        <div className="content-main">
          {moviesInfo
            .filter((e, i) => i <= fetchData)
            .map((e, i) => (
              <motion.div
                key={i}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
              >
                <Poster key={i} {...e} image={e.image} />
              </motion.div>
            ))}
        </div>
      </InfiniteScroll>
    </AnimatePresence>
  );
}

export default Contents;
