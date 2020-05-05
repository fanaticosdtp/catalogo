import React from "react";
import ReactGA from 'react-ga';

// reactstrap components
import {
  Container
} from "reactstrap";

import ProductCard from "./catalog-sections/ProductCard.js";
import ProductFilters from "./catalog-sections/ProductFilters.js";

import "../../assets/css/products-fanaticos.css";

function CatalogSection(props) {

  let productsToShow = props.products;
  const [teamId, setTeamId] = React.useState();
  const [teamFilter, setTeamFilter] = React.useState(false);
  const [teamName, setTeamName] = React.useState( "Filtrá por tu equipo" );

  function handleTeamClick(teamId, teamName){
    setTeamId(teamId);
    setTeamFilter(true);
    setTeamName(teamName);

    ReactGA.event({
      category: "Filters",
      action: "Filtro por",
      label: teamId + " " + teamName
     });

  }

  function handleCancelTeamFilter(){
    setTeamFilter(false);
    setTeamName("Filtrá por tu equipo");
  }

  if (teamFilter){
    productsToShow = props.products.filter((item) => item.IdEq.Id == teamId);
  }

  if(props.teams && props.teams.length > 0 ){
    return (
      <>
      <div className="section section-products text-center" id="products">
        <Container>
          <div className="page">
              <ProductFilters teamFilterText={teamName} teams = {props.teams}  handleTeamClick = {handleTeamClick} handleCancelTeamFilter = {handleCancelTeamFilter}/>
              <div className="row">
                {productsToShow.map(item => {
                  return (
                    <ProductCard key= {item.Id} product = {item} />)
                }
              )
            };
              </div>
          </div>
        </Container>
      </div>
      </>
    );
  } else {
    return (
      <>
      <div className="section section-products text-center" id="products">
        <Container>
          <div className="page">
              <div className="row">
                {productsToShow.map(item => {
                  return (
                    <ProductCard key= {item.Id} product = {item} />)
                }
              )
            };
              </div>
          </div>
        </Container>
      </div>
      </>
    );
  }


}

export default CatalogSection;
