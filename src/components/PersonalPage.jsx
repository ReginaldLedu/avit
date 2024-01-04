import React from "react";
import { Link } from "react-router-dom";
import styles from "../index.module.css";

export default function PersonalPage() {
  return (
    <Link to="/profile">
      <div className={styles.profile__button}>Личный кабинет</div>
    </Link>
  );
}
