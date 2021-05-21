import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { Card, FormControl, Container, Form, Col, Alert, Spinner } from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';
import {ErrorBoundary} from 'react-error-boundary';
import { useParams } from 'react-router';

let responseStatus = "";
let responseMessage = "";
let orderResponseData;
let variantApp;
let titleApp;


const FormOrdemServicoEdit = () => {

    const {id} = useParams();

    //variável de controle para carregar a ordem de serviço
    let ordemObtida = false;
    
    const initialState = {
        clienteId : '',
        descricao : '',
        preco: ''
    }

    if(ordemObtida == false){
        //recuperando dados da ordem de serviço selecionada
        axios.get(`https://api-client-serviceorder.herokuapp.com/ordemservico/${id}`,{
            //Adicionando cross-origin (cors): requisição aceita de qualquer lugar
            headers : {
                'Access-Control-Allow-Origin' : '*', 
            }
        }).then(response => {
            ordem.clienteId = response.data.cliente['id'];
            ordem.descricao = response.data.descricao;
            ordem.preco = response.data.preco;
            ordemObtida = true;
            console.log(ordem);
        });
    }

    const [ordem, setOrdem] = useState(initialState);
    const [validate, setValidate]=useState(false);
    const [show, setShow] = useState(false);
    const [loadingPost, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    async function editar(id, ordem){
        setLoading(true);
        axios.post(`https://api-client-serviceorder.herokuapp.com/ordemservico/${id}`, ordem,{
            //Adicionando cross-origin (cors): requisição aceita de qualquer lugar
            headers : {
                'Access-Control-Allow-Origin' : '*', 
            }
        })
            .then((response)=>{
                console.log("Resposta: ",response);
                responseMessage = "A ordem de serviço foi editada com sucesso!";
                variantApp = "success";
                titleApp = "Ordem de Serviço Editada com Sucesso!";
                // setLoading(false);
            })
            .catch((error)=>{
                //Quando a request não retorna uma resposta dentro do range 2xx
                if(error.response){
                    console.log("Erro response: ", error.response);
                    responseStatus = error.response.status;
                    responseMessage = error.response.data['titulo'];
                    orderResponseData = error.response.data;
                    variantApp = "danger";
                    titleApp = `Ah, droga! Ocorreu um erro! (Status da resposta: ${responseStatus})`;
                    // setLoading(false);
                //quando a request é feita mas não retorna resposta (instancia de XMLHttpRequest se no Browser; http.ClientRequest, se no Node.js)
                } else if (error.request){
                    responseMessage = `Estamos enfrentando problemas com essa ação. 
                        Parece que o servidor não está liberando o acesso a esse recurso.
                        Por favor, volte mais tarde. Erro: ${error.message}`;
                    variantApp = "warning";
                    titleApp = `Ah, droga! Parece que temos um erro nesta ação!`;
                    console.log("Error Request: ", error.request);
                    // setLoading(false);
                } else {
                    console.log("Error geral: ", error);
                    responseMessage = `Estamos enfrentando problemas com essa ação. 
                        Parece que o servidor está negando o acesso a esse recurso. 
                        Por favor, volte mais tarde. Erro: ${error.message}`;
                    variantApp = "warning";
                    titleApp = `Ah, droga! Parece que temos um erro nesta ação!`;
                    // setLoading(false);
                }
                
                //Sempre ocorrerá
            }).then(()=>{
                setLoading(false);
                setShow(true);
            });
    }

    useEffect(()=>{
        console.log("#### Dentro do useEffect do alerta: ####")
        if(show){
            console.log("Show dentro do useEffect: ", show);
            setTimeout(()=>{
                setShow(false);
                console.log("Show dentro do useEffect/ Depois setTimeout: ", show," loadinPost: " ,loadingPost);
            }, 9000);
        }
    }, [show]);

    const handlerOrderChange = event =>{
        setOrdem({
            ...ordem, [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event)=>{
        console.log("#### Dentro do handleSubmit: ####");
        if(event.currentTarget.checkValidity() === true){
            console.log("Show dentro do IF/antes do cadastro: ", show);
            editar(id, ordem).then(console.log("AQUI:   ----->  ",variantApp, responseMessage, titleApp));
            console.log("AQUI:   ----->  ",variantApp, responseMessage, titleApp);
            console.log("Show dentro do IF/depois do cadastro: ", show);
            event.preventDefault();
        }
        setValidate(true);
        event.preventDefault();
    }

    useEffect(()=>{
        if(showError){
            setTimeout(()=>{
                setShowError(false);
                console.log("Show dentro do useEffect/ Depois setTimeout: ", show," loadinPost: " ,loadingPost);
            }, 11000);
        }
    }, [showError]);

    function ErrorFallback({error}){
        let mensagemErroAlert = `Tivemos um problema, provavelmente causado informação
            passada por você. Por favor, certifique-se de que os dados
            informados são verdadeiros. Erro: ${error.message}`;
        let titleErroAlert = "Opa, achamos um erro nesta ação!";
        let variantError = "warning";
        return (
            <Alert variant={variantError} show={showError} onClick={()=>setShowError(false)} dismissible>
                <Alert.Heading>{titleErroAlert}</Alert.Heading>
                <hr/>
                {mensagemErroAlert}
            </Alert>
        );
    }

    function MensagemAlerta(){
        console.log("#### Dentro do MensagemAlerta: ####");
        console.log("Show: ", show, " LoadingPost: ", loadingPost);
        if(show && loadingPost==false){
            return (
                <Alert variant={variantApp} show={show} onClick={()=>setShow(false)} dismissible>
                    <Alert.Heading>{titleApp}</Alert.Heading>
                    <hr/>
                    {responseMessage}
                </Alert>
            );
        }
        return <p></p>; //precisa retornar um JSX
    }

    return (
        !show && loadingPost ?
        <div className="carregandoDadosServidor">
            <br/>
            <p>Enviando e validando dados...</p>
            <Spinner animation="grow"/>
            <br/>
            <p className="anuncio">Isso pode demorar um pouco.</p>
        </div>
        :
        <Form noValidate validated={validate} onSubmit={handleSubmit}>
            {/* Para deixar a cor de fundo cinza e 
            para coletar os dados, coloco o form */}
            <NavBarApp />
            <h1 className="hcabecalho">Cadastro de Ordem de Serviço</h1>
            {/* Se o show for true, o código seguinte é ativado */}
            <ErrorBoundary onReset={()=>setShow(false)} 
                            FallbackComponent={ErrorFallback} 
                            onError={()=>setShowError(true)}>
                {show && <MensagemAlerta/>}
            </ErrorBoundary>
                <Container fluid="xl">
                    <Card className="cardAppCustomized">
                        <Card.Body>
                            <Card.Text className="anuncio">A veocidade de conexão com o servidor é definido 
                                    de acordo com as normas do pacote do <i>Heroku</i> adiquirida 
                                    (plataforma on-line onde a API está disponível)
                            </Card.Text>

                            <Form.Row>
                                <Form.Group as={Col} mb="4">
                                    <Form.Label>ID do Cliente (*)</Form.Label>
                                    <FormControl
                                        placeholder="Digite o id do cliente solicitante (*)"
                                        aria-label="Id do Cliente"
                                        aria-describedby="basic-addon1"
                                        type="number"
                                        name="clienteId"
                                        value = {ordem?.clienteId}
                                        onChange={handlerOrderChange}
                                        disabled = "true"
                                    />
                                    <Form.Control.Feedback type="invalid">O id do ciente é obrigatório!</Form.Control.Feedback>
                                </Form.Group> 
                                    
                                <Form.Group as={Col} mb="4">
                                    <Form.Label>Preço (*)</Form.Label>
                                    <FormControl
                                        placeholder="Digite o preço da ordem de serviço"
                                        aria-label="Valor da Ordem de Serviço"
                                        aria-describedby="basic-addon1"
                                        type="number"
                                        name="preco"
                                        value ={ordem?.preco}
                                        onChange={handlerOrderChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">O campo preço é obrigatório!</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group mb="4">
                                <Form.Label>Descrição (*)</Form.Label>
                                <FormControl as="textarea"
                                    placeholder="Digite a descrição da ordem de serviço"
                                    aria-label="descrição da ordem de serviço"
                                    aria-describedby="basic-addon1"
                                    type="text"
                                    name="descricao"
                                    value = {ordem?.descricao}
                                    onChange={handlerOrderChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">O campo descrição é obrigatório!</Form.Control.Feedback>
                            </Form.Group>

                            <p className="anuncio">Os campos com * são obrigatórios.</p>
                            <br />
                            <ButtonHome title="Editar" variant="primary" type="submit"/>
                        </Card.Body>
                    </Card>

                    {/* Footer */}
                    <hr />
                    <ButtonHome variant="outline-dark" link="/listaordens" title="Voltar" />
                </Container>
        </Form>
    );
}

export default FormOrdemServicoEdit;