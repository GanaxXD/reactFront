import React, { Fragment } from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const NavBarApp = ()=>{
    return(
        <Fragment>
            <div margin-top = "5px">
                <Navbar expand="lg" bg="dark" variant="dark" className="mr-auto">
                    <Navbar.Brand href="/">CADASTRO DE CLIENTES E ORDENS DE SERVIÇO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto" >
                            <Nav.Link href="/clientes">Cadastrar Cliente</Nav.Link>
                            <Nav.Link href="/ordemservico">Cadastrar Ordem de Serviço</Nav.Link>
                            <Nav.Link href="/comentarios">Cadastrar Comentário</Nav.Link>
                            <Nav.Link href="/listaclientes">Listar Clientes</Nav.Link>
                            <Nav.Link href="listaordens">Listar Ordens de Serviço</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </Fragment>
    );

}

export default NavBarApp;