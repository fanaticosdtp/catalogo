import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function ErrorPage() {
  return (
    <>
      <div className="section">
        <Container>
          <h1 className="title">Ups!</h1>
          <div id="typography">
            <Row>
              <Col md="12">
                <div className="typography-line">
                  <blockquote>
                    <p className="blockquote blockquote-primary">
                      <small>Ocurrió un error y estamos trabajando para solucionarlo. Por favor, reintentá en unos minutos</small>
                    </p>
                  </blockquote>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ErrorPage;
