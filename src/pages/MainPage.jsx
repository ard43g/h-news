import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./mainPage.module.css";
import NewsListItem from "../components/newsListItem/NewsListItem";
import {
    setActiveNewsId,
    fetchNewStoriesList,
    fetchUpdateNewStories,
    fetchNews,
    setLastNews,
} from "../store/actions/actions";
import Update from "../common/icons/update/Update";
import Spinner from "../common/spinner/Spinner";

const MainPage = ({
    newStoriesList,
    news,

    fetchNewStoriesList,
    fetchNews,
    lastNews,
    setLastNews,
    fetchUpdateNewStories,
    setActiveNewsId,

    loading,
}) => {
    const history = useHistory();
    const intervalRef = useRef();

    const [update, setUpdate] = useState(false);

    const toNewsPage = (id) => {
        setActiveNewsId(id);
        history.push("/" + id);
    };

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        const update = setInterval(() => {
            setUpdate(true);
        }, 60000);
        intervalRef.current = update;
        return () => clearInterval(update);
    }, [update]);

    useEffect(() => {
        fetchNewStoriesList();
    }, []);
    useEffect(() => {
        if (update) {
            fetchNewStoriesList();
            setUpdate(false);
        }
    }, [update]);
    useEffect(() => {
        if (!lastNews && news && newStoriesList) {
            setLastNews(newStoriesList[0]);
        }
    }, [lastNews, news]);
    useEffect(() => {
        if (!news.length && newStoriesList.length) {
            fetchNews(newStoriesList);
        }
    }, [newStoriesList]);

    useEffect(() => {
        if (newStoriesList.length && lastNews && lastNews !== newStoriesList[0]) {
            const different = [];
            for (let index = 0; index < newStoriesList.length; index++) {
                if (lastNews !== newStoriesList[index]) {
                    different.push(newStoriesList[index]);
                } else {
                    index = newStoriesList.length;
                }
            }
            setLastNews(newStoriesList[0]);
            fetchUpdateNewStories(different);
        }
    }, [newStoriesList, lastNews]);

    function onClickUpdate() {
        setUpdate(true);
    }
    if (loading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }
    return (
        <main className={styles.main}>
            {news && (
                <>
                    <Update width={30} height={30} color={"#fff"} onClick={() => onClickUpdate()} />
                    {news.map((i) => (i ? <NewsListItem key={i.id} item={i} toNewsPage={toNewsPage} /> : null))}
                </>
            )}
        </main>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        news: state.news,
        newStoriesList: state.newStoriesList,
        lastNews: state.lastNews,
    };
};

const mapDispatchToProps = {
    setActiveNewsId,
    fetchNewStoriesList,
    fetchNews,
    setLastNews,
    fetchUpdateNewStories,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
