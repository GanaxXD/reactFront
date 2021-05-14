import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';
import {ErrorBoundary} from 'react-error-boundary'
import {Card, InputGroup, FormControl, Col, Alert, Container, Form, Spinner} from 'react-bootstrap';
import './css/style.css';

let mensagem;
let statusRequest;
let variantApp;
let titleApp;

const FormClient = () =>{

    // let loadingPost = false;
    const [loadingPost, setLoading] = useState(false);
     
    async function cadastrar(client){
        setLoading(true);
        return axios.post('https://api-client-serviceorder.herokuapp.com/clientes', client)
        .then(response => {
            console.log("entrei no then", response);
            response.setHeader('Access-Control-Allow-Origin', '*'); //permitindo que as requisições sejam de qualquer origem
            variantApp = "success"
            mensagem = "O cliente foi cadastrado na base de dados."
            titleApp = "Cadastrado com sucesso!"
            setLoading(false);
            
        }).catch( function (error) {
            if(error.response){
                console.log("entrei no erro", error);
                statusRequest = error.response.status;
                mensagem = `Erro ao cadastrar o cliente. O erro "${error.response.status}"
                foi retornado. Detalhes: ${error.response.data['titulo']}`
                console.log("titulo: ", error.response.data['titulo'], "status: ", error.response.status)
                variantApp="danger"
                titleApp = `Ah, que pena. Ocorreu um erro! (Status da resposta: ${error.response.status})`
                setLoading(false);
            }
        });
    }

    const initialClient = {
        nome : '',
        email: '',
        fone : ''
    }

    const [client, setClient] = useState(initialClient);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(()=>{
        if(show){
            console.log("Antes do If: Show: ", show, "Loading: ", loadingPost);
            setTimeout(()=>{
                setShow(false);
                console.log("Dentro do TimeOut: Show: ", show, "Loading: ", loadingPost);
            },5000);
            setLoading(false);
            console.log("Depois do If: Show: ", show, "Loading: ", loadingPost);
        }
    }, [show]);

    useEffect(()=>{
        if(showError){
            setTimeout(()=>{
                setShowError(false);
                console.log("Show dentro do useEffect/ Depois setTimeout: ", show," loadinPost: " ,loadingPost);
            }, 9000);
        }
    }, [showError])

    //Criando o novo cliente, adicionando os campos no objeto/array
    const changeFields = event =>{
        setClient({
            ...client, [event.currentTarget.name]:event.currentTarget.value
        });
    }

    //validando o formulário:
    const handleSubmit = async function carregar(event){
        if(event.currentTarget.checkValidity() === true){
            cadastrar(client).then(response=>{
                setShow(true);
                setLoading(false);
            });
            event.preventDefault();
        }
        setValidated(true);
        event.preventDefault();
    };

    function MensagemAlerta(){
        if(show && !loadingPost){
            return (
                <Alert variant={variantApp} show={show} onClick={()=>setShow(false)} dismissible>
                    <Alert.Heading>{titleApp}</Alert.Heading>
                       
                    <hr/>
                    {mensagem}
                </Alert>
            );
        }
        return <p></p>; //precisa retornar um JSX
    }
    function ErrorFallback({error}){
        let mensagemErroAlert = `Tivemos um problema, provavelmente causado pelo id da ordem de 
            serviço informada nessa ação. Por favor, certifique-se que a ordem de serviço existe 
            no banco. Erro: ${error.message}`;
        let titleErroAlert = "Opa, achamos um erro!";
        let variantError = "warning";
        return (
            <Alert variant={variantError} show={showError} onClick={()=>setShowError(false)} dismissible>
                <Alert.Heading>{titleErroAlert}</Alert.Heading>
                <hr/>
                {mensagemErroAlert}
            </Alert>
        );
    }

    return(
        loadingPost && !show?
        <div className="carregandoDadosServidor">
            <br/>
            <p>Enviando e validando dados...</p>
            <Spinner animation="grow"></Spinner>
            <br/>
            <p className="anuncio">Isso pode demorar um pouco.</p>
        </div>
        :
        <Form onSubmit={handleSubmit} noValidate validated={validated}> {/* o noValidate é para evitar que o browser valide o formulário pela sua própria metodologia de validação */}
            {/* Cabeçalho */}
            <NavBarApp/>
            <h1 className="hcabecalho">Cadastro de Clientes</h1>
            
            {/* Se o show for true, o código seguinte é ativado */}
            <ErrorBoundary onReset={()=>setShow(false)} 
                            FallbackComponent={ErrorFallback} 
                            onError={()=>setShowError(true)}>
                {show && <MensagemAlerta/>}
            </ErrorBoundary> 
            
            {/* Formulário */}
            <Container fluid="xl" >
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
                            variant="primary" title="Cadastrar" 
                             type="submit"
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