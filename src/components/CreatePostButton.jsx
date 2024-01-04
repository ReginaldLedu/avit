import React from "react";
import styles from "../index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/slice";
import CreatePost from "./CreatePost";

export default function CreatePostButton() {
  const createPostSwitcher = useSelector(
    (state) => state.avitProToolkit.addPostSwitchOn
  );
  const dispatch = useDispatch();
  const showCreatePostForm = () => {
    dispatch(addPost());
  };
  return (
    <>
      <div onClick={showCreatePostForm} className={styles.create__post}>
        Разместить объявление
      </div>
      {createPostSwitcher === true ? <CreatePost /> : " "}
    </>
  );
}
