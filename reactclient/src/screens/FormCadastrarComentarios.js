import React, { Fragment, useEffect, useState } from 'react';
import NavBarApp from '../components/NavBarApp';
import {Card, InputGroup, FormControl, Container, Form, Alert, Spinner} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import axios from 'axios';
import {ErrorBoundary} from 'react-error-boundary'

let mensagem;
let variantApp;
let titleApp;

const FormCadastrarComentarios = ()=>{

    async function cadastrar (comentario){
        setLoading(true);
        axios.post(`https://api-client-serviceorder.herokuapp.com/ordemservico/${comentario.id}/comentario`, 
                    comentario, {
                        headers : {
                            'Access-Control-Allow-Origin' : '*',
                            "Access-Control-Allow-Origin":"*" 
                        }
                    })
        .then((response)=>{
            response.setHeader('Access-Control-Allow-Origin', '*');
            mensagem = "O cadastro do comentário na ordem de serviço foi um sucesso!";
            variantApp = "success";
            titleApp = "Comentário cadastrado com sucesso!"
        })
        .catch((error)=>{
            if(error.response){
                console.log(error, error.response);
                mensagem = error.response.data['titulo'];
                titleApp = `Ah, droga! O Erro ${error.response.status} foi retornado!`;
                variantApp = "danger";
            } else if (error.request) {
                console.log("Error: ", error, "Error Request",error.request);
                console.log("Erro... Foi triste.");
                mensagem = "Ops... Achamos um erro. Por Favor, verifique se o ID da ordem informada de fato existe.";
                titleApp = "Ah, droga!";
                variantApp = "danger";
            } else {
                console.log("Erro... Foi triste number 2.");
                mensagem = "Ops... Achamos um erro. Por Favor, verifique se o ID da ordem informada de fato existe.";
                titleApp = "Ah, droga!";
                variantApp = "danger";
            }
        })
        .then(()=>{
            setShow(true);
            setLoading(false);
        });
    }

    const initialState = {
        id: '1',
        descricao: 'A adição de novos hardwares foram solicitados pelo cliente via mensagem de texto, sem nenhuma avaliação prévia da peça pelo profissional técnico da loja.'   
    }
    const [comentario, setComent] = useState(initialState);
    const [validated, setValidate] = useState(false);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loadingPost, setLoading] = useState(false);

    const handdlerChange = event =>{
        setComent({
           ...comentario, [event.currentTarget.name]: event.currentTarget.value
        })
    }

    useEffect(()=>{
        if(show){
            setTimeout(()=>{
                setShow(false);
                console.log("Show dentro do useEffect/ Depois setTimeout: ", show," loadinPost: " ,loadingPost);
            }, 5000);
        }
    }, [show]);

    useEffect(()=>{
        if(showError){
            setTimeout(()=>{
                setShowError(false);
                console.log("Show dentro do useEffect/ Depois setTimeout: ", show," loadinPost: " ,loadingPost);
            }, 5000);
        }
    }, [showError])

    function MensagemAlerta(){
        console.log("#### Dentro do MensagemAlerta: ####");
        console.log("Show: ", show, " LoadingPost: ", loadingPost);
        if(show && loadingPost==false){
            return (
                <ErrorBoundary onError={ErrorFallback} fallback={ErrorFallback}>
                    <Alert variant={variantApp} show={show} onClick={()=>setShow(false)} dismissible>
                        <Alert.Heading>{titleApp}</Alert.Heading>
                        <hr/>
                        {mensagem}
                    </Alert>
                </ErrorBoundary>
            );
        }
        if( show && loadingPost){
            return console.log("Não houve retorno na função 'MensagemAlerta'");
        }
        return console.log("Sem resposta.");
    }

    const handleSubmit = event =>{
        if(event.currentTarget.checkValidity() === true){
            cadastrar(comentario);
            event.preventDefault();
        }
        setValidate(true);
        event.preventDefault();
    }

    function ErrorFallback(){
        let mensagemErroAlert = "Tivemos um problema, provavelmente causado pelo id da ordem de serviço informada nessa ação. Por favor, certifique-se que a ordem de serviço existe no banco.";
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
        !show && loadingPost ?
            <div className="carregandoDadosServidor">
                <br/>
                <p>Enviando e validando dados...</p>
                <Spinner animation="grow"/>
                <br/>
                <p className="anuncio">Isso pode demorar um pouco.</p>
            </div>
            :
            <Form noValidate onSubmit={handleSubmit} noValidate={validated}>
                <Fragment>
                    <NavBarApp/>
                    <h1 className="hcabecalho">Cadastro de Comentátios para Ordens de Serviço</h1>
                        <Container fluid="xl" >
                            {show && <MensagemAlerta/>}
                            <Card className="cardAppCustomized">
                                <Card.Body>
                                    <Card.Text className="anuncio">A veocidade de conexão com o servidor é definido 
                                        de acordo com as normas do pacote do <i>Heroku</i> adiquirida 
                                        (plataforma on-line onde a API está disponível)
                                    </Card.Text>

                                    <InputGroup className="mb-3">
                                        <Form.Label>Id da Ordem de Serviço (*)</Form.Label>
                                        <FormControl
                                            placeholder="Informe o Id da Ordem de Serviço"
                                            aria-label="Id da ordem de serviço"
                                            aria-describedby="basic-addon1"
                                            type="number"
                                            name="id"
                                            value={comentario?.id}
                                            onChange={handdlerChange}
                                            required
                                        />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                        <Form.Label>Descrição (*)</Form.Label>
                                        <FormControl as="textarea"
                                            placeholder="Descreva o comentário para a Ordem de Serviço"
                                            aria-label="Descrição do comentário"
                                            aria-describedby="basic-addon1"
                                            name="descricao"
                                            value={comentario?.descricao}
                                            onChange={handdlerChange}
                                            required
                                        />
                                    </InputGroup>

                                    <p className="anuncio">Os campos com * são obrigatórios.</p>
                                    <br />
                            
                                    <ButtonHome variant="primary" title="Cadastrar" type="submit"/>
                                </Card.Body>
                            </Card>
                            
                        {/* Footer */}
                        <hr/>
                        <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
                    </Container>
                </Fragment>
            </Form>
    );
}

export default FormCadastrarComentarios;