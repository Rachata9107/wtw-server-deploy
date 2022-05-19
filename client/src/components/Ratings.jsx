import React from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Ratings({ rate }) {
  return (
    <OverlayTrigger overlay={<Tooltip>{rate}</Tooltip>} placement="right">
      <div style={{ display: "flex", justifyContent: "center" }}>
        {[0, 3, 5, 7, 9].map((e, i) => (
          <span
            key={i}
            className="fa fa-star"
            style={rate > e ? { color: "orange" } : { color: "dark" }}
          ></span>
        ))}
      </div>
    </OverlayTrigger>
  );
}

Ratings.propTypes = {
  rate: PropTypes.number,
};

export default Ratings;
