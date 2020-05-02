import React from "react";
import { Link } from "react-router-dom";
import ReactGA from 'react-ga';

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

function CategoriesSection(props) {

  function sendMetrics(e){

    ReactGA.event({
      category: "Categories",
      action: "Visito desde Categorias",
      label: e.target.parentElement.id
     });

  }

  props.categories.sort((a,b) => (a.Nombre + a.Tipo > b.Nombre + b.Tipo) ? 1 : ((b.Nombre + b.Tipo > a.Nombre + a.Tipo) ? -1 : 0));

  return (
    <>
    <div className="section section-categories text-center" id="categories">
      <Container>
        <div className="tab-content text-center categories-title">
            <h2><strong>Categorías</strong></h2>
        </div>
        <div className="team">
          <Row className="justify-content-center">
            {props.categories.map(item => {

              let linkId;

              try{
                item.show = require('../../assets/img/categories/' + item.FotoAbajo);
              } catch(e) {
                item.show = require('../../assets/img/no-disp.jpg');
              }
              if (item.IdTipo){
                linkId = item.Id + " " + item.Nombre + " " + item.IdTipo.Nombre;
              } else {
                linkId = item.Id + " " + item.Nombre;
              }
                item.linkTo = "/catalog/" + item.Id;
              return (
                <Col xs="6" sm="6" md="3"
                  key= {item.Id}>
                  <div className="team-player" id={item.Id}>
                    <Link to={item.linkTo}
                      onClick={sendMetrics}
                      id= {linkId}>
                      <img
                        id="category-image-f"
                        alt="..."
                        className="rounded-circle img-fluid img-raised"
                        src= {item.show}></img>
                    </Link>
                    <p className="category text-info">{item.Nombre} {item.IdTipo.Nombre}</p>
                  </div>
                </Col>)
              }
            )
          };
          </Row>
        </div>
      </Container>
    </div>
    </>
  );
}

export default CategoriesSection;
