import React, {Fragment, useEffect, useState } from 'react';
import {Table, Card, Spinner, Alert, Modal, closeButton} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import axios from 'axios';
import {ErrorBoundary} from 'react-error-boundary'

let maxOrders = 0;

//variável usada para controlar o fluxo de obtenção de ordens de serviço do servidor
let loading = true;

//variável usada para controlar o fluxo de obtenção de comentários do servidor
let baseLinkOrders = 'https://api-client-serviceorder.herokuapp.com/ordemservico';

//variáveis para exibição de mensagens
let mensagem;
let variantApp;
let titleApp;

//variáveis de controle da exclusão local e no banco
let idOrdem;
let indexOrdem;

const TableDataOrders = ()=>{
    
    //state
    const [orders, setOrder]=useState([]);
    const [showExcludeMessage, setShowExcludeMessage] = useState(false);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);

    //variável para fechar o modal
    const handleClose = () => setShowExcludeMessage(false);

    async function getAllOrders(){
        let data = await axios(baseLinkOrders);
        let result = data.data;
        maxOrders = result.length;
        loading = false;
        return result;
    }
    
    async function excluir (id){
        loading = true;
        axios.delete(`https://api-client-serviceorder.herokuapp.com/ordemservico/${id}`, {
            headers : {
                'Access-Control-Allow-Origin' : '*', 
            }
        })
        .then(response=>{
            console.log(response);
            variantApp = "success"
            mensagem = "A Ordem de Serviço foi excluida da base de dados."
            titleApp = "Exclusão realizada com sucesso!"
            setShowExcludeMessage(false);
            orders.splice(indexOrdem, 1); //exclui um registro a partir da posição indicada
        }) 
        .catch((error)=>{
            if(error.response){
                mensagem = error.response.data['titulo'];
                titleApp = `Ah, droga! O Erro ${error.response.status} foi retornado!`;
                variantApp = "danger";
            } else if (error.request) {
                mensagem = "Ops... Achamos um erro. Por Favor, tente mais tarde.";
                titleApp = "Ah, droga!";
                variantApp = "warning";
                console.log(error);
            } else {
                mensagem = "Ops... Achamos um erro. Por Favor, tente mais tarde.";
                titleApp = "Ah, droga!";
                variantApp = "warning";
                console.log(error.message);
            }
        }).then(()=>{
            setShow(true);
            loading = false;
        })
    }

    function MensagemExcluir(id, index){
        indexOrdem = index;
        setShowExcludeMessage(true);
        idOrdem = id;
        
    }

    //criando lifecycle
    useEffect(()=>{
        if(!orders.length){
            getAllOrders().then(data=>{
                setOrder(data);
                loading = false;
            })
        }
    }, [orders]);

    //Para a mensagem de erro (Erro Boundary)
    useEffect(()=>{
        if(showError){
            setTimeout(()=>{
                setShowError(false);
            }, 9000);
        }
    }, [showError]);


    //Para a mensagem de edição
    useEffect(()=>{
        if(show){
            setTimeout(()=>{
                setShow(false);
            }, 9000)
        }
    }, [show]);
    

    return(
        <Fragment>
            
            {/* Modal de exclusão */}
            <Modal show={showExcludeMessage} onHide={handleClose} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Ordem de Serviço?</Modal.Title>
                </Modal.Header>
            
                <Modal.Body>
                    <p>Tem certeza que deseja excluir esta ordem de serviço? Ao excluir, a ordem
                    será apagado da base de dados da aplicação.</p>
                    <p className="anuncio">Caso desista da ideia, clique no "X" ou no botão "Cancelar"</p>
                </Modal.Body>
            
                <Modal.Footer>
                    <ButtonHome variant="outline-dark" onClick={()=>excluir(idOrdem)} title="Excluir"></ButtonHome>
                    <ButtonHome variant="success" onClick={()=>setShowExcludeMessage(false)} title="Cancelar"></ButtonHome>
                </Modal.Footer>
            </Modal>

            <br/>
            <Card className="cardAppCustomized">
                <Card.Title className="cardTitle">Ordens de Serviços</Card.Title>
                <Card.Body>
                    <Card.Text className="anuncio">O registro desta operação 
                        no banco de dados disponível no <i>Heroku</i> (plataforma 
                        on-line onde a API está disponível) pode variar, conforme 
                        o pacote de serviços adiquirido na disponibilização dos serviços.
                    </Card.Text>
                    {

                        loading === true ? 
                        
                        <div className="progresso">
                            <h4>Carregando...</h4>
                            <Spinner animation="grow" size="sm"/>
                            <p>Estamos carregando os dados do servidor   
                                    <i>Heroku</i>.
                            </p>
                        </div>
                        
                        :
                    
                    <Table responsive striped bordered hover variant="dark" size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Solicitante</th>
                                <th>Descrição da Ordem</th>
                                <th>Data de Abertura</th>
                                <th>Data de Finalização</th>
                                <th><i>Status</i></th>
                                <th colSpan="3">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Precisa fazer um map no array resultado da base de dados */}
                            {
                                orders.map((data, index)=>
                                    <tr>
                                        <td key={index + 9}>{data.id}</td>
                                        <td key={index +10}>{data.cliente.nome}</td>
                                        <td key={index +11}>{data.descricao}</td>
                                        <td key={index +12}>{data.dataAbetura}</td>
                                        <td key={index +13}>{!data.dataFinalizacao?"Não Definido":data.dataFinalizacao}</td>
                                        <td key={index +14}>{data.status}</td>
                                        <td key={index +15}><ButtonHome link={`/comentario/${data.id}`} title="Comentários" variant="info"/></td>
                                        <td key={Math.random()*100}><ButtonHome link={`/editarOrdem/${data.id}`} variant="outline-success" title="Editar"/></td>
                                        <td key={Math.random()*100}><ButtonHome onClick={()=>MensagemExcluir(data.id, index)} variant="outline-danger" title="Excluir"/></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>

                    }
                </Card.Body>
                <Card.Footer>
                    {
                        loading?
                        <Spinner animation="grow" size="sm"></Spinner>
                        : `Número de Ordens de Serviço Cadastradas: ${maxOrders}`
                    }                       
                </Card.Footer>
            </Card>
             {/* Footer */}
             <hr/>
            <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
            <br/>
            <br/>
        </Fragment>
    );
}

export default TableDataOrders;