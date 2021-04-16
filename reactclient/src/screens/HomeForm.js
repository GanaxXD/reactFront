import React, { useEffect, useState } from 'react';
import ButtonHome from '../components/ButtonHome';
import NavBar from '../components/NavBarApp';
import {Card, InputGroup, FormControl} from 'react-bootstrap';
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
        <form>
            {/* Cabeçalho */}
            <NavBar/>
            <h1 className="hcabecalho" defaultValue={dataPage.pageTitle}></h1>
            
            {/* Formulário */}
            <Card className="text-center, cardClient">
                <Card.Body>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend >
                                <InputGroup.Text id="basic-addon1" >@</InputGroup.Text>
                                <FormControl className="cardClientInput"
                                    placeholder="e-mail"
                                    arial-label="e-mail"
                                    aerial-describedby="basic-addon1"
                                />
                            </InputGroup.Prepend>
                        </InputGroup>
                    </div>
                </Card.Body>
            </Card>


            {/* Footer */}
            <hr/>
            <ButtonHome/>
        </form>
    );
}

export default HomeForm;