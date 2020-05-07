import React from "react";

// reactstrap components
import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

import { Link } from "react-router-dom";

function IndexNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top"} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <Link to="/index" className="navbar-brand" id="navbar-brand">
                Fanaticos
            </Link>
            <UncontrolledTooltip target="#navbar-brand">
              De tu pasión
            </UncontrolledTooltip>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink
                  href="#nico"
                  className="category-button"
                  id="categories-button"
                  onClick={e => {
                    e.preventDefault();
                    document
                      .getElementById("categories")
                      .scrollIntoView();
                    if(collapseOpen){
                      document.documentElement.classList.toggle("nav-open");
                      setCollapseOpen(false);
                    }
                    document
                      .getElementById("categories-button")
                      .className = "category-button nav-link normal";
                  }}
                >
                  <i className="now-ui-icons sport_trophy mr-1"></i>
                  <p>Categorías</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.facebook.com/fanaticosdetupasion"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/fanaticosdtp"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="tel:3515557925"
                  target="_blank"
                  id="phone-tooltip"
                >
                  <i className="fas fa-phone-square"></i>
                  <p className="d-lg-none d-xl-none">Teléfono</p>
                </NavLink>
                <UncontrolledTooltip target="#phone-tooltip">
                  3515557925
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
