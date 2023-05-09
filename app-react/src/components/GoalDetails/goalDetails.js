// == Import : package
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

// == Import : style
import "./goalDetails.scss";

/**
 * Displays the details of a goal.
 * @returns {JSX.Element}
 */
const GoalDetails = () => {
    const location = useLocation();
    const history = useHistory();
    const [goalData, setGoalData] = useState({});
    const [dateFormatted, setDateFormatted] = useState('');

    useEffect(() => {
        if (location.state && location.state.goalData) {
            const date = new Date(location.state.goalData.id);
            setDateFormatted(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear());
            setGoalData(location.state.goalData);
        } else {
            history.push("/");
        }
    }, [location.state, history]);

    return (
        <div className="goalDetails">
            <h2 className="goalDetails_header">{goalData.title}</h2>
            <div className="goalDetails_body">
                <p>{goalData.description}</p>
            </div>
            <div className="goalDetails_footer">
                <p>Ajouté le : <span>{goalData.updateDate}</span></p>
                <p>Statut : <span>{goalData.checked ? "En cours" : "Terminé"}</span></p>
            </div>
        </div>
    );
};

export default GoalDetails;
