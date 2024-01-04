import React from "react";
import styles from "../index.module.css";

export default function PostsForMain() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.main__title}>Объявления</h1>
        <div className={styles.items}>
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
          </div>
        </div>
      </main>
    </>
  );
}
