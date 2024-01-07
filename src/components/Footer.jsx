import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addPost, closeAddPost, closeCommentBox } from "../store/slice";
import styles from "../index.module.css";

export default function Footer() {
  const showComment = useSelector(
    (state) => state.avitProToolkit.commentSwitchOn
  );

  const dispatch = useDispatch();
  const createPostSwitch = () => {
    if (createPostSwitcher !== true) {
      dispatch(addPost());
    } else {
      dispatch(closeAddPost());
    }
  };
  const createPostSwitcher = useSelector(
    (state) => state.avitProToolkit.addPostSwitchOn
  );

  const closeCreateForm = () => {
    dispatch(closeAddPost());
    if (showComment === true) {
      dispatch(closeCommentBox());
    }
  };

  return (
    <footer className={styles.mobile__footer}>
      <Link to="/">
        <div onClick={closeCreateForm} className={styles.mobile__home}>
          <div className={styles.mobile__home_pic}></div>
        </div>
      </Link>
      <div onClick={createPostSwitch} className={styles.mobile__plus}>
        <div className={styles.mobile__plus_pic}></div>
      </div>
      <Link to="/profile">
        <div onClick={closeCreateForm} className={styles.mobile__profile}>
          <div className={styles.mobile__profile_pic}></div>
        </div>
      </Link>
    </footer>
  );
}
