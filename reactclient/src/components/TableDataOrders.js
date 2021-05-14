import React, {Fragment, useEffect, useState } from 'react';
import {Table, Card, Spinner, Alert} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import axios from 'axios';
import {ErrorBoundary} from 'react-error-boundary'

let maxOrders = 0;
let maxComments = 0;
let loading = true;
let loadingComments = true;
let baseLinkOrders = 'https://api-client-serviceorder.herokuapp.com/ordemservico';
let mensagem;
let variantApp;
let titleApp;

const TableDataOrders = ()=>{
    
    async function getAllOrders(){
        let data = await axios(baseLinkOrders);
        let result = data.data;
        maxOrders = result.length;
        loading = false;
        return result;
    }
    
    async function getAllComments(id_chamado){
        let data = await axios(`${baseLinkOrders}/${id_chamado}/comentario`);
        let result = data.data;
        maxComments = result.length;
        loadingComments = false;
        console.log(result);
        return result;
    }

    
    async function excluir (id){
        loading = true;
        axios.delete(`https://api-client-serviceorder.herokuapp.com/clientes/${id}`, {
            headers : {
                'Access-Control-Allow-Origin' : '*', 
            }
        })
        .then(response=>{
            response.setHeader('Access-Control-Allow-Origin', '*'); //permitindo que as requisições sejam de qualquer origem
            variantApp = "success"
            mensagem = "O cliente foi excluido na base de dados."
            titleApp = "Exclusão realizada com sucesso!"
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
            } else {
                mensagem = "Ops... Achamos um erro. Por Favor, tente mais tarde.";
                titleApp = "Ah, droga!";
                variantApp = "warning";
            }
        }).then(()=>{
            setShow(true);
            loading = false;
        })
    }

    function mensagemExcluir(id){
        return(<Alert variant="danger" show={showExcludeMessage} onClick={()=>setShowExcludeMessage(false)} dismissible>
                    <Alert.Heading>Deseja Realmente Excluir Este Cadastro?</Alert.Heading>
                    <hr/>
                    Tem certeza que deseja excluir este dado? Ao excluir, o usuário
                    será apagado da base de dados da aplicação.
                    <p className="anuncio">Caso desista da ideia, clique no "X" ou no botão "Cancelar"</p>
                    <hr/>
                    <ButtonHome variant="outline-dark" onClick={()=>excluir(id)}>Excluir</ButtonHome>
                    <ButtonHome variant="success" onClick={()=>setShowExcludeMessage(false)}>Cancelar</ButtonHome>
                </Alert>
        );
    }

    //state
    const [orders, setOrder]=useState([]);
    const [comments, setComment]=useState([]);
    const [showExcludeMessage, setShowExcludeMessage] = useState(false);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);

    //criando lifecycle
    useEffect(()=>{
        if(!orders.length){
            getAllOrders().then(data=>{
                setOrder(data);
                loading = false;
            })
        }
    }, [orders]);

    useEffect(()=>{
        if(!comments.length){
            getAllComments('id_ordem').then(data=>{
                setComment(data);
                loadingComments = false;
            })
        }
    }, [comments]);

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
                                        <td key={Date.prototype.getMilliseconds}>{data.id}</td>
                                        <td key={Date.prototype.getMilliseconds}>{data.cliente.nome}</td>
                                        <td key={Date.prototype.getMilliseconds}>{data.descricao}</td>
                                        <td key={Date.prototype.getMilliseconds}>{data.dataAbetura}</td>
                                        <td key={Date.prototype.getMilliseconds}>{!data.dataFinalizacao?"Não Definido":data.dataFinalizacao}</td>
                                        <td key={Date.prototype.getMilliseconds}>{data.status}</td>
                                        <td key={Date.prototype.getMilliseconds}><a href="${baseLinkOrders}/comentario/${data.id}">Comentários ({
                                                // loadingComments ?
                                                //     <Spinner animation="grow" size="sm"/> 
                                                // : maxComments
                                                maxComments
                                            })</a></td>
                                        <td key={Math.random()*100}><ButtonHome link={`/editarcliente/${data.id}`} variant="outline-success" title="Editar"/></td>
                                            <td key={Math.random()*100}> <ButtonHome onClick={()=>mensagemExcluir(data.id)} variant="outline-danger" title="Excluir"/> </td>
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