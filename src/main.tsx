import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App.tsx';
import { Provider } from './context/Provider.tsx';
import reducer, { initialState } from './context/reducer.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider initialState={initialState} reducer={reducer}>
            <App />
        </Provider>
    </React.StrictMode>
);
