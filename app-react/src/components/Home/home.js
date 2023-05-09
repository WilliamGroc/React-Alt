// == Import : package
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// == Import : components
import GoalItem from "./GoalItem/goalItem";
import SpinnerLoader from "../SpinnerLoader/spinnerLoader";
import Modal from "../Modal/modal";

// == Import : local
import { GoalsDataContext } from "../../context/goalsDataContext";
import useModal from "../../hooks/useModal";

// == Import : style
import "./home.scss";

/**
 * Displays the list of goals.
 * @returns {JSX.Element}
 */
const Home = () => {
    const { goalsData, setGoalsData } = useContext(GoalsDataContext);
    const [displaySpinnerLoader, setDisplaySpinnerLoader] = useState(false);
    const [goalsToDisplay, setGoalsToDisplay] = useState([]);
    const { isShowing, toggle } = useModal();

    useEffect(() => {
        if (goalsData.length > 0) {
            const goalsActiveSortByNewest = goalsData.filter(goal => goal.checked).sort((a, b) => b.id - a.id);
            const goalsInactiveSortByNewest = goalsData.filter(goal => !goal.checked).sort((a, b) => b.id - a.id);
            setGoalsToDisplay([...goalsActiveSortByNewest, ...goalsInactiveSortByNewest]);
            setDisplaySpinnerLoader(false);
        } else {
            setDisplaySpinnerLoader(true);
        }
    }, [goalsData]);

    const handleOnChangeInputCheckbox = async (id, active) => {
        const response = await axios.put(
            `${process.env.REACT_APP_API_URL}api/goals/updategoal`,
            { id, active },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            }
        );
        if (response.status === 200) {
            setGoalsData(response.data);
        }
    };

    const handleOnRemoveGoal = async (id) => {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}api/goals/removegoal/${id}`);
        if (response.status === 202) {
            setGoalsData(response.data);
        }
    };

    return (
        <div className="home">
            <div className="home_header">
                <h2 className="home_header_title">Mes Objectifs</h2>
                <button className="home_header_addGoalButton" onClick={toggle}>
                    <FontAwesomeIcon className="home_header_addGoalButton_icon" icon={faPlus} />
                </button>
            </div>
            {displaySpinnerLoader && <SpinnerLoader classWidthAndHeight={"home_spinner-loader"} />}
            {!displaySpinnerLoader && <ul className="home_body">
                {goalsToDisplay.map(goal => <GoalItem
                    key={goal.id}
                    goalData={goal}
                    handleOnChangeInputCheckbox={handleOnChangeInputCheckbox}
                    handleOnRemoveGoal={handleOnRemoveGoal}
                />)}
            </ul>}
            {isShowing && <Modal hide={toggle} />}
        </div>
    );
};

export default Home;
