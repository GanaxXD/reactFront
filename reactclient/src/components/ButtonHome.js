import { Fragment } from 'react';
import {Alert, Button} from 'react-bootstrap';

const ButtonHome = (props)=>{
    return (
        <Fragment>
            <Button variant={props.variant} href="#">{props.title}</Button>
        </Fragment>
    );
}

export default ButtonHome;