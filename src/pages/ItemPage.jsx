import React from "react";
import { Link } from "react-router-dom";
import styles from "../index.module.css";
import CreatePostButton from "../components/CreatePostButton";
import Footer from "../components/Footer";
export default function ItemPage() {
  return (
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
              <img src="#" alt="" className={styles.itemPage__pic} />
              <div className={styles.itemPage__carousel}>
                <img src="#" alt="" className={styles.carousel__pic} />
                <img src="#" alt="" className={styles.carousel__pic} />
                <img src="#" alt="" className={styles.carousel__pic} />
                <img src="#" alt="" className={styles.carousel__pic} />
                <img src="#" alt="" className={styles.carousel__pic} />
              </div>
            </div>

            <div className={styles.itemPage__text}>
              <h3 className={styles.itemPage__title}>
                Ракетка для большого тенниса Triumph Pro STС Б/У
              </h3>
              <p className={styles.itemPage__time}>Сегодня в 10:45</p>
              <p className={styles.itemPage__city}>Санкт-Петербург</p>
              <p className={styles.itemPage__feedback}>23 отзыва</p>
              <p className={styles.itemPage__price}>2 200 ₽</p>
              <div className={styles.itemPage__showPhone}>
                <p className={styles.showPhone__text}>Показать телефон</p>
                <p className={styles.showPhone__number}>8 905 ХХХ ХХ ХХ</p>
              </div>
              <div className={styles.itemPage__seller}>
                <img src="#" alt="" className={styles.seller__pic} />
                <div className={styles.seller__box}>
                  <p className={styles.itemPage__seller_name}>Кирилл</p>
                  <p className={styles.itemPage__seller_date}>
                    Продает товары с августа 2021
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.itemDescription}>
            <h3 className={styles.itemDescription__title}>Описание товара</h3>
            <p className={styles.itemDescription__text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
