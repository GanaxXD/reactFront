import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomeForm from './screens/HomeForm';
import FormClient from './screens/FormClient';
import FormPageNotFound from './screens/FormPageNotFound';


const AppRoutes = ()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomeForm}/>
            <Route exact path="/clientes" component={FormClient}/>

            <Route component={FormPageNotFound}/>
        </Switch>
    </BrowserRouter>
)

export default AppRoutes;