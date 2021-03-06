import React from 'react'
import {BrowserRouter, Switch, Route, useParams} from 'react-router-dom';
import HomeForm from './screens/HomeForm';
import FormClient from './screens/FormClient';
import FormPageNotFound from './screens/FormPageNotFound';
import FormOrdemServico from './screens/FormOrdemServico';
import FormCadastrarComentarios from './screens/FormCadastrarComentarios';
import FormListarClientes from './screens/FormListarClientes';
import FormListarOrdens from './screens/FormListarOrdens';
import FormClientEdit from './screens/FormClientEdit';
import FormOrdemServicoEdit from './screens/FormOrdemServicoEdit';
import FormListarComentarios from './screens/FormListarComentarios';


const AppRoutes = ()=>(

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeForm}/>
            <Route exact path="/clientes" component={FormClient}/>
            <Route exact path="/ordemservico" component={FormOrdemServico}/>
            <Route exact path="/comentarios" component={FormCadastrarComentarios}/>
            <Route exact path="/listaclientes" component={FormListarClientes}/>
            <Route exact path="/listaordens" component={FormListarOrdens}/>
            <Route exact path="/editarcliente/:id" component={FormClientEdit}/>
            <Route exact path="/editarOrdem/:id" component={FormOrdemServicoEdit}/>
            <Route exact path="/comentario/:id" component={FormListarComentarios}/>
            
            <Route component={FormPageNotFound}/>
        </Switch>
    </BrowserRouter>
)

export default AppRoutes;