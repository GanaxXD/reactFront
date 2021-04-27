import axios from 'axios';
import React, {useState } from 'react';
import { Card, InputGroup, FormControl, Container, Form, Row, Col, Alert } from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';

let responseStatus = "";
let responseMessage = "";
let orderResponseData;

// async function cadastrar(ordem){
//     let data = await axios.post('https://api-client-serviceorder.herokuapp.com/ordemservico', ordem)
//     let result = data.data;
//     return result;

// }

async function cadastrar(ordem){
    axios.post('https://api-client-serviceorder.herokuapp.com/ordemservico', ordem)
        .then((response)=>{
            responseStatus = response.status;
            responseMessage = response.statusText;
            orderResponseData = response.data;
            return <Alert>Oi</Alert>
        })
        .catch((error)=>{
            responseStatus = error.status;
            responseMessage = error.statusText;
            orderResponseData = null;
            return <Alert>Não</Alert>
        })
}

const FormOrdemServico = () => {

    const initialState = {
        clienteId : '',
        descricao : '',
        preco: ''
    }

    const [ordem, setOrdem] = useState(initialState);
    const [validate, setValidate]=useState(false);
    const [show, setShow] = useState(true);

    const handlerOrderChange = event =>{
        setOrdem({
            ...ordem, [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event =>{
        if(event.currentTarget.checkValidity() == false){
            event.preventDefault();
            event.setPropagation();
        }
        setValidate(true);
    }

    return (
        <Form noValidate validated={validate} onSubmit={handleSubmit}>
            {/* Para deixar a cor de fundo cinza e 
            para coletar os dados, coloco o form */}
            <NavBarApp />
            <h1 className="hcabecalho">Cadastro de Ordem de Serviço</h1>
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
                        <ButtonHome title="Cadastrar" variant="primary" onClick={()=>cadastrar(ordem).then(()=>{<Alert show={show} onChange={()=>setShow(true)} dismissible>Oi</Alert>})}/>
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