// == Import : package
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// == Import : components
import GoalDetails from "../components/GoalDetails/goalDetails";

describe('GoalDetails component', () => {
    test('renders title', () => {
        const goalData = {
            id: 123,
            title: 'test test',
            description: 'test',
            active: true
        };
        render(
            <MemoryRouter initialEntries={[{ pathname: '/nomobjectif', state: { goalData } }]}>
                <GoalDetails />
            </MemoryRouter>
        );
        const goalDetailsH2Element = screen.getByRole("heading", { level: 2 });
        expect(goalDetailsH2Element).toBeInTheDocument();
    });
    test('renders date', () => {
        const goalData = {
            id: 123,
            title: 'test test',
            description: 'test',
            active: true
        };
        render(
            <MemoryRouter initialEntries={[{ pathname: '/nomobjectif', state: { goalData } }]}>
                <GoalDetails />
            </MemoryRouter>
        );
        const goalDetailsDateElement = screen.getByText('Ajouté le', { exact: false });
        expect(goalDetailsDateElement).toBeInTheDocument();
    });
    test('renders status', () => {
        const goalData = {
            id: 123,
            title: 'test test',
            description: 'test',
            active: true
        };
        render(
            <MemoryRouter initialEntries={[{ pathname: '/nomobjectif', state: { goalData } }]}>
                <GoalDetails />
            </MemoryRouter>
        );
        const goalDetailsDateElement = screen.getByText('Statut', { exact: false });
        expect(goalDetailsDateElement).toBeInTheDocument();
    });
});
