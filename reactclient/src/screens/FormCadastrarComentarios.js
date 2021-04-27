import React, { Fragment, useState } from 'react';
import NavBarApp from '../components/NavBarApp';
import {Card, InputGroup, FormControl, Container, Form} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import axios from 'axios';

async function cadastrar (comentario){
    let data = await axios.post(`https://api-client-serviceorder.herokuapp.com/ordemservico/${comentario.id}/comentario`, comentario);
    let result = data.data;
    return result;
}

const FormCadastrarComentarios = ()=>{

    const initialState = {
        id: ' ',
        descricao: ' '   
    }
    const [comentario, setComent] = useState(initialState);
    const [validate, setValidate] = useState(false);

    const handdlerChange = event =>{
        setComent({
           ...comentario, [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event =>{
        if(event.currentTarget.checkValidity() == false){
            event.preventDefault();
            event.setPropagation();
        }
        setValidate(true);
    }

    return(
        <Form noValidate onSubmit={handleSubmit} noValidate={validate}>
            <Fragment>
                <NavBarApp/>
                <h1 className="hcabecalho">Cadastro de Comentátios para Ordens de Serviço</h1>
                    <Container fluid="xl" >
                        <Card className="cardAppCustomized">
                            <Card.Body>
                                <Card.Text><p className="anuncio">A veocidade de conexão com o servidor é definido 
                                    de acordo com as normas do pacote do <i>Heroku</i> adiquirida 
                                    (plataforma on-line onde a API está disponível)
                                </p></Card.Text>

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
                        
                                <ButtonHome variant="primary" title="Cadastrar" onClick={()=>cadastrar(comentario)}/>
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