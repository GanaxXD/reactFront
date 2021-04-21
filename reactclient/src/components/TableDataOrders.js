import React, { Fragment } from 'react';
import {Table, Card} from 'react-bootstrap';
import ButtonHome from '../components/ButtonHome';
import {Link} from 'react-router-dom'; 

const TableDataOrders = (props)=>{
    
    const n=[
        {
            id:"1",
            cliente:{
               id:"2",
               nome: "Guilherme"
            },
            descricao: "Obtenção do coraçãozinho do Pedrinho",
            dataAbetura: "01/01/0001",
            dataFinalizacao: null,
            status: "SEMPRE aberta",
            coment_number:"0"
        },
        {
            id:"2",
            cliente:{
               id:"2",
               nome: "Guilherme"
            },
            descricao: "Contratação da maquiadora Marcela para o casamento de Pedrinho e Guizinho Paixão",
            dataAbetura: "02/01/0001",
            dataFinalizacao: null,
            status: "SEMPRE aberta",
            coment_number:"5"
        }
    ]
    
    return(
        <Fragment>
            <br/>
            <Card className="cardAppCustomized">
                <Card.Title className="cardTitle">Ordens de Serviços</Card.Title>
                <Card.Body>
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
                                n.map((data)=>
                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.cliente.nome}</td>
                                        <td>{data.descricao}</td>
                                        <td>{data.dataAbetura}</td>
                                        <td>{!data.dataFinalizacao?"--":data.dataFinalizacao}</td>
                                        <td>{data.status}</td>
                                        <td><a as={Link} to="/comentario/${data.id}">Comentários ({data.coment_number})</a></td>
                                        <td><a as={Link} to="/editarOrdem/${data.id}">Editar</a></td>  {/* as={Link} to ="rota-do-servico" para deixar a aplicação singlepage */}
                                        <td><a as={Link} to="/editarOrdem/${data.id}">Excluir</a></td>  {/* as={Link} to ="rota-do-servico" para deixar a aplicação singlepage */}
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

export default TableDataOrders;