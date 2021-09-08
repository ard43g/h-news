import React, { useEffect, useRef, useState } from "react";
import { getComment } from "../../api";
import Arrow from "../../common/icons/arrow/Arrow";
import Update from "../../common/icons/update/Update";
import dateConvert from "../../utils/dateConvert";
import styles from "./commentItem.module.css";

const CommentItem = ({ comments }) => {
    const [showSubComment, setShowSubComment] = useState(false);
    const [subComment, setSubComment] = useState(null);
    const [update, setUpdate] = useState(false);

    const intervalRef = useRef();
    const { by, id, time, text, kids } = comments;

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
        if (comments && !subComment) {
            if (comments.kids) {
                fetchComment(comments);
            }
        }
    }, [showSubComment]);

    useEffect(() => {
        if (update) {
            updateComment(id);
            setUpdate(false);
        }
    }, [update]);

    async function updateComment(commentId) {
        const result = await getComment(commentId).then((response) => response.json());
        if (subComment && subComment[0].id !== result?.kids?.[0]) {
            fetchComment(result);
        }
    }

    function fetchComment(array) {
        let result = [];
        array.kids.forEach((i) => {
            getComment(i)
                .then((response) => response.json())

                .then((res) => result.push(res));
            setSubComment(result);
        });
    }

    function onUpdate() {
        setUpdate(true);
    }

    if (comments.deleted) {
        return (
            <div className={styles.comment}>
                <div className={styles.author}>
                    <span className={styles.date}> {dateConvert(time)}</span>
                    <div className={styles.text} style={{ textDecoration: "line-through" }}>
                        Комментарий удален
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.comment}>
            <div className={styles.author}>
                <Update width={16} height={16} onClick={onUpdate} />
                От <span>{by}</span>
                <span className={styles.date}> {dateConvert(time)}</span>
            </div>
            <div className={styles.text}>{text}</div>
            {kids && (
                <div className={styles.show}>
                    <Arrow width={20} height={20} color={"#3E88F3"} direction={!showSubComment ? "right" : "bottom"} />
                    {!showSubComment && (
                        <span onClick={() => (!showSubComment ? setShowSubComment(true) : null)}>Показать ответы</span>
                    )}
                </div>
            )}

            {showSubComment &&
                subComment &&
                subComment.map((i) => (!i.deleted ? <CommentItem key={i.id} comments={i} /> : null))}
        </div>
    );
};
export default CommentItem;
