// == Import : package
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

// == Import : local
import './goalItem.scss';

/**
 * Displays the details of a goal.
 * @param goalData - An object containing information about the goal.
 * @param handleOnChangeInputCheckbox - A function that handle the "onChange" event on input checkbox
 * @param handleOnRemoveGoal - A function that handle the "onClick" event on the remove detail button
 * @returns {JSX.Element}
 */
const GoalItem = ({ goalData, handleOnChangeInputCheckbox, handleOnRemoveGoal }) => (
    <li className={`goalItem ${!goalData.checked ? 'done' : ''}`}>
        <div className={'goalItem_inputContainer'}>
            <input
                className={'goalItem_inputContainer_checkbox'}
                type={"checkbox"}
                checked={!goalData.checked}
                onChange={() => handleOnChangeInputCheckbox(goalData.id, !goalData.checked)}
            />
        </div>
        <Link
            to={{
                pathname: `/${goalData.title.replaceAll(" ", "-").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()}`,
                state: { goalData }
            }}
            className={`goalItem_titleContainer ${!goalData.checked ? 'done' : ''}`}
        >
            <p className={'goalItem_titleContainer_title'}>{goalData.title}</p>
        </Link>
        {!goalData.checked &&
            <button
                className={'goalItem_removeButton'}
                onClick={() => handleOnRemoveGoal(goalData.id)}
            >
                <FontAwesomeIcon className={'goalItem_removeButton_icon'} icon={faTrash} />
            </button>
        }
    </li>
);

GoalItem.propTypes = {
    goalData: PropTypes.object,
    handleOnChangeInputCheckbox: PropTypes.func,
    handleOnRemoveGoal: PropTypes.func
};

export default React.memo(GoalItem);
