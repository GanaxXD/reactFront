import React from 'react';
import {Card} from 'react-bootstrap';
import NavBarApp from '../components/NavBarApp';

const FormPageNotFound = ()=>{
    return (
        <div>
            <NavBarApp/>
                <Card className="cardAppCustomized" border="danger">
                <Card.Header >Ah não! Um erro 404!</Card.Header>
                    <br></br>
                    <Card.Title>Página não encontrada!</Card.Title>
                    <Card.Text>
                        Por favor, verifique se o caminho digitado 
                        na <i>url</i> está correto.
                    </Card.Text>
                    <br></br>
                    <Card.Link href="/">Voltar à página inicial</Card.Link>
                </Card>
        </div>
    );
}

export default FormPageNotFound;