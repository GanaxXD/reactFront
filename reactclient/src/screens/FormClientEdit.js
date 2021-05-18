import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';
import {ErrorBoundary} from 'react-error-boundary'
import {Card, InputGroup, FormControl, Col, Alert, Container, Form, Spinner} from 'react-bootstrap';
import './css/style.css';
import { useParams} from 'react-router-dom';

let mensagem;
let variantApp;
let titleApp;

const FormClientEdit = () =>{

    const initState = {
        nome: ' ',
        email: ' ',
        fone: ' '
    }

    const {id} = useParams();
    const [client, setClient] = useState(initState);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function buscarCliente(id){
        setLoading(true);
        axios.get(`https://api-client-serviceorder.herokuapp.com/clientes/${id}`)
            .then((response) => {
                console.log(response.data);
                client.nome = response.data.nome;
                client.email = response.data.email;
                client.fone = response.data.fone;
                console.log("CLIET NOME: ",client);
            }).catch((error) =>{
                if(error.response){
                    mensagem = error.response.data['titulo'];
                    titleApp = `Ah, droga! O Erro ${error.response.status} foi retornado!`;
                    variantApp = "danger";
                } else if (error.request){
                    console.log("AQUI 2");
                    mensagem = "Ops... Achamos um erro. Por Favor, tente mais tarde.";
                    titleApp = "Ah, droga!";
                    variantApp = "warning";
                } else {
                    console.log("AQUI 3");
                    mensagem = "Ops... Achamos um erro. Por Favor, tente mais tarde.";
                    titleApp = "Ah, droga!";
                    variantApp = "warning";
                }
            }).then(()=>{
                setLoading(false);
            });
    }
    
    async function editar(client){
        axios.put(`https://api-client-serviceorder.herokuapp.com/clientes/${id}`, client)
        .then(response => {
            response.setHeader('Access-Control-Allow-Origin', '*'); //permitindo que as requisições sejam de qualquer origem
            variantApp = "success"
            mensagem = "As alterações no cadastrado do usuário foram cadastradas na base de dados."
            titleApp = "Atualização do cliente com sucesso!";
            
        }).catch( function (error) {
            if(error.response){
                mensagem = `Erro ao atualizar os dados do cliente. O erro "${error.response.status}"
                foi retornado. Detalhes: ${error.response.data['titulo']}`
                variantApp="danger"
                titleApp = `Ah, que pena. Ocorreu um erro! (Status da resposta: ${error.response.status})`
            }
        });
    }

    //criando lifecycle
    useEffect(()=>{
        console.log(id);
        if(client.nome === ' '){
            buscarCliente(id);
        }
        
    }, [client]);

    //Para a mensagem de erro (Erro Boundary)
    useEffect(()=>{
        if(showError){
            setTimeout(()=>{
                setShowError(false);
            }, 9000);
        }
    }, [showError]);


    //Para a mensagem de edição
    useEffect(()=>{
        if(show){
            setTimeout(()=>{
                setShow(false);
            }, 9000)
        }
    }, [show]);

    //Criando o novo cliente, adicionando os campos no objeto/array
    const changeFields = event =>{
        setClient({
            ...client, [event.currentTarget.name]:event.currentTarget.value
        });
    }

    //validando o formulário:
    const handleSubmit = async function carregar(event){
        setLoading(true);
        if(event.currentTarget.checkValidity() === true){
            console.log("Dentro do handleSubmit");
            editar(client).then(response=>{
                console.log("dentro do client");
                setShow(true);
            });
            console.log("mensagem ", mensagem, "Variant: ", variantApp);
            event.preventDefault();
        };
        setValidated(true);
        event.preventDefault();
    };

    function MensagemAlerta(){
        if(show){
            return (
                <Alert variant={variantApp} show={show} onClick={()=>setShow(false)} dismissible>
                    <Alert.Heading>{titleApp}</Alert.Heading>
                       
                    <hr/>
                    {mensagem}
                </Alert>
            );
        };
        return <p></p>; //precisa retornar um JSX
    };
    
    function ErrorFallback({error}){
        let mensagemErroAlert = `Tivemos um problema nessa ação. 
            Por favor, tente novamente. Erro: ${error.message}`;
        let titleErroAlert = "Opa, achamos um erro!";
        let variantError = "warning";
        return (
            <Alert variant={variantError} show={showError} onClick={()=>setShowError(false)} dismissible>
                <Alert.Heading>{titleErroAlert}</Alert.Heading>
                <hr/>
                {mensagemErroAlert}
            </Alert>
        );
    };
    
    return( <ErrorBoundary onReset={()=>setShow(false)} 
                            FallbackComponent={ErrorFallback} 
                            onError={()=>setShowError(true)}>
        {
        (!show && loading) ?
            <div className="carregandoDadosServidor">
                <br/>
                <p>Aguarde...</p>
                <Spinner animation="grow"></Spinner>
                <br/>
                <p className="anuncio">Isso pode demorar um pouco.</p>
            </div>
        :
            <Form onSubmit={handleSubmit} noValidate validated={validated}> {/* o noValidate é para evitar que o browser valide o formulário pela sua própria metodologia de validação */}
                {/* Cabeçalho */}
                <NavBarApp/>
                <h1 className="hcabecalho">Atualização do cadastro de Clientes</h1>
                
                {/* Se o show for true, o código seguinte é ativado */}
                <ErrorBoundary onReset={()=>setShow(false)} 
                                FallbackComponent={ErrorFallback} 
                                onError={()=>setShowError(true)}>
                    {show && <MensagemAlerta/>}
                </ErrorBoundary> 
                
                {/* Formulário */}
                <Container fluid="xl" >
                    <ErrorBoundary onReset={()=>setShow(false)} 
                                FallbackComponent={ErrorFallback} 
                                onError={()=>setShowError(true)}>
                        <Card className="cardAppCustomized">
                            <Card.Body>
                                <div>
                                    <Card.Text className="anuncio">A velocidade de conexão com o servidor é definido 
                                        de acordo com as normas do pacote do <i>Heroku</i> adiquirida 
                                        (plataforma on-line onde a API está disponível), podendo levar um 
                                        tempo considerável ( {'>'} 40')
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
                                    variant="primary" title="Editar" type="submit"
                                />
                            </Card.Body>
                        </Card>
                    </ErrorBoundary>
                </Container>

                {/* Footer */}
                <hr/>
                <ButtonHome variant="outline-dark" link="/" 
                    title="Voltar Para a Página Inicial"/>
            </Form>
        }</ErrorBoundary>
    );
}

export default FormClientEdit;