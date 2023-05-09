// == Import : package
import { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import PropTypes from 'prop-types';

// == Import : components
import SpinnerLoader from "../SpinnerLoader/spinnerLoader";

// == Import : local
import { GoalsDataContext } from "../../context/goalsDataContext";

// == Import : style
import './modal.scss';

/**
 * Displays a modal for adding a goal.
 * @param hide - Function allowing to switch the value of a variable to display or not the modal, this function is defined in the "useModal" hook (toggle).
 */
const Modal = ({ hide }) => {
    const { setGoalsData } = useContext(GoalsDataContext);
    const [displayLoader, setDisplayLoader] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (displayErrorMessage && title.length !== 0) setDisplayErrorMessage(false);
    }, [displayErrorMessage, title]);

    const handleOnSubmitForm = async (e) => {
        e.preventDefault();

        if (title.length > 0) {
            setDisplayLoader(true);
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}api/goals/addgoal`,
                { title, description },
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
                }
            );
            if (response.status === 201) {
                const { goalsList } = response.data;
                setGoalsData(goalsList);
                setTitle('');
                setDescription('');
                setDisplayLoader(false);
                hide();
            } else {
                setDisplayLoader(false);
                setErrorMessage(response.data.message);
                setDisplayErrorMessage(true);
            }
        }
    };

    return ReactDOM.createPortal(
        <div className="modalOverlay">
            <div className="modalWrapper">
                <div className="modal">
                    <button
                        type="button"
                        className="modal_closeButton"
                        onClick={hide}
                    >
                        <span>&times;</span>
                    </button>
                    <div className="modal_header">
                        <h4>Ajouter un objectif</h4>
                    </div>
                    <div className="modal_body">
                        <form className={"modal_body_form"} onSubmit={handleOnSubmitForm}>
                            <div className={"modal_body_form_inputContainer"}>
                                <label htmlFor={"title"}>Titre</label>
                                <input
                                    placeholder={"Titre"}
                                    id={"title"}
                                    name={"title"}
                                    type={"text"}
                                    required={true}
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div className={"modal_body_form_inputContainer"}>
                                <label className={'notRequired'} htmlFor={"description"}>Description</label>
                                <textarea
                                    placeholder={"Description"}
                                    id={"description"}
                                    name={"description"}
                                    rows={3}
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <button
                                className={"modal_body_form_inputContainer_submitButton"}
                                type={"submit"}
                            >
                                {displayLoader
                                    ? <SpinnerLoader classWidthAndHeight={"modal_body_form_inputContainer_submitButton_spinnerLoader"} />
                                    : "Valider"
                                }
                            </button>
                            {displayErrorMessage &&
                                <div className={"modal_body_form_errorMessage"}>
                                    {errorMessage}
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

Modal.propTypes = {
    hide: PropTypes.func
};

export default Modal;
