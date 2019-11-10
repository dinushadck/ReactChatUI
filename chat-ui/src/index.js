import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/chat.css"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storeConfig from "./redux/storeConfig";
import { Provider as ReduxProvider } from "react-redux";

const store = storeConfig();

ReactDOM.render(
<ReduxProvider store={store}>
    <App />
</ReduxProvider>
, document.getElementById('root'));
