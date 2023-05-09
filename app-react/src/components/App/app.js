// == Import : package
import React, { useEffect, useContext, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import { ClientApi } from "../../lib/clientApi.server.ts";

// == Import : components
import Header from "../Header/header";
import Home from "../Home/home";
import GoalDetails from "../GoalDetails/goalDetails";

// == Import : local
import { GoalsDataContext } from "../../context/goalsDataContext";

// == Import : style
import "./app.scss";

const App = () => {
    const { setGoalsData } = useContext(GoalsDataContext);

    const getGoalsList = useCallback(async () => {
        try {
            const response = await ClientApi.get('/todo');
            console.log('response :', response);
            if (response.status === 200) {
                setGoalsData(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }, [setGoalsData]);

    useEffect(() => {
        getGoalsList();
    }, [getGoalsList]);

    return (
        <div className="app">
            <Header />
            <main>
                <Switch>
                    <Route path={"/"} component={Home} exact />
                    <Route path={"/:goalname"} component={GoalDetails} exact />
                </Switch>
            </main>
        </div>
    );
};

export default App;
