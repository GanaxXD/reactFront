import React, { Fragment, useEffect, useState } from 'react';
import {Table, Card} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import {Link} from 'react-router-dom';

async function getAllClients(){
    let data = await fetch('https://api-client-serviceorder.herokuapp.com/clientes');
    let result = data.json();
    return result;
}

const TableDataClient = (props)=>{
    
    // const n=[
    //     {
    //         id:"1",
    //         nome: "Pedro",
    //         email: "p@gmail.com",
    //         telefone: "98 999-5688"
    //     },
    //     {
    //         id:"2",
    //         nome: "Guilherme",
    //         email: "g@gmail.com",
    //         telefone: "98 659-5688"
    //     }
    // ]
    
    //state
    const [clientes, setClient]=useState([]);

    //criando lifecycle
    useEffect(()=>{
        getAllClients().then(data=>{
            setClient(data);
        })
    }, []);

    return(
        <Fragment>
            <br/>
            <Card className="cardAppCustomized">
                <Card.Title className="cardTitle">Clientes Cadastrados</Card.Title>
                <Card.Body>
                {
                        !clientes ? <h2>Carregando...</h2> :
                    
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
                                        <td><a as={Link} to="/editarcliente/${data.id}">Editar</a></td>
                                        <td><a as={Link} to="/editarcliente/${data.id}">Excluir</a></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    }
                </Card.Body>
            </Card>
             {/* Footer */}
             <hr/>
            <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
        </Fragment>
    );
}

export default TableDataClient;