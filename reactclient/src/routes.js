import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomeForm from './screens/HomeForm';
import FormClient from './screens/FormClient';

const AppRoutes = ()=>{
    <BrowserRouter>
        <Switch>
            <Route path="/" component={HomeForm}/>
            <Route path="/clientes" component={FormClient}/>
        </Switch>
    </BrowserRouter>
}

export default AppRoutes;