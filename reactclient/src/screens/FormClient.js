import React, { useEffect, useState } from 'react';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';
import {Card, InputGroup, FormControl, Col, Row, Container} from 'react-bootstrap';
import './css/style.css';

const initialState={
    pageTitle:'Cadastro de Clientes',
}


const FormClient = (props) =>{

    const [dataPage, setDataPage] = useState(initialState);

    useEffect(()=>{
        setDataPage(dataPage)
    });

    return(
        <form align="center">
            {/* Cabeçalho */}
            <NavBarApp/>
            <h1 className="hcabecalho" defaultValue={dataPage.pageTitle}></h1>
            
            {/* Formulário */}
            <Container fluid="xl" >
                <Card className="cardAppCustomized">
                    <Card.Body>
                        <div>
                            <InputGroup className="mb-3, inputSpace">
                                <Col xl="11">
                                    <FormControl 
                                        placeholder="Nome"
                                        arial-label="nome"
                                        aerial-describedby="basic-addon1"
                                    />
                                </Col>
                            </InputGroup>

                            <InputGroup className="mb-3, inputSpace">
                                <Col xl="11">
                                    <InputGroup.Prepend >
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                        <FormControl
                                                placeholder="E-mail"
                                                arial-label="e-mail"
                                                aerial-describedby="basic-addon1"
                                                type="email"
                                        />
                                    </InputGroup.Prepend>                                    
                                </Col>
                            </InputGroup>

                            <InputGroup className="mb-3, inputSpace">
                                <Col xl="11">
                                    <FormControl 
                                            placeholder="Telefone"
                                            arial-label="telefone"
                                            aerial-describedby="basic-addon1"
                                            type="fone"
                                    />
                                </Col>
                            </InputGroup>
                        </div>
                        <ButtonHome variant="primary" title="Cadastrar"/>
                    </Card.Body>
                </Card>

            </Container>


            {/* Footer */}
            <hr/>
            <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
        </form>
    );
}

export default FormClient;