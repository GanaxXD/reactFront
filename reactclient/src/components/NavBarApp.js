<<<<<<< HEAD
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
=======
import {Navbar} from 'react-bootstrap';

const NavBarApp = () =>{
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">CADASTRO DE CLIENTES E ORDENS DE SERVIÇO</Navbar.Brand>
            <Navbar.Toggle arial-controls="basic-navbar-nav">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#">Cadastrar Clientes</Nav.Link>
>>>>>>> 4153385b86d9987ecf42e0012e22577eb8c20d2d
                        <Nav.Link href="#">Cadastrar Ordem de Serviço</Nav.Link>
                        <Nav.Link href="#">Cadastrar Comentário</Nav.Link>
                        <Nav.Link href="#">Listar Clientes</Nav.Link>
                        <Nav.Link href="#">Listar Ordens de Serviço</Nav.Link>
                    </Nav>
<<<<<<< HEAD
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </Fragment>
=======
                </Navbar.Collapse>
            </Navbar.Toggle>
        </Navbar>
>>>>>>> 4153385b86d9987ecf42e0012e22577eb8c20d2d
    );
}

export default NavBarApp;