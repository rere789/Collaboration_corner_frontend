import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {Provider } from 'react-redux';
import Store from './Store';
import App from './App';


ReactDOM.render(
<Provider store={Store} >
    <BrowserRouter>
        <App />
        <head> <link href="https://fonts.googleapis.com/css?family=Comfortaa&display=swap" rel="stylesheet"></link></head>
    </BrowserRouter>
</Provider>,
 document.getElementById('root'));

serviceWorker.unregister();
