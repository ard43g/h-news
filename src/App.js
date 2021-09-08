import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import styles from "./app.module.css";
import MainPage from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";

function App() {
    const history = useHistory();

    const toMainPage = () => {
        if (history.location.pathname !== "/") {
            history.push("/");
        }
    };

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <span onClick={toMainPage}>Hacker News API</span>
            </header>
            <div className={styles.container}>
                <Switch>
                    <Route path="/:id" component={NewsPage} exact />
                    <Route path="/" component={MainPage} exact />
                </Switch>
            </div>
        </div>
    );
}

export default App;
