import React from "react";
import styles from "../index.module.css";

export default function Search() {
  return (
    <div className={styles.search__wrapper}>
      <input className={styles.search__input} type="text" />
      <button className={styles.search__button}>Найти</button>
    </div>
  );
}
