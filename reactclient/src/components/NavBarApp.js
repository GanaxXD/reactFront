import {Navbar} from 'react-bootstrap';

const NavBarApp = () =>{
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">CADASTRO DE CLIENTES E ORDENS DE SERVIÇO</Navbar.Brand>
            <Navbar.Toggle arial-controls="basic-navbar-nav">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#">Cadastrar Clientes</Nav.Link>
                        <Nav.Link href="#">Cadastrar Ordem de Serviço</Nav.Link>
                        <Nav.Link href="#">Cadastrar Comentário</Nav.Link>
                        <Nav.Link href="#">Listar Clientes</Nav.Link>
                        <Nav.Link href="#">Listar Ordens de Serviço</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar.Toggle>
        </Navbar>
    );
}

export default NavBarApp;