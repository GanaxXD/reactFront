import React, { useEffect, useState } from 'react';
import ButtonHome from '../components/ButtonHome';
import NavBarApp from '../components/NavBarApp';
import {Card, InputGroup, FormControl, Col, Row, Container} from 'react-bootstrap';
import './css/style.css';

const initialState={
    pageTitle:'Cadastro de Clientes',
}


const HomeForm = (props) =>{

    const [dataPage, setDataPage] = useState(initialState);

    useEffect(()=>{
        setDataPage(dataPage)
    });

    return(
        <form align="center">
            {/* Cabeçalho */}
            <NavBarApp/>
            <h1 className="hcabecalho" defaultValue={dataPage.pageTitle}></h1>
            
            {/* Formulário */}
            <Container fluid="xl" >
                <Card className="cardAppCustomized">
                    <Card.Header>Seja Bem Vindo!</Card.Header>
                    <Card.Body>
                        <Card.Title>Cadastre Clientes e suas Ordens de Serviço</Card.Title>
                        <Card.Text>
                            O presente projeto visa demonstrar a utilização de uma API criada
                            usando o SpringBoot com o Java.
                            A API fornece serviços como Cadastro de um Cliente, Cadastro de uma
                            Ordem de Serviço, Cadastro de um comentário para uma Ordem de Serviço
                            já cadastrada, além das operações básicas de um CRUD (Create, Read,
                             Update e Delete) para as entidades presentes na API.

                            A API está disponível em um serviço de infraestrutura online, com 
                            limitações existentes pelo pacote gratuíto, usado no deploy
                            da referida API.

                            O Objetivo principal é demonstrar, além do consumo da API, os 
                            meus conheecimentos em react para montagem desta página.

                            Utilize o menu disposto no topo da página para utilizar os serviços
                            da API.
                            
                        </Card.Text>
                    </Card.Body>
                </Card>

            </Container>
        </form>
    );
}

export default HomeForm;