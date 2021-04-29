import React, { useEffect, useState } from 'react';
import {Alert, Row} from 'react-bootstrap';
import ButtonHome from './ButtonHome';

const AlertApp = (props) =>{

    const [show, setShow] = useState(props.alert_show)
    //[{
    //     show: false,
    //     onClick: null,
    //     variant: "success",
    //     message: ' ',
    //     title: ''
    // }]);

    // useEffect(()=>{
    //     setShow([
    //         ...show, {
    //             [show]: props.show,
    //             [onClick]: props.onClick,
    //             [variant]: props.variant,
    //             [message]: props.message,
    //             [title]: props.title,
    //         }
    //     ])
    // }, [show]);

    return(
        <Alert show={show} variant={props.variant} onClick={()=>setShow(false)} dismissible>
            <Alert.Heading>{props.title}</Alert.Heading>
            <hr/>
            <p>{props.message}</p>
            <hr/>
            <Row className="d-flex justify-content-end">
                <ButtonHome
                    variant="outline-dark"
                    // onClick={props.onClickButtonOk}
                    title="Excluir"
                />
                <ButtonHome
                    variant="outline-success"
                    // onClick={props.onClickButtonCancel}
                    title="Cancelar"
                />
            </Row>
        </Alert>
    );
}

export default AlertApp;