import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';
import {Card, InputGroup, FormControl, Col, Alert, Container} from 'react-bootstrap';
import './css/style.css';

let statusRequest;
async function cadastrar(client){
    axios.post('https://api-client-serviceorder.herokuapp.com/clientes', client)
    .then( data => {
        statusRequest = data.status;
        return <Alert variant="success">Cliente cadastrado com sucesso!</Alert>;
    }).catch( error => {
        statusRequest = error.status;
        return <Alert variant="danger">
            Erro ao cadastrar o cliente. O erro {statusRequest}
            foi retornado.        
        </Alert>;
    });
}

const FormClient = () =>{

    const initialState={
        pageTitle:'Cadastro de Clientes'
    }

    const initialClient = {
        nome : '',
        email: '',
        fone : ''
    }

    const [dataPage, setDataPage] = useState(initialState);
    const [client, setClient] = useState(initialClient);

    useEffect(()=>{
        setDataPage(dataPage)
    }, [client]);

    //Criando o novo cliente, adicionando os campos no objeto/array
    const changeFields = event =>{
        setClient({
            ...client, [event.currentTarget.name]:event.currentTarget.value
        })
    }

    return(
        <form align="center" method="POST">
            {/* Cabeçalho */}
            <NavBarApp/>
            <h1 className="hcabecalho">{dataPage.pageTitle}</h1>
            
            {/* Formulário */}
            <Container fluid="xl" >
                <Card className="cardAppCustomized">
                    <Card.Body>
                        <div>
                            <Card.Text className="anuncio">A veocidade de conexão com o servidor é definido 
                                de acordo com as normas do pacote do <i>Heroku</i> adiquirida 
                                (plataforma on-line onde a API está disponível)
                            </Card.Text>
                            <InputGroup className="mb-3, inputSpace">
                                <Col xl="11">
                                    <FormControl 
                                        placeholder="Nome"
                                        arial-label="nome"
                                        aerial-describedby="basic-addon1"
                                        name="nome" 
                                        onChange={changeFields}
                                        value={client?.nome}             
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
                                                name="email"
                                                onChange={changeFields} 
                                                value={client?.email}
                                        />
                                    </InputGroup.Prepend>                                    
                                </Col>
                            </InputGroup>

                            <InputGroup className="mb-3, inputSpace">
                                <Col xl="11">
                                    <FormControl 
                                            placeholder="Telefone (xx) nnnnn-nnnn"
                                            arial-label="telefone"
                                            aerial-describedby="basic-addon1"
                                            type="tel"
                                            pattern="([09]{2})[0-9]{5}-[0-9]{4}"
                                            name="fone"
                                            onChange={changeFields}
                                            value={client?.fone}
                                    />
                                </Col>
                            </InputGroup>
                        </div>
                        <ButtonHome variant="primary" title="Cadastrar" 
                            onClick={() => cadastrar(client)}
                        />
                    </Card.Body>
                </Card>

            </Container>


            {/* Footer */}
            <hr/>
            <ButtonHome variant="outline-dark" link="/" 
                title="Voltar Para a Página Inicial"/>
        </form>
    );
}

export default FormClient;