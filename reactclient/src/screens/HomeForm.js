import React, { useEffect, useState } from 'react';
import NavBarApp from '../components/NavBarApp';
import {Card, Container} from 'react-bootstrap';
import './css/style.css';

const initialState={
    pageTitle:'Home',
}


const HomeForm = (props) =>{

    const [dataPage, setDataPage] = useState(initialState);

    // useEffect(()=>{
    //     setDataPage(dataPage)
    // }, []);

    return(
        <div align="center">
            {/* Cabeçalho */}
            <NavBarApp/>
            <h1 className="hcabecalho" defaultValue={dataPage.pageTitle}></h1>
            
            {/* Formulário */}
            <Container fluid="xl" >
                <Card className="cardAppCustomized" bg="light" border="secondary">
                    <Card.Header>Seja Bem Vindo!</Card.Header>
                    <Card.Body>
                        <Card.Title>Cadastre Clientes e suas Ordens de Serviço</Card.Title>
                        <Card.Text>
                            O presente projeto visa demonstrar a utilização de uma API criada
                            usando o <i>SpringBoot</i> com o Java.
                            A API fornece serviços como <b>Cadastro de um Cliente</b>, <b>Cadastro de uma
                            Ordem de Serviço</b>, <b>Cadastro de um comentário</b> para uma Ordem de Serviço
                            já cadastrada, além das operações básicas de um <b>CRUD (Create, Read,
                             Update e Delete)</b> para as entidades presentes na API.

                            A API está disponível em um serviço de infraestrutura <i>online</i>, com 
                            limitações existentes pelo pacote gratuíto, usado no <i>deploy</i>
                            da referida API.

                            O Objetivo principal é demonstrar os conhecimentos em react para montagem desta página.

                            Utilize o <i>menu</i> disposto no topo da página para utilizar os serviços
                            da API.
                            
                        </Card.Text>
                    </Card.Body>
                </Card>

            </Container>
        </div>
    );
}

export default HomeForm;