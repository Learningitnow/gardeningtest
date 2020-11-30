import React from "react";

import "./Footer.css";
import { Container } from "react-bootstrap";


export default function Footer(props) {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <div className="container-sm">
        <div className="row">
          <footer className="col-12 py-4 mt-5 text-light fixed-bottom justify-content-center text-center">
            <p>&#169; Copyright {currentYear}, Site created by The Boolean Bros using React</p>
          </footer>
        </div>
      </div>
    </Container>
  );
}

