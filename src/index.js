import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from "react-router-dom";
import App from './App';
import "./index.css";

// Redux
import store from './redux/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <MemoryRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </MemoryRouter>);