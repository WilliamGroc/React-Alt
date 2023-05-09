// == Import : package
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// == Import : components
import App from "./components/App/app";

// == Import : local
import { GoalsDataProvider } from "./context/goalsDataContext";

// == Import : style
import './styles/index.scss';

const rootReactElement = (
    <React.StrictMode>
        <Router>
            <GoalsDataProvider>
                <App />
            </GoalsDataProvider>
        </Router>
    </React.StrictMode>
);
const target = document.getElementById('root');

render(rootReactElement, target);
