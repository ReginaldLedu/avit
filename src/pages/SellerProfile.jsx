import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../index.module.css";
import { dateForSeller } from "../helpers/helper";
import CreatePostButton from "../components/CreatePostButton";
import { getSellerPosts } from "../store/slice";
import { data } from "../helpers/helper";
import { getCurrentPost } from "../store/slice";
import PersonalPage from "../components/PersonalPage";

export default function SellerProfile() {
  const [chosenPost, setChosenPost] = useState(false);
  const updateChosenPost = () => {
    setChosenPost(true);
  };
  const dispatch = useDispatch();
  const chosenProduct = useSelector(
    (state) => state.avitProToolkit.currentPost
  );
  const [sellerPosts, setSellerPosts] = useState([]);
  const updateSellerPosts = (value) => {
    setSellerPosts(value);
  };
  useEffect(() => {
    async function getUserPosts(user_id) {
      let response = await fetch(
        `http://localhost:8090/ads?user_id=${user_id}&sorting=new&page=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);
      dispatch(getSellerPosts(result));
      updateSellerPosts(result);
    }
    getUserPosts(chosenProduct.user.id);
  }, []);
  const getPost = (id) => {
    const url = `http://localhost:8090/ads/${id}`;
    axios.get(url).then((resp) => {
      const currentPost = resp.data;
      dispatch(getCurrentPost(currentPost));
      updateChosenPost();
      console.log(currentPost);
    });
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.mobile__logo}>
          <div className={styles.mobile__img}></div>
        </div>
        <CreatePostButton />
        <PersonalPage />
      </header>
      <div className={styles.wrapper}>
        <div className={styles.backToMain__box}>
          <div className={styles.logo}></div>
          <Link to="/">
            <button className={styles.backToMain__button}>
              Вернуться на главную
            </button>
          </Link>
        </div>
        <main className={styles.main}>
          <h1 className={styles.seller__title}>Профиль продавца</h1>
          <div className={styles.seller__wrapper}>
            <div className={styles.seller__photo}>
              <img src="#" alt="" className={styles.settings__pic} />
            </div>
            <div className={styles.seller__text}>
              <p className={styles.seller__name}>{chosenProduct.user.name}</p>
              <p className={styles.seller__city}>{chosenProduct.user.city}</p>
              <p className={styles.seller__date}>
                {dateForSeller(chosenProduct.user.sells_from)}
              </p>
            </div>
            <div className={styles.seller__showPhone}>
              <p className={styles.showPhone__text}>Показать телефон</p>
              <p className={styles.showPhone__number}>8 905 ХХХ ХХ ХХ</p>
            </div>
          </div>

          <section className={styles.myGoods}>
            <h3 className={styles.myGoods__title}>Товары продавца</h3>
            <div className={styles.myGoods__wrapper}>
              {chosenPost === true ? (
                <Navigate to="/chosenPost" replace={true} />
              ) : (
                ""
              )}
              {sellerPosts.length > 0
                ? sellerPosts.map((post) => (
                    <div
                      onClick={() => getPost(post.id)}
                      key={post.id}
                      className={styles.item}
                    >
                      <div className={styles.item__pic}></div>
                      <h3 className={styles.item__title}>{post.title}</h3>
                      <p className={styles.item__price}>{post.price}</p>
                      <p className={styles.item__location}>{post.user.city}</p>
                      <p className={styles.item__time}>
                        {data(post.created_on)}
                      </p>
                    </div>
                  ))
                : " "}

              {/*
              <div className={styles.item}>
                <div className={styles.item__pic}></div>
                <h3 className={styles.item__title}>
                  Ракетка для большого тенниса Triumph Pro ST...
                </h3>
                <p className={styles.item__price}>2 200 ₽</p>
                <p className={styles.item__location}>Санкт Петербург</p>
                <p className={styles.item__time}>Сегодня в 10:45</p>
              </div>
              <div className={styles.item}>
                <div className={styles.item__pic}></div>
                <h3 className={styles.item__title}>
                  Ракетка для большого тенниса Triumph Pro ST...
                </h3>
                <p className={styles.item__price}>2 200 ₽</p>
                <p className={styles.item__location}>Санкт Петербург</p>
                <p className={styles.item__time}>Сегодня в 10:45</p>
              </div>
              <div className={styles.item}>
                <div className={styles.item__pic}></div>
                <h3 className={styles.item__title}>
                  Ракетка для большого тенниса Triumph Pro ST...
                </h3>
                <p className={styles.item__price}>2 200 ₽</p>
                <p className={styles.item__location}>Санкт Петербург</p>
                <p className={styles.item__time}>Сегодня в 10:45</p>
              </div>
              <div className={styles.item}>
                <div className={styles.item__pic}></div>
                <h3 className={styles.item__title}>
                  Ракетка для большого тенниса Triumph Pro ST...
                </h3>
                <p className={styles.item__price}>2 200 ₽</p>
                <p className={styles.item__location}>Санкт Петербург</p>
                <p className={styles.item__time}>Сегодня в 10:45</p>
  </div>*/}
            </div>
          </section>
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
  );
}
