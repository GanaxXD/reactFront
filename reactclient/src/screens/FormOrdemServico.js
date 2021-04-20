import React, {Fragment} from 'react';
import {Card, InputGroup, FormControl} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';

const FormOrdemServico = (props) =>{

    return(
        <Fragment>
            <NavBarApp/>
            {/* Para deixar a cor de fundo cinza e 
            para coletar os dados, coloco o form */}
            <form>
                <Card className="cardAppCustomized">
                    <Card.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Cliente</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Digite o id do cliente"
                                aria-label="Id do Cliente"
                                aria-describedby="basic-addon1"
                                type="number"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Ordem</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea"
                                placeholder="Digite a descrição da ordem de serviço"
                                aria-label="descrição da ordem de serviço"
                                aria-describedby="basic-addon1"
                                type="text"
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">R$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Digite o preço da ordem de serviço"
                                aria-label="Valor da Ordem de Serviço"
                                aria-describedby="basic-addon1"
                                type="number"
                            />
                        </InputGroup>
                        <br/>
                        <ButtonHome title="Cadastrar" variant="primary"/>
                    </Card.Body>
                </Card>
                {/* Footer */}
            <hr/>
            <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
            </form>
        </Fragment>
    );
}

export default FormOrdemServico;