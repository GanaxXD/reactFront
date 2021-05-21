import React, {Fragment, useEffect, useState } from 'react';
import {Table, Card, Spinner, Alert} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import axios from 'axios';
import {ErrorBoundary} from 'react-error-boundary'
import { useParams } from 'react-router';

let maxComments = 0;

//variável usada para controlar o fluxo de obtenção de ordens de serviço do servidor
let loading = true;

//variável usada para controlar o fluxo de obtenção de comentários do servidor
let loadingComments = true;

//variáveis para exibição de mensagens
let mensagem;
let variantApp;
let titleApp;

const TableDataOrders = ()=>{

    const {id} = useParams();
    
    //state
    const [comments, setComment]=useState([]);
    const [showExcludeMessage, setShowExcludeMessage] = useState(false);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);

    async function getAllComments (id){
        loading = true;
        axios.get(`https://api-client-serviceorder.herokuapp.com/ordemservico/${id}/comentario`, {
            headers : {
                'Access-Control-Allow-Origin' : '*', 
            }
        })
        .then(response =>{
            maxComments = response.data.length;
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

    async function excluir (id, index){
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

    function MensagemExcluir(id, index){
        return(<Alert variant="danger" show={showExcludeMessage} onClick={()=>setShowExcludeMessage(false)} dismissible>
                    <Alert.Heading>Deseja Realmente Excluir Este Cadastro?</Alert.Heading>
                    <hr/>
                    Tem certeza que deseja excluir este dado? Ao excluir, o usuário
                    será apagado da base de dados da aplicação.
                    <p className="anuncio">Caso desista da ideia, clique no "X" ou no botão "Cancelar"</p>
                    <hr/>
                    <ButtonHome variant="outline-dark" onClick={()=>excluir(id, index)}>Excluir</ButtonHome>
                    <ButtonHome variant="success" onClick={()=>setShowExcludeMessage(false)}>Cancelar</ButtonHome>
                </Alert>
        );
    }

    //criando lifecycle
    useEffect(()=>{
        if(!comments.length){
            getAllComments(id).then(data=>{
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
    
    function ErrorFallback({error}){
        let mensagemErroAlert = `Tivemos um problema, provavelmente causado pela
            ordem de serviço pesquisada. Por favor, volte mais tarde. Erro: ${error.message}`;
        let titleErroAlert = "Opa, achamos um erro nesta ação!";
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
        <Fragment>
            <br/>
            <ErrorBoundary onReset={()=>setShow(false)} FallbackComponent={ErrorFallback} onError={()=>setShowError(true)}>
            <Card className="cardAppCustomized">
                <Card.Title className="cardTitle">Ordens de Serviços</Card.Title>
                <Card.Body>
                    <Card.Text className="anuncio">A obtenção dos dados desta operação 
                        pode variar, conforme. Aguarde...
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
                                <th>Ordem de Serviço</th>
                                <th>Comentário</th>
                                <th colSpan="3">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Precisa fazer um map no array resultado da base de dados */}
                            {
                                comments.map((data, index)=>
                                    <tr>
                                        <td key={Date.prototype.getMilliseconds}>{id}</td>
                                        <td key={Date.prototype.getMilliseconds}>{data.descricao}</td>
                                        <td key={Math.random()*100}><ButtonHome variant="outline-success" title="Editar"/></td>
                                        <td key={Math.random()*100}><ButtonHome onClick={()=>{}} variant="outline-danger" title="Excluir"/></td>
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
                        : `Número de Coemntários da Ordem de Serviço: ${maxComments}`
                    }                       
                </Card.Footer>
            </Card>
        </ErrorBoundary>
             {/* Footer */}
             <hr/>
            <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
            <br/>
            <br/>
        </Fragment>
    );
}

export default TableDataOrders;