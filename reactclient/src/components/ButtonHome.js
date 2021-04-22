import { Fragment } from 'react';
import {Button} from 'react-bootstrap';

const ButtonHome = (props)=>{
    return (
        <Fragment>
            <Button variant={props.variant} href={props.link} onClick={props.onClick}>
                {props.title}
            </Button>
        </Fragment>
    );
}

export default ButtonHome;