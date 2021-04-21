import React, { useEffect, useState } from 'react';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';
import {Card, InputGroup, FormControl, Col, Alert, Container} from 'react-bootstrap';
import './css/style.css';

async function cadastrar(client){
    let data = fetch('https://api-client-serviceorder.herokuapp.com/clientes')
}

const FormClient = (props) =>{

    const initialState={
        pageTitle:'Cadastro de Clientes',
    }
    const [dataPage, setDataPage] = useState(initialState);
    const [client, setClient] = useState([
        {
            nome: "",
            email:"",
            fone:""
        }
    ]);

    useEffect(()=>{
        setDataPage(dataPage)
    }, []);

    useEffect((data)=>{
        setClient(data);
    }, []);

    const mensagemCadastro= event=>{
        return (<Alert variant="success">
            Cliente cadastrado com sucesso!
        </Alert>);
    }

    const changeFields = event =>{
        setFields({
            [e.currentTarget.nome]:[e.currentTarget.value]
        })
    }

    return(
        <form align="center" method="POST" onSubmit={mensagemCadastro}>
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
                                        id="nome" 
                                        //value={client.nome}              
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
                                                id="email"
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
                                            id="fone"
                                    />
                                </Col>
                            </InputGroup>
                        </div>
                        <ButtonHome variant="primary" title="Cadastrar" 
                            onClick={cadastrar(client)}
                        />
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