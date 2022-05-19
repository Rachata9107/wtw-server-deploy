import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

import Ratings from "./Ratings";
import PosterModal from "./PosterModal";

function Poster(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="poster-card">
        <Card.Body className="poster-card-body">
          <img
            className="poster-img"
            rel="preload"
            src={props.image.split("_").slice(0, 1)[0] + "UX215.jpg"}
          />
          <Card.Title className="m-0" style={{ fontSize: "17px" }}>
            {props.title}
          </Card.Title>
          <Ratings rate={Number(props.imDbRating)} />
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => setModalShow(true)}
          >
            more
          </Button>
        </Card.Body>
      </div>
      {modalShow ? (
        <PosterModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={props.idTitle}
        />
      ) : (
        <></>
      )}
    </>
  );
}

Poster.propTypes = {
  idTitle: PropTypes.string.isRequired,
  title: PropTypes.string,
  image: PropTypes.string.isRequired,
  imDbRating: PropTypes.string,
};

export default Poster;
