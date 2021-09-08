import React from "react";
import CommentIcon from "../../common/icons/commentIcon/CommentIcon";
import Star from "../../common/icons/star/Star";
import dateConvert from "../../utils/dateConvert";
import styles from "./newsListItem.module.css";

const NewsListItem = ({ item, toNewsPage }) => {
    const { by, id, score, time, title, kids } = item;

    return (
        <div className={styles.item}>
            <div className={styles.title} onClick={() => toNewsPage(id)}>
                {title}
            </div>
            <div className={styles.rating}>
                <Star width={25} height={25} /> {score}
            </div>
            <div className={styles.author}>
                Автор: <span>{by}</span>
            </div>
            <div className={styles.kids}>{kids ? <CommentIcon width={25} height={25} color={"#fff"} /> : null}</div>
            <div className={styles.date}> {dateConvert(time)}</div>
        </div>
    );
};

export default NewsListItem;
