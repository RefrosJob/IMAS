import React from 'react';
import './index.css';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import themes from './themes/schema.json';
import { setToLS } from './microservices/storage';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

setToLS('all-themes', themes);
const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
