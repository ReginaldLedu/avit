import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../index.module.css";
import { Link } from "react-router-dom";
import { closeCommentBox } from "../store/slice";
import { addComment /*refreshTokens*/ } from "../api/requests";
import { data } from "../helpers/helper";

export default function Comment() {
  const [userComment, setUserComment] = useState("");
  const tokens = useSelector((state) => state.avitProUser.tokens);
  const chosenProduct = useSelector(
    (state) => state.avitProToolkit.currentPost
  );
  const updateUserComment = (value) => {
    setUserComment(value);
  };
  const dispatch = useDispatch();
  function closeComments() {
    dispatch(closeCommentBox());
  }
  const commentsFromAPI = useSelector((state) => state.avitProToolkit.comments);
  console.log(commentsFromAPI);
  const user = useSelector((state) => state.avitProUser.user);
  return (
    <section className={styles.comments}>
      <header className={styles.header_mob}>
        <Link to="/">
          <div className={styles.mobile__logo}>
            <div className={styles.mobile__img}></div>
          </div>
        </Link>
      </header>
      <div className={styles.comments__wrapper}>
        <div className={styles.comment__titleWrapper}>
          <div onClick={closeComments} className={styles.comment__back}></div>
          <h2 className={styles.comments__title}>Отзывы о товаре</h2>
          <div onClick={closeComments} className={styles.comments__close}>
            <span className={styles.comments__close1}></span>
            <span className={styles.comments__close2}></span>
          </div>
        </div>
        {user.email !== "" ? (
          <>
            <label htmlFor="commentsText" className={styles.comments__label}>
              Добавить отзыв
            </label>
            <textarea
              onChange={(e) => updateUserComment(e.target.value)}
              value={userComment}
              placeholder="Введите отзыв"
              name="description"
              id="commentsText"
              type="text"
              className={styles.commentsText}
            ></textarea>
            <button
              type="submit"
              onClick={(event) => {
                try {
                  event.target.setAttribute("disabled", " ");
                  /*refreshTokens(tokens.access_token, tokens.refresh_token); */
                  addComment(
                    chosenProduct.id,
                    userComment,
                    tokens.access_token
                  );
                } catch (error) {
                  console.log(error.message);
                } finally {
                  closeComments();
                }
              }}
              className={styles.comments__submit}
            >
              Опубликовать
            </button>
          </>
        ) : (
          " "
        )}

        <div className={styles.comments__published}>
          {commentsFromAPI.length > 0
            ? commentsFromAPI.map((item) => (
                <div className={styles.comment} key={item.id}>
                  {item.author.avatar !== null ? (
                    <img
                      src={`http://localhost:8090/${item.author.avatar}`}
                      alt="userImg"
                      className={styles.comment__photo}
                    />
                  ) : (
                    <p className={styles.comment__noAvatar}></p>
                  )}

                  <div className={styles.comment__text}>
                    <h3 className={styles.comment__userName}>
                      {item.author.name}
                    </h3>
                    <span className={styles.comment__date}>
                      {data(item.created_on)}
                    </span>

                    <p className={styles.comment__title}>Комментарий</p>
                    <p className={styles.comment__userText}>{item.text}</p>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </section>
  );
}
