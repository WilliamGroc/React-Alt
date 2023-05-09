// == Import : package
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// == Import : components
import Modal from "../components/Modal/modal";
import { GoalsDataContext } from "../context/goalsDataContext";

describe('Modal component', () => {
    test('render title', () => {
        const goalsData = jest.fn();
        const setGoalsData = jest.fn();
        const hide = jest.fn();
        render(
            <GoalsDataContext.Provider value={{ goalsData,setGoalsData }}>
                <Modal hide={hide} />
            </GoalsDataContext.Provider>
        );
        const modalTitleElement = screen.getByText('Ajouter un objectif');
        expect(modalTitleElement).toBeInTheDocument();
    });
    test('render input', () => {
        const goalsData = jest.fn();
        const setGoalsData = jest.fn();
        const hide = jest.fn();
        render(
            <GoalsDataContext.Provider value={{ goalsData,setGoalsData }}>
                <Modal hide={hide} />
            </GoalsDataContext.Provider>
        );
        const modalInputElement = screen.getByRole("textbox", { name: "Titre" });
        expect(modalInputElement).toBeInTheDocument();
    });
    test('render textarea', () => {
        const goalsData = jest.fn();
        const setGoalsData = jest.fn();
        const hide = jest.fn();
        render(
            <GoalsDataContext.Provider value={{ goalsData,setGoalsData }}>
                <Modal hide={hide} />
            </GoalsDataContext.Provider>
        );
        const modalTextareaElement = screen.getByRole("textbox", { name: "Description" });
        expect(modalTextareaElement).toBeInTheDocument();
    });
    test('render submit button', () => {
        const goalsData = jest.fn();
        const setGoalsData = jest.fn();
        const hide = jest.fn();
        render(
            <GoalsDataContext.Provider value={{ goalsData,setGoalsData }}>
                <Modal hide={hide} />
            </GoalsDataContext.Provider>
        );
        const modalSubmitButtonElement = screen.getByRole("button", { name: "Valider" });
        expect(modalSubmitButtonElement).toBeInTheDocument();
    });
});
