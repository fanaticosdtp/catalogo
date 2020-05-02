import React from "react";
// reactstrap components
import {
  Button,
  Container,
  Modal,
  ModalBody
} from "reactstrap";

// core components

function ProductFilters(props) {

  const [modal, setModal] = React.useState(false);
  const handleTeamClick = props.handleTeamClick;
  const handleCancelTeamFilter = props.handleCancelTeamFilter;
  const teams = props.teams;
  const teamFilterText = props.teamFilterText;

    return (
      <>
        <div className="section-filters" id="filters">
          <Container>
            <Button id="teams-filter" color="info" onClick={() => setModal(true)}>
              <i className="now-ui-icons design_bullet-list-67"></i> {teamFilterText}
            </Button>
            <Modal
              modalClassName="modal-mini modal-info"
              id="modal-dialog"
              toggle={() => setModal(false)}
              isOpen={modal}
            >
              <ModalBody>
                {teams.map(item => {
                  return (
                      <Button color="info" key={item.Id} id ={item.Id}
                       onClick={(e) =>{
                         setModal(false);
                         handleTeamClick(e.target.id, e.target.innerText);
                       }}>
                        {item.Nombre}
                       </Button>
                  )
                })}
                <Button color="info" key="9999999"
                 onClick={(e) =>{
                   setModal(false);
                   handleTeamClick(undefined, e.target.innerText);
                 }}>
                  Otros
                 </Button>
              </ModalBody>
              <div className="modal-footer">
                <Button
                  className="btn-neutral"
                  color="link"
                  type="button"
                  onClick={() => setModal(false)}
                >
                  Cerrar
                </Button>
                <Button
                  color="danger"
                  type="button"
                  onClick={(e) =>{
                    setModal(false);
                    handleCancelTeamFilter();}}
                >
                  Cancelar filtro
                </Button>
              </div>
            </Modal>
          </Container>
        </div>
      </>
    );
  }

export default ProductFilters;
