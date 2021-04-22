import React, { Fragment } from 'react';
import NavBarApp from '../components/NavBarApp';
import {Card, InputGroup, FormControl, Container} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';

const FormCadastrarComentarios = ()=>{
    return(
        <form>
            <Fragment>
                <NavBarApp/>
                    <Container fluid="xl" >
                        <Card className="cardAppCustomized">
                            <Card.Body>
                                <Card.Text><p className="anuncio">A veocidade de conexão com o servidor é definido 
                                    de acordo com as normas do pacote do <i>Heroku</i> adiquirida 
                                    (plataforma on-line onde a API está disponível)
                                </p></Card.Text>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Informe o Id da Ordem de Serviço"
                                        aria-label="Id da ordem de serviço"
                                        aria-describedby="basic-addon1"
                                        type="number"
                                        name="id"
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FormControl as="textarea"
                                        placeholder="Descreva o comentário para a Ordem de Serviço"
                                        aria-label="Descrição do comentário"
                                        aria-describedby="basic-addon1"
                                        name="descricao"
                                    />
                                </InputGroup>

                                <ButtonHome variant="primary" title="Cadastrar"/>
                            </Card.Body>
                        </Card>
                        
                    {/* Footer */}
                    <hr/>
                    <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
                </Container>
            </Fragment>
        </form>
    );
}

export default FormCadastrarComentarios;