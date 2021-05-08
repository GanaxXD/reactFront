import axios from 'axios';
import React, {useState } from 'react';
import { Card, FormControl, Container, Form, Col, Alert, Spinner } from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';

const FormOrdemServico = () => {

    let responseStatus = "";
    let responseMessage = "";
    let orderResponseData;
    let variantApp;
    let titleApp;

    async function cadastrar(ordem){
        axios.post('https://api-client-serviceorder.herokuapp.com/ordemservico', ordem)
            .then((response)=>{
                console.log("Resposta: ",response.data)
                responseStatus = response.status;
                responseMessage = response.statusText;
                orderResponseData = response.data;
                variantApp = "success";
                titleApp = "Ordem de Serviço Cadastrada com Sucesso!"

            })
            .catch((error)=>{
                //Quando a request não retorna uma resposta dentro do range 2xx
                if(error.response){
                    console.log("Erro: ", error.response);
                    responseStatus = error.response.status;
                    responseMessage = error.response.statusText;
                    orderResponseData = error.response.data;
                    variantApp = "danger";
                    titleApp = `Ah, droga! Ocorreu um erro! (${responseStatus})`
                //quando a request é feita mas não retorna resposta (instancia de XMLHttpRequest se no Browser; http.ClientRequest, se no Node.js)
                } else if (error.request){
                    console.log("Error Request: ", error.request);
                } else {
                    console.log("Error geral: ", error);
                }
                
            })
    }

    const initialState = {
        clienteId : '',
        descricao : '',
        preco: ''
    }

    const [ordem, setOrdem] = useState(initialState);
    const [validate, setValidate]=useState(false);
    const [show, setShow] = useState(false);
    const [loadingPost, setLoading] = useState(false);

    const handlerOrderChange = event =>{
        setOrdem({
            ...ordem, [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event =>{
        if(event.currentTarget.checkValidity() === true){
            cadastrar(ordem).then(resp =>{
                setShow(true);
                setLoading(false);
            })
            event.preventDefault();
        }
        setValidate(true);
    }

    function MensagemAlerta(){
        if(show && !loadingPost){
            return (
                <Alert variant={variantApp} show={show} onClick={()=>setShow(false)} dismissible>
                    <Alert.Heading>{titleApp}</Alert.Heading>
                       
                    <hr/>
                    {responseMessage}
                </Alert>
            );
        }
        return console.log("Não houve retorno na função 'MensagemAlerta'");
    }

    return (
        show && !loadingPost ?
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
            { show && <MensagemAlerta/> } 
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
                                    required
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
                        <ButtonHome title="Cadastrar" variant="primary" type="submit"/>
                    </Card.Body>
                </Card>

                {/* Footer */}
                <hr />
                <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial" />
            </Container>
        </Form>
    );
}

export default FormOrdemServico;