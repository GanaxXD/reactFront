import React, { Fragment } from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const NavBarApp = ()=>{
    return(
        <Fragment>
            <div margin-top = "5px">
                <Navbar bg="dark" expand="lg" variant="dark" className="mr-auto">
                    <Navbar.Brand href="#" font-color="white">CADASTRO DE CLIENTES E ORDENS DE SERVIÇO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#cadastCliente">Cadastrar Cliente</Nav.Link>
                        <Nav.Link href="#">Cadastrar Ordem de Serviço</Nav.Link>
                        <Nav.Link href="#">Cadastrar Comentário</Nav.Link>
                        <Nav.Link href="#">Listar Clientes</Nav.Link>
                        <Nav.Link href="#">Listar Ordens de Serviço</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </Fragment>
    );
}

export default NavBarApp;