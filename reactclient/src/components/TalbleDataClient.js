import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {Table, Card, Spinner, Alert, closeButton} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ButtonHome from '../components/ButtonHome';
import {ErrorBoundary} from 'react-error-boundary';

let maxClients = 0;
let baseLink = 'https://api-client-serviceorder.herokuapp.com/clientes';
let loading = true;
let mensagem;
let variantApp;
let titleApp;
let idCliente;
let indexClienteExcuir;

const TableDataClient = ()=>{
    
    async function getAllClients(){
        let data = await axios(baseLink);
        let result = data['data']; 
        maxClients = result.length;
        console.log("result: ", result, "Max Result: ", maxClients);
        loading = false;
        console.log(loading);
        return result;
    }

    //state
    const [clientes, setClient] = useState([]);
    const [showError, setShowError] = useState(false);
    const [show, setShow] = useState(false);

    const [showExcludeMessage, setShowExcludeMessage] = useState(false);

    async function excluir (id){
        loading = true;
        axios.delete(`https://api-client-serviceorder.herokuapp.com/clientes/${id}`, {
            headers : {
                'Access-Control-Allow-Origin' : '*', 
            }
        })
        .then(response=>{
            // response.setHeader('Access-Control-Allow-Origin', '*'); //permitindo que as requisições sejam de qualquer origem
            variantApp = "success"
            mensagem = "O cliente foi excluido na base de dados."
            titleApp = "Exclusão realizada com sucesso!"
            setShowExcludeMessage(false);
            clientes.splice(indexClienteExcuir, 1); //removendo o cliente do nosso array de clientes local (da poição do index, remover 1)
            console.log(clientes);
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

    
    const handleClose = () => setShowExcludeMessage(false);

    function MensagemExcluir(id, index){
        indexClienteExcuir = index;
        setShowExcludeMessage(true);
        idCliente = id;
        console.log("idClient: ", idCliente, "Index: ", index);
        
    }

    //criando lifecycle
    useEffect(()=>{
        if(!clientes.length){
            getAllClients().then(data=>{
                setClient(data);
                loading = false;
                console.log(clientes);
            });
        }
        
    }, [clientes]);

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
        let mensagemErroAlert = `Tivemos um problemaao tentar efetuar esta ação. Por favor, volte mais tarde. 
                                Erro: ${error.message}`;
        let titleErroAlert = "Opa, achamos um erro!";
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
            <Modal show={showExcludeMessage} onHide={handleClose} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Cliente?</Modal.Title>
                </Modal.Header>
            
                <Modal.Body>
                    <p>Tem certeza que deseja excluir este dado? Ao excluir, o usuário
                    será apagado da base de dados da aplicação.</p>
                    <p className="anuncio">Caso desista da ideia, clique no "X" ou no botão "Cancelar"</p>
                </Modal.Body>
            
                <Modal.Footer>
                    <ButtonHome variant="outline-dark" onClick={()=>excluir(idCliente)} title="Excluir"></ButtonHome>
                    <ButtonHome variant="success" onClick={()=>setShowExcludeMessage(false)} title="Cancelar"></ButtonHome>
                </Modal.Footer>
            </Modal>
            <br/>
            <Card className="cardAppCustomized">
                <Card.Title className="cardTitle">Clientes Cadastrados</Card.Title>
                <Card.Body>
                    <Card.Text className="anuncio">O registro desta operação 
                        no banco de dados disponível no <i>Heroku</i> (plataforma 
                        on-line onde a API está disponível) pode variar, conforme 
                        o pacote de serviços adiquirido na disponibilização dos serviços.
                    </Card.Text>
                    <ErrorBoundary onReset={()=>setShow(false)} FallbackComponent={ErrorFallback} 
                                   onError={()=>setShowError(true)}>
                        {
                            loading === true?
                                <div className="carregandoDados">
                                    <h4>Carregando...</h4>
                                    <Spinner animation="grow" size="sm"/>
                                    <p>Estamos carregando os dados do servidor   
                                        <i>Heroku</i>.
                                    </p>
                                </div> 
                            :
                            <Table responsive striped bordered hover variant="dark" size="sm" >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>E-mail</th>
                                    <th>Telefone</th>
                                    <th colSpan="2">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Precisa fazer um map no array resultado da base de dados */}
                                {
                                    clientes.map((data, index)=>
                                        <tr>
                                            <td key={data.id+1}>{data.id}</td>
                                            <td key={data.id+2}>{data.nome}</td>
                                            <td key={data.id+3}>{data.email}</td>
                                            <td key={data.id+4}>{data.fone}</td>
                                            <td key={data.id+5}><ButtonHome link={`/editarcliente/${data.id}`} variant="outline-success" title="Editar"/></td>
                                            <td key={data.id+6}> <ButtonHome onClick={()=>MensagemExcluir(data.id, index)} variant="outline-danger" title="Excluir"/> </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>

                        }
                        <Card.Footer>
                            {
                                loading === true?
                                <Spinner animation="grow" size="sm"></Spinner>
                            : `Número de Clientes Cadastrados: ${maxClients}`
                            }                       
                        </Card.Footer>
                    </ErrorBoundary>
                </Card.Body>
            </Card>
             {/* Footer */}
             <hr/>
            <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
            <br/>
        </Fragment>
    );
}

export default TableDataClient;