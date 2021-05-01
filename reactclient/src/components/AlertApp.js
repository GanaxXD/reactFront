import React, { useEffect, useState } from 'react';
import {Alert, Row} from 'react-bootstrap';
import ButtonHome from './ButtonHome';

const AlertApp = (props) =>{

    const [show, setShow] = useState(props.alert_show);

    return(
        <Alert show={show} variant={props.variant} onClick={()=>setShow(false)} dismissible>
            <Alert.Heading>{props.title}</Alert.Heading>
            <hr/>
            <p>{props.message}</p>
            <hr/>
            <Row className="d-flex justify-content-end">
                <ButtonHome
                    variant="outline-dark"
                    title="Excluir"
                />
                <ButtonHome
                    variant="outline-success"
                    title="Cancelar"
                />
            </Row>
        </Alert>
    );
}

export default AlertApp;