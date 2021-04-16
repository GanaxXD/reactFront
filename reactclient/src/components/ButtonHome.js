import { Fragment } from 'react';
import {Alert, Button} from 'react-bootstrap';

const ButtonHome = (props)=>{
    return (
        <Fragment>
            <Button variant="outline-dark" href="#">Voltar à Página inicial</Button>
        </Fragment>
    );
}

export default ButtonHome;