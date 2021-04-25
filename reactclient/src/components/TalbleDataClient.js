import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {Table, Card, Spinner} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';

let maxClients = 0;
let loading = true;
let baseLink = 'https://api-client-serviceorder.herokuapp.com/clientes';

async function getAllClients(){
    let data = await axios(baseLink);
    let result = await data.json(); //teste
    maxClients = result.length; //teste
    return result;//teste
} //teste

const TableDataClient = ()=>{
    
    
    //state
    const [clientes, setClient] = useState([]);

    //criando lifecycle
    useEffect(()=>{
        if (!clientes.length) {
            getAllClients().then(data=>{
                setClient(data);
                loading = false;
            });
        }
        
    }, [clientes]);

    return(
        <Fragment>
            <br/>
            <Card className="cardAppCustomized">
                <Card.Title className="cardTitle">Clientes Cadastrados</Card.Title>
                <Card.Body>
                    <Card.Text className="anuncio">O registro desta operação 
                        no banco de dados disponível no <i>Heroku</i> (plataforma 
                        on-line onde a API está disponível) pode variar, conforme 
                        o pacote de serviços adiquirido na disponibilização dos serviços.
                    </Card.Text>
                    {
                        loading ?
                            <div className="carregandoDados">
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
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th colSpan="2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Precisa fazer um map no array resultado da base de dados */}
                            {
                                clientes.map((data)=>
                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.nome}</td>
                                        <td>{data.email}</td>
                                        <td>{data.fone}</td>
                                        <td><a href="{baseLink}/editarcliente/${data.id}">Editar</a></td>
                                        <td><a href="{baseLink}/editarcliente/${data.id}">Excluir</a></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>

                    }
                    <Card.Footer>
                        {
                            loading ?
                            <Spinner animation="grow" size="sm"></Spinner>
                           : `Número de Clientes Cadastrados: ${maxClients}`
                        }                       
                    </Card.Footer>

                </Card.Body>
            </Card>
             {/* Footer */}
             <hr/>
            <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
        </Fragment>
    );
}

export default TableDataClient;