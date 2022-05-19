import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { Offcanvas } from "react-bootstrap";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import SearchPoster from "./SearchPoster";
import Preloading from "./Preloading";

function SearchResult(props) {

  const [searchResult, setSearchResult] = useState();
  const [fetchFinish, setFetchFinish] = useState(false);

  const handleFetch = () => {
    axios
      .get(`https://imdb-api.com/en/API/SearchMovie/k_07dyrfoh/${props.movietitle}`)
      .then(({ data }) => {
        data.results !== null && !data.errorMessage ?
          setSearchResult(data.results.filter((e) => !e.image.includes("nopicture")))
          :
          setSearchResult(data);
      })
      .then(() => setFetchFinish(true));
  };

  useEffect(() => {
    setTimeout(() => handleFetch(), 100);
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <Offcanvas
        style={{ height: "max-content", backgroundColor: "#212529" }}
        {...props}
      >
        {fetchFinish ? (
          !searchResult.errorMessage ? (
            <>
              <Offcanvas.Header className="p-2" closeButton>
                <Offcanvas.Title style={{ color: "#EEEEEE" }}>
                  Results for "{props.movietitle}"
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="offcanvas-card-main">
                <div className="search-card-overflow">
                  {searchResult.map((e, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 20 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.15 }}
                    >
                      <SearchPoster key={i} {...e} />
                    </motion.div>
                  ))}
                </div>
              </Offcanvas.Body>
            </>
          ) : (
            <motion.div
              key='error'
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
            >
              <Offcanvas.Header className="p-2" closeButton>
                <Offcanvas.Title style={{ color: "#EEEEEE" }}>
                  {searchResult.errorMessage}
                </Offcanvas.Title>
              </Offcanvas.Header>
            </motion.div>
          )
        ) : (
          <div className="poster-modal-preloading">
            <Preloading />
          </div>
        )}
      </Offcanvas>
    </AnimatePresence>
  );
}

SearchResult.propTypes = {
  movietitle: PropTypes.string.isRequired,
  placement: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
}

export default SearchResult;
