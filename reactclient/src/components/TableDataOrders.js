import React, { Fragment, useEffect, useState } from 'react';
import {Table, Card, ProgressBar, Spinner} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import {Link} from 'react-router-dom'; 

let maxOrders = 0;
let maxComments = 0;

async function getAllOrders(){
    let data = await fetch('https://api-client-serviceorder.herokuapp.com/ordemservico');
    maxOrders = data.length;
    let result = data.json();
    return result;
}

async function getAllComments(id_chamado){
    let data = await fetch(`https://api-client-serviceorder.herokuapp.com/ordemservico/${id_chamado}/comentario`);
    maxComments = data.length;
    let result = data.json();
    return result;
}

const TableDataOrders = (props)=>{
    
    //state
    const [orders, setOrder]=useState([]);
    const [comments, setComment] = useState([]);

    let loading = false;
    let loadingComments = false;

    //criando lifecycle
    useEffect(()=>{
        loading = true;
        getAllOrders().then(data=>{
            setOrder(data);
            loading = false;
        })
    }, []);

    useEffect(()=>{
        loadingComments = true;
        getAllComments('id_ordem').then(data=>{
            setComment(data);
            loadingComments = false;
        })
    }, []);
    
    return(
        <Fragment>
            <br/>
            <Card className="cardAppCustomized">
                <Card.Title className="cardTitle">Ordens de Serviços</Card.Title>
                <Card.Body>
                    <Card.Text><p className="anuncio">O registro desta operação 
                        no banco de dados disponível no <i>Heroku</i> (plataforma 
                        on-line onde a API está disponível) pode variar, conforme 
                        o pacote de serviços adiquirido na disponibilização dos serviços.</p>
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
                                orders.map((data)=>
                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.cliente.nome}</td>
                                        <td>{data.descricao}</td>
                                        <td>{data.dataAbetura}</td>
                                        <td>{!data.dataFinalizacao?"--":data.dataFinalizacao}</td>
                                        <td>{data.status}</td>
                                        <td><a as={Link} to="/comentario/${data.id}">Comentários ({
                                                loadingComments == true ?
                                                    <ProgressBar animated 
                                                        className="carregandoComentarios"/> 
                                                : maxComments
                                            })</a></td>
                                        <td><a as={Link} to="/editarOrdem/${data.id}">Editar</a></td>  {/* as={Link} to ="rota-do-servico" para deixar a aplicação singlepage */}
                                        <td><a as={Link} to="/editarOrdem/${data.id}">Excluir</a></td>  {/* as={Link} to ="rota-do-servico" para deixar a aplicação singlepage */}
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>

                    }
                </Card.Body>
                {/* <Card.Footer>
                    {
                        loading == true ?
                        <Spinner animation="grow" size="sm"></Spinner>
                        : `Número de Ordens de Serviço Cadastradas: ${maxOrders}`
                    }                       
                </Card.Footer> */}
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