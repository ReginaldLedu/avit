import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { data } from "../helpers/helper";
import Header from "../components/Header";
import Comment from "../components/Comment";
import CommentButton from "../components/CommentButton";
import styles from "../index.module.css";
import { getComments } from "../store/slice";
import ShowPhoneButton from "../components/ShowPhoneButton";
import Footer from "../components/Footer";
import SliderForCurrentIPost from "../components/SliderForCurrentIPost";

export default function CurrentPost() {
  const dispatch = useDispatch();
  const chosenProduct = useSelector(
    (state) => state.avitProToolkit.currentPost
  );
  const id = chosenProduct.id;
  const url = `http://localhost:8090/ads/${id}/comments`;

  useEffect(() => {
    axios
      .get(url, {
        params: {
          page: [],
        },
      })
      .then((resp) => {
        const commentsForPost = resp.data;
        dispatch(getComments(commentsForPost));
        console.log(commentsForPost);
      });
  }, []);
  const showComment = useSelector(
    (state) => state.avitProToolkit.commentSwitchOn
  );

  console.log(chosenProduct);
  return (
    <>
      {showComment === true ? <Comment /> : ""}
      {chosenProduct.title !== undefined ? (
        <>
          <Header />
          <div className={styles.profile__wrapper}>
            <div className={styles.backToMain__box}>
              <div className={styles.logo}></div>
              <Link to="/">
                <button className={styles.backToMain__button}>
                  Вернуться на главную
                </button>
              </Link>
            </div>
            <main className={styles.main}>
              <div className={styles.itemPage__wrapper}>
                <SliderForCurrentIPost />

                <div className={styles.itemPage__text}>
                  <h3 className={styles.itemPage__title}>
                    {chosenProduct.title}
                  </h3>
                  <p className={styles.itemPage__time}>
                    {data(chosenProduct.created_on)}
                  </p>
                  <p className={styles.itemPage__city}>
                    {chosenProduct.user.city}
                  </p>
                  <CommentButton />
                  <p className={styles.itemPage__price}>
                    {chosenProduct.price}
                  </p>
                  <ShowPhoneButton />
                  <div className={styles.itemPage__seller}>
                    {chosenProduct.user.avatar !== null ? (
                      <img
                        src={`http://localhost:8090/${chosenProduct.user.avatar}`}
                        alt="No user avatar"
                        className={styles.seller__pic}
                      />
                    ) : (
                      " "
                    )}

                    <div className={styles.seller__box}>
                      <Link
                        className={styles.itemPage__seller_name}
                        to="/sellerprofile"
                      >
                        <p className={styles.itemPage__seller_name}>
                          {chosenProduct.user.name}
                        </p>
                      </Link>
                      <p className={styles.itemPage__seller_date}>
                        Продает товары с августа 2021
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.itemDescription}>
                <h3 className={styles.itemDescription__title}>
                  Описание товара
                </h3>
                <p className={styles.itemDescription__text}>
                  {chosenProduct.description}
                </p>
              </div>
            </main>
          </div>
          <Footer />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
