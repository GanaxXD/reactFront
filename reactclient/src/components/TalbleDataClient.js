import React, { Fragment } from 'react';
import {Table, Card} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import {Link} from 'react-router-dom';

const TableDataClient = (props)=>{
    
    const n=[
        {
            id:"1",
            nome: "Pedro",
            email: "p@gmail.com",
            telefone: "98 999-5688"
        },
        {
            id:"2",
            nome: "Guilherme",
            email: "g@gmail.com",
            telefone: "98 659-5688"
        }
    ]
    
    return(
        <Fragment>
            <br/>
            <Card className="cardAppCustomized">
                <Card.Title className="cardTitle">Clientes Cadastrados</Card.Title>
                <Card.Body>
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
                                n.map((data)=>
                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.nome}</td>
                                        <td>{data.email}</td>
                                        <td>{data.telefone}</td>
                                        <td><a as={Link} to="/editarcliente/${data.id}">Editar</a></td>
                                        <td><a as={Link} to="/editarcliente/${data.id}">Excluir</a></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
             {/* Footer */}
             <hr/>
            <ButtonHome variant="outline-dark" link="/" title="Voltar Para a Página Inicial"/>
        </Fragment>
    );
}

export default TableDataClient;