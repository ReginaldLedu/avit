import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../index.module.css";
import { addComment } from "../store/slice";

export default function CommentButton() {
  const commentsFromAPI = useSelector((state) => state.avitProToolkit.comments);
  const dispatch = useDispatch();
  const showCommentBox = () => {
    dispatch(addComment());
  };
  return (
    <>
      {commentsFromAPI.length.toString().endsWith("2") ||
      commentsFromAPI.length.toString().endsWith("3") ||
      commentsFromAPI.length.toString().endsWith("4") ? (
        <p
          onClick={() => showCommentBox()}
          className={styles.itemPage__feedback}
        >
          {commentsFromAPI.length} отзыва
        </p>
      ) : (
        <p
          onClick={() => showCommentBox()}
          className={styles.itemPage__feedback}
        >
          {commentsFromAPI.length} отзывов
        </p>
      )}
    </>
  );
}
