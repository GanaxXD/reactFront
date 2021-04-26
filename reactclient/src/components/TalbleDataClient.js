import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {Table, Card, Spinner} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import AlertApp from '../components/AlertApp';

let maxClients = 0;
let baseLink = 'https://api-client-serviceorder.herokuapp.com/clientes';
let loading = true;

async function getAllClients(){
    let data = await axios(baseLink);
    let result = data['data']; 
    maxClients = result.length;
    console.log("result: ", result, "Max Result: ", maxClients);
    loading = false;
    console.log(loading);
    return result;
} 

function mensagem(){
    return(<AlertApp
        title="Deseja Realmente Excluir o cliente?"
        variant="danger"
        message="Você está prestes a excluir o usuário da base de dados. Deseja realmente realizar essa operação?"
        onClickButtonOk= "null"
        onClickButtonCancel = "null"
    />);
}

const TableDataClient = ()=>{
    
    //state
    const [clientes, setClient] = useState([]);

    //criando lifecycle
    useEffect(()=>{
        if(!clientes.length){
            getAllClients().then(data=>{
                setClient(data);
                loading = false;
            });
        }
        
    }, [clientes, loading]);

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
                        loading == true?
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
                                clientes.map((data, index)=>
                                    <tr>
                                        <td key={Math.random()*10 + index+1}>{data.id}</td>
                                        <td key={Math.random()*10 + index+2}>{data.nome}</td>
                                        <td key={Math.random()*10 + index+3}>{data.email}</td>
                                        <td key={Math.random()*10 + index+4}>{data.fone}</td>
                                        <td key={Math.random()*10 + index+5}><a href="/editarcliente/${data.id}">Editar</a></td>
                                        <td key={Math.random()*10 + index+6}><p onClick={()=>mensagem()}>Excluir</p>
                                        </td>
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