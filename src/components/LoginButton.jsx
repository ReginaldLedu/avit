import React from "react";
import { Link } from "react-router-dom";
import styles from "../index.module.css";

export default function LoginButton() {
  return (
    <Link to="/login">
      <button className={styles.login__button}>Вход в личный кабинет</button>
    </Link>
  );
}
