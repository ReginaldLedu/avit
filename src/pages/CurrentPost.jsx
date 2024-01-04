import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { data } from "../helpers/helper";
import CreatePostButton from "../components/CreatePostButton";
import Comment from "../components/Comment";
import CommentButton from "../components/CommentButton";
import styles from "../index.module.css";
import { getComments } from "../store/slice";
import ShowPhoneButton from "../components/ShowPhoneButton";

export default function CurrentPost() {
  const allProductIMG = useSelector((state) => state.avitProToolkit.allPostIMG);
  console.log(allProductIMG);

  const dispatch = useDispatch();
  const chosenProduct = useSelector(
    (state) => state.avitProToolkit.currentPost
  );
  const id = chosenProduct.id;
  const url = `http://localhost:8090/ads/${id}/comments`;
  //const userFromRedux = useSelector((state) => state.avitProUser.user);
  //const userId = userFromRedux.id;
  const filteredImg = allProductIMG.filter(
    (item) => item.ad_id === chosenProduct.id
  );
  //const page = 1;

  useEffect(() => {
    axios
      .get("http://localhost:8090/comments", {
        params: {
          page: [],
        },
      })
      .then((resp) => {
        const allcomments = resp.data;
        // dispatch(getComments(allcomments));
        console.log(allcomments);
      });
  }, []);

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
          <header className={styles.header}>
            <div className={styles.mobile__logo}>
              <div className={styles.mobile__img}></div>
            </div>
            <CreatePostButton />
            <Link to="/profile">
              <div className={styles.profile__button}>Личный кабинет</div>
            </Link>
          </header>
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
                <div className={styles.itemPage__photo}>
                  <ul className={styles.itemPage__carousel}>
                    {filteredImg.length > 0 ? (
                      filteredImg.map((item) => (
                        <li className={styles.carousel__pic} key={item.id}>
                          <img
                            key={item.id}
                            src={`http://localhost:8090/${item.url}`}
                            alt="#"
                            className={styles.carousel__img}
                            //className={styles.itemPage__pic}
                          />
                        </li>
                      ))
                    ) : (
                      <p className={styles.itemPage__noIMG}>НЕТ ФОТО</p>
                    )}
                  </ul>
                </div>

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
                    <img src="#" alt="" className={styles.seller__pic} />
                    <div className={styles.seller__box}>
                      <Link to="/sellerprofile">
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
          <footer className={styles.mobile__footer}>
            <div className={styles.mobile__home}>
              <div className={styles.mobile__home_pic}></div>
            </div>
            <div className={styles.mobile__plus}>
              <div className={styles.mobile__plus_pic}></div>
            </div>
            <div className={styles.mobile__profile}>
              <div className={styles.mobile__profile_pic}></div>
            </div>
          </footer>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
