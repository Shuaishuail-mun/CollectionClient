import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from 'react-intl';
import messages_zh from "./translations/zh.json";
import messages_en from "./translations/en.json";
import {CookiesProvider} from "react-cookie";

const messages = {
    'zh': messages_zh,
    'en': messages_en
};
// const language = navigator.language.split(/[-_]/)[0];
const language = 'en';
ReactDOM.render(
    <CookiesProvider>
        <IntlProvider locale={language} key={language} messages={messages[language]}>
                <App />
        </IntlProvider>
    </CookiesProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
