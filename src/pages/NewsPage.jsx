import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getComment } from "../api";
import Star from "../common/icons/star/Star";
import styles from "./newsPage.module.css";
import { fetchActiveNewsPage, setActiveNewsBody, setActiveNewsId } from "../store/actions/actions";
import CommentItem from "../components/comment/CommentItem";
import Spinner from "../common/spinner/Spinner";
import Update from "../common/icons/update/Update";
import CommentIcon from "../common/icons/commentIcon/CommentIcon";

const NewsPage = () => {
    const params = useParams();
    const { activeNewsId, activeNewsBody } = useSelector(({ activeNewsId, activeNewsBody }) => {
        return {
            activeNewsId,
            activeNewsBody,
        };
    });

    const dispatch = useDispatch();
    const intervalRef = useRef();

    const [comment, setComment] = useState([]);
    const [update, setUpdate] = useState(false);
    const [activeNews, setActiveNews] = useState(null);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        const update = setInterval(() => {
            setUpdate(true);
        }, 30000000);
        intervalRef.current = update;
        return () => clearInterval(update);
    }, [update]);

    useEffect(() => {
        if (params.id && !activeNewsId) {
            dispatch(setActiveNewsId(params.id));
            dispatch(fetchActiveNewsPage(params.id));
        }
        if (activeNewsId && !activeNewsBody) {
            dispatch(fetchActiveNewsPage(activeNewsId));
        }
        return () => {
            dispatch(setActiveNewsId(null));
            dispatch(setActiveNewsBody(null));
        };
    }, []);

    useEffect(() => {
        if (activeNews && activeNews.kids) {
            activeNews.kids.forEach((i) =>
                getComment(i)
                    .then((res) => res.json())
                    .then((res) =>
                        setComment((comment) => {
                            return [...comment, res];
                        })
                    )
            );
        }
    }, [activeNews]);

    useEffect(() => {
        if (activeNewsBody && !activeNews) {
            setActiveNews(activeNewsBody);
        }
    }, [activeNewsBody]);

    useEffect(() => {
        if (update) {
            dispatch(fetchActiveNewsPage(activeNewsId));
            setComment([]);
            setActiveNews(null);
            setUpdate(false);
        }
    }, [update]);

    function onUpdate() {
        setUpdate(true);
    }

    if (!activeNews) {
        return <Spinner />;
    }

    const { by, descendants, score, time, title, url, kids } = activeNews;

    return (
        activeNews && (
            <main className={styles.page}>
                <div className={styles.wrapper}>
                    <div className={styles.head}>
                        <div className={styles.date}>
                            Дата публикации : {new Date(time * 1000).toLocaleString("en-GB")}
                        </div>
                        <Star height={40} width={40} color={"#00DBDE"} />
                        <div className={styles.rating}>{score}</div>
                        <Update width={35} height={35} onClick={onUpdate} />
                    </div>
                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                    <div className={styles.link}>
                        <a href={url} target="_blank" rel="noreferrer">
                            Смотреть в источнике
                        </a>
                    </div>
                    <div className={styles.author}>
                        Автор: <span>{by}</span>
                    </div>
                    <div className={styles.count}>
                        <span>{descendants ? descendants : kids?.length || 0}</span>
                        <CommentIcon width={25} height={25} color={"#eee"} />
                    </div>

                    {comment && comment.map((i) => i && <CommentItem key={i.id} comments={i} />)}
                </div>
            </main>
        )
    );
};

export default NewsPage;
