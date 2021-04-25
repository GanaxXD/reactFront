import axios from 'axios';
import React, {useState } from 'react';
import { Card, InputGroup, FormControl, Container } from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';

async function cadastrar(ordem){
    let data = await axios.post('https://api-client-serviceorder.herokuapp.com/ordemservico', ordem)
    let result = data.data;
    return result;

}

const FormOrdemServico = () => {

    const initialState = {
        clienteId : '',
        descricao : '',
        preco: ''
    }

    const [ordem, setOrdem] = useState(initialState);

    const handlerOrderChange = event =>{
        setOrdem({
            ...ordem, [event.currentTarget.name]: event.currentTarget.value
        })
    }

    return (
        <form>
            {/* Para deixar a cor de fundo cinza e 
            para coletar os dados, coloco o form */}
            <NavBarApp />
            <Container fluid="xl">
                <Card className="cardAppCustomized">
                    <Card.Body>
                        <Card.Text className="anuncio">A veocidade de conexão com o servidor é definido 
                                de acordo com as normas do pacote do <i>Heroku</i> adiquirida 
                                (plataforma on-line onde a API está disponível)
                        </Card.Text>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Cliente</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Digite o id do cliente solicitante"
                                aria-label="Id do Cliente"
                                aria-describedby="basic-addon1"
                                type="number"
                                name="clienteId"
                                value = {ordem?.clienteId}
                                onChange={handlerOrderChange}
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
                                name="descricao"
                                value = {ordem?.descricao}
                                onChange={handlerOrderChange}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend >
                                <InputGroup.Text id="basic-addon1">R$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Digite o preço da ordem de serviço"
                                aria-label="Valor da Ordem de Serviço"
                                aria-describedby="basic-addon1"
                                type="number"
                                name="preco"
                                value ={ordem?.preco}
                                onChange={handlerOrderChange}
                            />
                        </InputGroup>
                        <br />
                        <ButtonHome title="Cadastrar" variant="primary" onClick={()=>cadastrar(ordem)}/>
                    </Card.Body>
                </Card>

                {/* Footer */}
                <hr />
                <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial" />
            </Container>
        </form>
    );
}

export default FormOrdemServico;