import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';
import {Card, InputGroup, FormControl, Col, Alert, Container} from 'react-bootstrap';
import './css/style.css';

let statusRequest;
async function cadastrar(client){
    // client = JSON.stringify(client);
    // console.log('dentro do cadastro', client)
    // const result = await fetch('https://api-client-serviceorder.herokuapp.com/clientes',
    //     {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json' 
    //         },
    //         body: client
    //     }
    // );

    // console.log(result);

    axios.post('https://api-client-serviceorder.herokuapp.com/clientes', client);
    // .then( data => {
    //     statusRequest = data.status;
    //     console.log(data.status);
    // }).catch( error => {
    //     statusRequest = error.status;
    //     console.log(error.status);
    // });
}

const FormClient = (props) =>{

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
        console.log(client);
        setDataPage(dataPage)
    }, []);

    const mensagemCadastro= event=>{
        <Alert variant="success">Cliente cadastrado com sucesso!</Alert>
        event.preventDefault();
    }

    const changeFields = event =>{
        setClient({
            ...client, [event.currentTarget.name]:event.currentTarget.value
        })
        console.log(client)
    }

    return(
        <form align="center" method="POST" onSubmit={mensagemCadastro}>
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