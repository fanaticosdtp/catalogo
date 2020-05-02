import React from "react";

import {
  Modal,
  ModalBody,
  Button,
  FormGroup,
  Input,
  Row,
  Col } from "reactstrap";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function SendButton(props){
  if(props.active){
    return(
    <Button
      className="btn-info"
      color="info"
      type="button"
      onClick={props.handleSend}
    >
      Enviar
    </Button>
  )
  } else {
    return(
    <Button
      className="btn-neutral btn-disabled"
      color="default"
      type="button"
      disabled
    >
      Enviar
    </Button>
  )
  }
}

function CartFormModal(props) {

  const [modal, setModal] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [tel, setTel] = React.useState();
  const [email, setEmail] = React.useState();
  const [address, setAddress] = React.useState();

  const [contactTo, setContactTo] = React.useState( "whatsapp" );

  function handleSend(e){
    setModal(false);
    props.handleSend(name, surname, tel, address, email, contactTo);
  }

  function onNameChange(e){
    setName(e.target.value);
  }

  function onSurnameChange(e){
    setSurname(e.target.value);
  }

  function onTelChange(e){
    setTel(e.target.value);
  }

  function onEmailChange(e){
    setEmail(e.target.value);
  }

  function onAddressChange(e){
    setAddress(e.target.value);
  }

  function handleContactChange(e) {
    setContactTo(e.target.parentElement.parentElement.parentElement.id);
  }

  React.useEffect( () => {
    setActive(name && surname && tel && email && address && contactTo);
  })

  return(
      <div className="row col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 second-row">
        <Button id="teams-filter" color="info" onClick={() => setModal(true)}>
          <i className="now-ui-icons ui-1_check"></i> Siguiente
        </Button>
        <Modal
          id="modal-dialog"
          modalClassName="modal-mini modal-info"
          toggle={() => setModal(false)}
          isOpen={modal}
        >
          <ModalBody>
            <div className="tab-content text-center">
                <p>Completa tus datos, y un representante te va a contactar para confirmar tu pedido.</p>
            </div>
            <div id="inputs">
              <Row>
                <Col xl="6" lg="6" md="6" sm="6" xs="12">
                  <FormGroup>
                    <Input
                      id="send-data-form"
                      defaultValue=""
                      placeholder="Nombre"
                      type="text"
                      onChange={onNameChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col xl="6" lg="6" md="6" sm="6" xs="12">
                  <FormGroup>
                    <Input
                      id="send-data-form"
                      defaultValue=""
                      placeholder="Apellido"
                      type="text"
                      onChange={onSurnameChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col xl="6" lg="6" md="6" sm="6" xs="12">
                  <FormGroup>
                    <Input
                      id="send-data-form"
                      defaultValue=""
                      placeholder="Teléfono"
                      type="number"
                      onChange={onTelChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col xl="6" lg="6" md="6" sm="6" xs="12">
                  <FormGroup>
                    <Input
                      id="send-data-form"
                      defaultValue=""
                      placeholder="Email"
                      type="text"
                      onChange={onEmailChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col xl="12" lg="12" md="12" sm="12" xs="12">
                  <FormGroup>
                    <Input
                      id="send-data-form"
                      defaultValue=""
                      placeholder="Dirección"
                      type="text"
                      onChange={onAddressChange}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col xl="12" lg="12" md="12" sm="12" xs="12" className="contact-to">
                  <div className="tab-content text-center">
                      <p>Contactar por:</p>
                  </div>
                  <FormControl className="card-title row contact-to" id="talles" component="fieldset">
                    <RadioGroup row aria-label="position" name="position" defaultValue="whatsapp">
                      <FormControlLabel
                        id="email"
                        className="talle-check"
                        value="email"
                        control={<Radio color="primary" />}
                        label="Email"
                        labelPlacement="top"
                        onChange={handleContactChange}
                      />
                      <FormControlLabel
                        id="llamada"
                        className="talle-check"
                        value="llamada"
                        control={<Radio color="primary" />}
                        label="Llamada"
                        labelPlacement="top"
                        onChange={handleContactChange}
                      />
                      <FormControlLabel
                        id="whatsapp"
                        className="talle-check"
                        value="whatsapp"
                        control={<Radio color="primary" />}
                        label="WhatsApp"
                        labelPlacement="top"
                        onChange={handleContactChange}
                      />
                    </RadioGroup>
                  </FormControl>
                </Col>
              </Row>
            </div>
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
            <SendButton handleSend={handleSend} active={active} />
          </div>
        </Modal>
      </div>
  )


}

export default CartFormModal;
