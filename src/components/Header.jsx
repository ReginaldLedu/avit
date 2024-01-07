import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../index.module.css";
import LoginButton from "../components/LoginButton";
import CreatePostButton from "../components/CreatePostButton";
import PersonalPage from "../components/PersonalPage";

export default function Header() {
  const user = useSelector((state) => state.avitProUser.user);
  // console.log(user);
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.mobile__logo}>
          <div className={styles.mobile__img}></div>
        </div>
      </Link>
		
      <input
        type="text"
        className={styles.mobile__search}
        placeholder="Поиск"
      />
      {user.email === "" ? (
        <LoginButton />
      ) : (
        <>
          <CreatePostButton /> <PersonalPage />
        </>
      )}
    </header>
  );
}
