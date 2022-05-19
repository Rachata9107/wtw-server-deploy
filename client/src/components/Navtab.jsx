import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import SearchResult from "./SearchResult";

const wtwLogo =
  "https://img.icons8.com/external-lineal-color-zulfa-mahendra/32/000000/external-movie-halloween-activities-lineal-color-zulfa-mahendra.png";
const githubLogo = "https://img.icons8.com/ios-filled/28/000000/github.png";
const githubLink = "https://github.com/Rachata9107";

function Navtab() {
  const [searchName, setSearchName] = useState({ movietitle: " " });
  const [modalShow, setModalShow] = useState(false);

  const handleChange = (event) => {
    setSearchName({ movietitle: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalShow(true);
  };

  return (
    <>
      <Navbar className="p-1" bg="dark" variant="dark" sticky="top">
        <Container fluid className="px-0">
          <Navbar.Brand className="nav-brand" align="center">
            <img src={wtwLogo} />
            <p>What to Watch</p>
          </Navbar.Brand>
          <div className="nav-end">
            <Form className="d-flex p-1" size="sm" onSubmit={handleSubmit}>
              <FormControl
                onChange={handleChange}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                size="sm"
              />
              <Button variant="light" type="submit" value="Submit">
                Search
              </Button>
            </Form>
            <Nav.Link
              className="navbar-github"
              target="_blank"
              href={githubLink}
            >
              <img src={githubLogo} />
            </Nav.Link>
          </div>
        </Container>
      </Navbar>
      {modalShow ? (
        <SearchResult
          movietitle={searchName.movietitle}
          placement="top"
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Navtab;
