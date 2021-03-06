import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import store from './redux/store';
import Login_usuario from './components/login_usuario';
import Login_cliente from './components/login_cliente';
import Carta from './components/carta';
//import Dashboard from './components/inicio_usuario';
//import Reporte from './components/inicio_usuario/reporte';
import Dashboard_usuario from './components/inicio_usuario';
import './index.css';
  
const Root = () =>{
    return (
    <Provider store={store}>
    <BrowserRouter>
    <Switch>
        <Route path="/login/usuario" component={Login_usuario}/>
        <Route path="/login/cliente" component={Login_cliente}/>
        <Route path="/inicio/usuario" component={Dashboard_usuario}/>
        <Route path="/inicio/cliente/carta" component={Carta}/>
        <Redirect from="/" to="/login/cliente"/>
    </Switch>
    </BrowserRouter>
    </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));