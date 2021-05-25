import React, {Fragment, useEffect, useState } from 'react';
import {Table, Card, Spinner, Alert} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import axios from 'axios';
import {ErrorBoundary} from 'react-error-boundary'
import { useParams } from 'react-router';

let maxComments = 0;

//variável usada para controlar o fluxo de obtenção de ordens de serviço do servidor
let loading;

//variável usada para controlar o fluxo de obtenção de comentários do servidor
let loadingComments = true;

//variáveis para exibição de mensagens
let mensagem;
let variantApp;
let titleApp;

const TableDataOrders = ()=>{

    const {id} = useParams();
    const arrayData = [];
    
    //state
    const [comments, setComment]=useState(arrayData);
    const [showExcludeMessage, setShowExcludeMessage] = useState(false);
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);

    async function getAllComments(id){
        console.log("iniciando o get");
        loading = true;
        axios(`https://api-client-serviceorder.herokuapp.com/ordemservico/${id}/comentario`,{
            headers : {
                'Access-Control-Allow-Origin' : '*', 
            },
        })
        .then((response) =>{
            maxComments = response.data.length;
            setComment(response.data);
            console.log("Número de comentários: ",maxComments, "resultado: ", response, "Comentarios: ", comments );
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
                    <ButtonHome variant="success" onClick={()=>setShowExcludeMessage(false)}>Cancelar</ButtonHome>
                </Alert>
        );
    }

    //criando lifecycle
    useEffect(()=>{
        if(maxComments === 0){
            getAllComments(id).then(response => {
                setComment(response);
            });
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
                <Card.Title className="cardTitle">Comentários</Card.Title>
                <Card.Body>
                    <Card.Text className="anuncio">A obtenção dos dados desta operação 
                        pode variar. Aguarde...
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
                                    <th>#</th>
                                    <th>Ordem de Serviço</th>
                                    <th>Comentário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Precisa fazer um map no array resultado da base de dados */}
                                {
                                    comments.length >=0 ?
                                        comments.map((data, index)=>
                                            <tr>
                                                <td>{index+1}</td>
                                                <td key={Date.prototype.getMilliseconds}>{id}</td>
                                                <td key={Date.prototype.getMilliseconds}>{data.descricao}</td>
                                            </tr>
                                        )
                                    :
                                    <tr>
                                        <td>Não há comentários para esta ordem de serviço.</td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    }
                </Card.Body>
                <Card.Footer>
                    {
                        loading ?
                        <Spinner animation="grow" size="sm"></Spinner>
                        : `Número de Coemntários da Ordem de Serviço: ${maxComments}`
                    }                       
                </Card.Footer>
            </Card>
        </ErrorBoundary>
             {/* Footer */}
             <hr/>
            <ButtonHome variant="outline-dark" link="/listaordens" title="Voltar"/>
            <br/>
            <br/>
        </Fragment>
    );
}

export default TableDataOrders;