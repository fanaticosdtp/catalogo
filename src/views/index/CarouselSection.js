import React from "react";
import { Link } from "react-router-dom";
import ReactGA from 'react-ga';

// reactstrap components
import {
  Container,
  Badge,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators
} from "reactstrap";

function CarouselSection(props) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);

  const categoriesToShow = props.categories.filter(category => category.Mostrar === "S");
  categoriesToShow.sort(function(a, b){return a.Orden-b.Orden})

  function sendMetrics(e){

    ReactGA.event({
      category: "Categories",
      action: "Visito desde Carrousel",
      label: e.target.parentElement.id
     });

  }

  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === categoriesToShow.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? categoriesToShow.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
      <div className="section" id="carousel">
        <Container>
          <Row className="justify-content-center">
            <Col lg="9" md="12">
              <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators
                  items={categoriesToShow}
                  activeIndex={activeIndex}
                  onClickHandler={goToIndex}
                />
                {categoriesToShow.map(item => {

                  let linkId;

                  try{
                    item.show = require('../../assets/img/categories/' + item.FotoArriba);
                  } catch(e) {
                    console.log(e);
                    item.show = require('../../assets/img/no-disp.jpg');
                  }
                  if (item.IdTipo){
                    linkId = item.Id + " " + item.Nombre + " " + item.IdTipo.Nombre;
                  } else {
                    linkId = item.Id + " " + item.Nombre;
                  }
                    item.linkTo = "/catalog/" + item.Id;
                    return (
                      <CarouselItem
                        onExiting={onExiting}
                        onExited={onExited}
                        key= {item.Id}
                      >
                        <Link to={item.linkTo}
                          onClick={sendMetrics}
                          id={linkId}>
                          <img id= {item.Id}
                            className="carrousel-image-f"
                            src={item.show}
                            alt={item.Nombre}/>
                          </Link>
                        <div className="carousel-caption d-none d-md-block badge-carousel-caption">
                          <Badge color="info" className="mr-1 carrousel-badge">
                            {item.Nombre} {item.IdTipo.Nombre}
                          </Badge>
                        </div>
                      </CarouselItem>
                    );
                })}
                <a
                  className="carousel-control-prev"
                  data-slide="prev"
                  href="#nico"
                  onClick={e => {
                    e.preventDefault();
                    previous();
                  }}
                  role="button"
                >
                  <Badge color="info" className="mr-1">
                    <i className="now-ui-icons arrows-1_minimal-left"></i>
                  </Badge>
                </a>
                  <a
                    className="carousel-control-next"
                    data-slide="next"
                    href="#nico"
                    onClick={e => {
                      e.preventDefault();
                      next();
                    }}
                    role="button"
                  >
                    <Badge color="info" className="mr-1">
                      <i className="now-ui-icons arrows-1_minimal-right"></i>
                    </Badge>
                  </a>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CarouselSection;
