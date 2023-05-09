// == Import : package
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// == Import : components
import Header from "../components/Header/header";

test('renders Header title', () => {
    render(
        <Router>
            <Header />
        </Router>
    );
    const headerTitleElement = screen.getByText("Ma TodoList");
    expect(headerTitleElement).toBeInTheDocument();
});
