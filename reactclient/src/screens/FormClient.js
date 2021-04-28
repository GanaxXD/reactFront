import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';
import {Card, InputGroup, FormControl, Col, Alert, Container, Form, Button} from 'react-bootstrap';
import './css/style.css';

let statusRequest;
let mensagem;
let variant;

async function cadastrar(client){
    axios.post('https://api-client-serviceorder.herokuapp.com/clientes', client)
    .then( data => {
        statusRequest = data.status;
        variant = "success";
        mensagem = "O cliente foi cadastrado na base de dados.";
        //return MensagemDeResposta(variant, mensagem);
    }).catch( error => {
        statusRequest = error.status;
        mensagem = `Erro ao cadastrar o cliente. O erro "${statusRequest}"
        foi retornado.`;
        variant="danger";
        //return MensagemDeResposta(variant, mensagem);
    });
    //return MensagemDeResposta(variant, mensagem);
}

// function mensagemDeResposta(variant, mensagem, status){
//     console.log("Entrei aqui");
//    <Alert variant={variant} show="true" transition="fade">
//            {
//                variant == "danger" ? 
//                <Alert.Heading>Ah, droga! Ocorreu um erro ({status})!</Alert.Heading>
//                :
//                <Alert.Heading>Cliente cadastrado com sucesso!</Alert.Heading>
//            }
//             <hr/>
//             {mensagem}
//         </Alert>
// }

function MensagemDeResposta(variant, mensagem){
    const [show, setShow] = useState(false);
    if(show){
        return (
            <Alert variant={variant} show={setShow(true)} transition="fade" onClose={()=> setShow(false)} dismissible>
                {
                    variant == "danger" ? 
                    <Alert.Heading>Ah, droga! Ocorreu um erro ({statusRequest})!</Alert.Heading>
                    :
                    <Alert.Heading>Cliente cadastrado com sucesso!</Alert.Heading>
                }
                <hr/>
                <p>{mensagem}</p>
                <hr/>
            </Alert>
        );
    }
}

const FormClient = () =>{

    const initialState={
        pageTitle:'Cadastro de Clientes'
    }

    const initialClient = {
        nome : 'pedro',
        email: 'pedro@gmail.com',
        fone : '98 985475585'
    }

    const [dataPage, setDataPage] = useState(initialState);
    const [client, setClient] = useState(initialClient);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(true);

    useEffect(()=>{
        setDataPage(dataPage);
    }, [client]);

    //Criando o novo cliente, adicionando os campos no objeto/array
    const changeFields = event =>{
        setClient({
            ...client, [event.currentTarget.name]:event.currentTarget.value
        });
        console.log(client);
    }

    //validando o formulário:
    const handleSubmit = event =>{
        if(event.currentTarget.checkValidity() == false){
            document.createElement(<Alert>Oi</Alert>).insertAdjacentElement(<alert>Oi</alert>);
            event.preventDefault();
            event.stopPropagation();
            
            
        }
        setValidated(true);
    };

    function mensagemDeResposta(){
        return(<Alert variant="danger" show={show} onClick={()=>setShow(false)} transition="fade">
            {
                variant == "danger" ? 
                <Alert.Heading>Ah, droga! Ocorreu um erro (400)!</Alert.Heading>
                :
                <Alert.Heading>Cliente cadastrado com sucesso!</Alert.Heading>
            }
            <hr/>
            {mensagem}
        </Alert>);
    }

    return(
        <Form onSubmit={handleSubmit} noValidate validated={validated}> {/* o noValidate é para evitar que o browser valide o formulário pela sua própria metodologia de validação */}
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
                                (plataforma on-line onde a API está disponível), podendo levar um 
                                tempo considerável (>40')
                            </Card.Text>
                            <InputGroup className="mb-3, inputSpace">
                                <Col xl="11">
                                    <Form.Label>Nome do Cliente (*)</Form.Label>
                                    <FormControl 
                                        placeholder="Nome"
                                        arial-label="nome"
                                        aerial-describedby="basic-addon1"
                                        name="nome" 
                                        onChange={changeFields}
                                        value={client?.nome}
                                        required             
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Digite um nome.
                                    </Form.Control.Feedback>
                                </Col>
                            </InputGroup>

                            <Form.Group>
                                <Form.Label>E-Mail do Cliente (*)</Form.Label>
                                <Col xl="11">
                                    <InputGroup className="mb-3, inputSpace" hasValidation>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="E-mail"
                                            arial-label="e-mail"
                                            aerial-describedby="basic-addon1"
                                            type="email"
                                            name="email"
                                            onChange={changeFields} 
                                            value={client?.email}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">Digite um e-mail.</Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <InputGroup className="mb-3, inputSpace" hasValidation>
                                <Col xl="11">
                                    <Form.Label>Telefone (*)</Form.Label>
                                    <FormControl 
                                            placeholder="Telefone (xx) nnnnn-nnnn"
                                            arial-label="telefone"
                                            aerial-describedby="basic-addon1"
                                            type="tel"
                                            //pattern="([09]{2})[0-9]{5}-[0-9]{4}"
                                            name="fone"
                                            onChange={changeFields}
                                            value={client?.fone}
                                            required
                                    />
                                    <Form.Control.Feedback type="invalid"> 
                                        Por favor, digite um número de telefone.
                                    </Form.Control.Feedback>
                                </Col>
                            </InputGroup>
                        </div>
                        <p className="anuncio">Os campos com * são obrigatórios.</p>
                        <ButtonHome 
                            variant="primary" title="Cadastrar" 
                            onClick={() => mensagemDeResposta() } type="submit"
                            onSubmit={()=>mensagemDeResposta()}
                        />
                    </Card.Body>
                </Card>
            </Container>

            {/* Footer */}
            <hr/>
            <ButtonHome variant="outline-dark" link="/" 
                title="Voltar Para a Página Inicial"/>
        </Form>

    );
}

export default FormClient;