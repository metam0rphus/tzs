import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ErrorBoundary from './components/error-boundary/';

import PhrasesService from './services/phrases-service';

import PhrasesServiceContext from './contexts/phrases-service-context';
import store from './store';
import App from './components/app';
import './styles.css';

const phrasesService = new PhrasesService();

ReactDOM.render(<Provider store={store}>
    <ErrorBoundary>
        <PhrasesServiceContext.Provider value={phrasesService}>
            <App />
        </PhrasesServiceContext.Provider>
    </ErrorBoundary>
</Provider>, document.getElementById('root'));
