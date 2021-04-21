import React, { Fragment } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const NavBarApp = ()=>{
    return(
        <Fragment>
            {/* <div margin-top = "5px"> */}
                <Navbar collapseOnSelect expand="lg" bg="dark"  variant ="dark"  className="mr-auto">
                    <Navbar.Brand href="/">CADASTRO DE CLIENTES E ORDENS DE SERVIÇO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto" >
                            <Nav.Link as={Link} to="/clientes">Cadastrar Cliente</Nav.Link>
                            <Nav.Link as={Link} to="/ordemservico">Cadastrar Ordem de Serviço</Nav.Link>
                            <Nav.Link as={Link} to="/comentarios">Cadastrar Comentário</Nav.Link>
                            <Nav.Link as={Link} to="/listaclientes">Listar Clientes</Nav.Link>
                            <Nav.Link as={Link} to="/listaordens">Listar Ordens de Serviço</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            {/* </div> */}
        </Fragment>
    );

}

export default NavBarApp;