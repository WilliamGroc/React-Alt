// == Import : package
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// == Import : components
import Home from "../components/Home/home";
import { GoalsDataContext } from "../context/goalsDataContext";

describe('Home component', () => {
    test('renders title', () => {
        const goalsData = jest.fn();
        const setGoalsData = jest.fn();
        render(
            <Router>
                <GoalsDataContext.Provider value={{ goalsData,setGoalsData }}>
                    <Home />
                </GoalsDataContext.Provider>
            </Router>
        );
        const homeTitleElement = screen.getByText("Mes Objectifs");
        expect(homeTitleElement).toBeInTheDocument();
    });

    test('renders modal button', () => {
        const goalsData = jest.fn();
        const setGoalsData = jest.fn();
        render(
            <Router>
                <GoalsDataContext.Provider value={{ goalsData,setGoalsData }}>
                    <Home />
                </GoalsDataContext.Provider>
            </Router>
        );
        const homeModalButtonElement = screen.getByRole("button");
        expect(homeModalButtonElement).toBeInTheDocument();
    });
});
