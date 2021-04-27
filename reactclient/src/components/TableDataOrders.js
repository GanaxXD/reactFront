import React, {Fragment, useEffect, useState } from 'react';
import {Table, Card, Spinner, Form} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import axios from 'axios';

let maxOrders = 0;
let maxComments = 0;
let loading = true;
let loadingComments = true;
let baseLinkOrders = 'https://api-client-serviceorder.herokuapp.com/ordemservico';

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

const TableDataOrders = ()=>{
    
    //state
    const [orders, setOrder]=useState([]);
    const [comments, setComment]=useState([]);

    //criando lifecycle
    useEffect(()=>{
        if(!orders.length){
            getAllOrders().then(data=>{
                setOrder(data);
                loading = false;
            })
        }
    }, [orders, loading]);

    useEffect(()=>{
        if(!comments.length){
            getAllComments('id_ordem').then(data=>{
                setComment(data);
                loadingComments = false;
            })
        }
    }, [comments, loadingComments]);
    

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

                        loading == true ? 
                        
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
                                        <td><a href={`/editarOrdem/${data.id}`}>Editar</a></td>  {/* as={Link} to ="rota-do-servico" para deixar a aplicação singlepage */}
                                        <td><a href={`/excluirOrdem/${data.id}`}>Excluir</a></td>  {/* as={Link} to ="rota-do-servico" para deixar a aplicação singlepage */}
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