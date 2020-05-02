/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Theme designed by{" "}
          <a
            href="https://www.invisionapp.com?ref=nukr-dark-footer"
            target="_blank"
          >
            Invision
          </a>
          . Coded by{" "}
          <a
            href="https://www.creative-tim.com?ref=nukr-dark-footer"
            target="_blank"
          >
            Creative Tim
          </a>
          . Fanáticos module by{" "}
          <a
            href="https://www.linkedin.com/in/nicolas-maximiliano-buffa-1aa788143/"
            target="_blank"
          >
            Nicolás Buffa
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
