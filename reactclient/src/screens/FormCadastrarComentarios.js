import React, { Fragment } from 'react';
import NavBarApp from '../components/NavBarApp';
import {Card, InputGroup, FormControl} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';

const FormCadastrarComentarios = ()=>{
    return(
        <Fragment>
            <NavBarApp/>
            <form>
                <Card className="cardAppCustomized">
                    <Card.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Informe o Id da Ordem de Serviço"
                                aria-label="Id da ordem de serviço"
                                aria-describedby="basic-addon1"
                                type="number"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <FormControl as="textarea"
                                placeholder="Descreva o comentário para a Ordem de Serviço"
                                aria-label="Descrição do comentário"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                        <ButtonHome variant="primary" title="Cadastrar"/>
                    </Card.Body>
                </Card>
                
            {/* Footer */}
            <hr/>
            <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
            </form>
        </Fragment>
    );
}

export default FormCadastrarComentarios;