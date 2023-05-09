// == Import : package
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import replaceAllInserter from 'string.prototype.replaceall';
replaceAllInserter.shim();

// == Import : components
import GoalItem from "../components/Home/GoalItem/goalItem";

describe('GoalItem component', () => {
    test('renders input checkbox', () => {
        const goalData = {
            id: 123,
            title: 'test test',
            description: 'test',
            active: true
        };
        const handleOnChangeInputCheckbox = jest.fn();
        render(
            <Router>
                <GoalItem goalData={goalData} handleOnChangeInputCheckbox={handleOnChangeInputCheckbox} />
            </Router>
        );
        const goalItemInputCheckboxElement = screen.getByRole("checkbox");
        expect(goalItemInputCheckboxElement).toBeInTheDocument();
    });
    test('renders link', () => {
        const goalData = {
            id: 123,
            title: 'test test',
            description: 'test',
            active: true
        };
        const handleOnChangeInputCheckbox = jest.fn();
        render(
            <Router>
                <GoalItem goalData={goalData} handleOnChangeInputCheckbox={handleOnChangeInputCheckbox} />
            </Router>
        );
        const goalItemLinkElement = screen.getByRole("link");
        expect(goalItemLinkElement).toBeInTheDocument();
    })
});
