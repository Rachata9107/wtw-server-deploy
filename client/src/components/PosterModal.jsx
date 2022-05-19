import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Col, Row, Modal, Card } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Preloading from "./Preloading";
// import dataTest from "../asset/test.json";

function PosterModal(props) {
  const [movieDetails, setMovieDetails] = useState();
  const [fetchFinish, setFetchFinish] = useState(false);

  const fetchData = () => {
    axios
      .get(`/api/detail?idTitle=${props.id}`)
      .then(({ data }) => setMovieDetails(data))
      .then(() => setFetchFinish(true));
  };

  useEffect(() => {
    setTimeout(() => fetchData(), 100);
  }, []);

  return (
    <Modal
      {...props}
      style={{ padding: "1rem" }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <AnimatePresence exitBeforeEnter>
        {fetchFinish ? (
          movieDetails.title !== undefined && movieDetails.title !== null ? (
            <motion.div
              key="poster-modal"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {movieDetails.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col lg={4} className="p-0" align="center">
                      <img
                        className="poster-modal-img"
                        rel="preload"
                        src={
                          movieDetails.image !== undefined &&
                          movieDetails.image !== null
                            ? movieDetails.image.split("_").slice(0, 1)[0] +
                              "UX215.jpg"
                            : ""
                        }
                      />
                    </Col>
                    <Col lg={8}>
                      <Card.Body className="poster-modal-body">
                        <div className="poster-modal-title">
                          <Card.Title>{movieDetails.fullTitle}</Card.Title>
                          <Card.Text>
                            <img
                              rel="preload"
                              src="https://img.icons8.com/fluency-systems-regular/24/000000/clock--v3.png"
                            />
                            {movieDetails.runtimeStr}
                          </Card.Text>
                          <Card.Text>
                            <img
                              rel="preload"
                              src="https://img.icons8.com/ios-glyphs/24/000000/user-male-circle.png"
                            />
                            {movieDetails.stars}
                          </Card.Text>
                          <Card.Text>
                            <img
                              rel="preload"
                              src="https://img.icons8.com/ios-glyphs/24/000000/rating.png"
                            />
                            IMDb Rating{" "}
                            {movieDetails.imDbRating > 0
                              ? movieDetails.imDbRating
                              : "-"}
                          </Card.Text>
                          <Card.Text>
                            <img
                              rel="preload"
                              src="https://img.icons8.com/fluency-systems-regular/24/000000/category.png"
                            />
                            {movieDetails.genres}
                          </Card.Text>
                        </div>
                        <div className="poster-modal-plot">
                          {movieDetails.plot}
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
            </motion.div>
          ) : (
            <motion.div
              key="not-fund"
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Information Not Found {movieDetails.errorMessage}
                </Modal.Title>
              </Modal.Header>
            </motion.div>
          )
        ) : (
          <div className="poster-modal-preloading">
            <Preloading />
          </div>
        )}
      </AnimatePresence>
    </Modal>
  );
}

PosterModal.propTypes = {
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default PosterModal;
