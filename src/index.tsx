import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import messages_de from './messages/de.json';
import messages_en from './messages/en.json';

const messages = {
  de: messages_de,
  en: messages_en,
};

const language: string = navigator.language.split(/[-_]/)[0]; // language without region code
const messageList: Record<string, string> = messages.en;

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale={language} messages={messageList}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
