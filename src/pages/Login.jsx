import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../index.module.css";
// import { fetchUsers } from "../api/requests";
import { getAllUsers, addUser, getTokens } from "../store/sliceUsers";
import Footer from "../components/Footer";

//import { fetchTokens } from "../api/requests";

export default function Login() {
  const [log, setLog] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useState(false);
  const updateAuthUser = () => {
    setAuthUser(true);
  };
  const updateLog = (value) => {
    setLog(value);
  };
  const updatePassword = (value) => {
    setPassword(value);
  };
  const dispatch = useDispatch();
  const url = "http://localhost:8090/user/all";
  useEffect(() => {
    axios.get(url).then(function (response) {
      dispatch(getAllUsers(response.data));
      console.log(response.data);
    });
  }, [url]);

  const usersFromRedux = useSelector(
    (state) => state.avitProUser.allUsersFromAPI
  );

  const checkUserReg = (arr, string, pass) => {
    const filtered = arr.filter(function (item) {
      return item.email === string && item.password === pass;
    });
    console.log(filtered);
    if (filtered.length > 0) {
      dispatch(addUser(filtered[0]));
      updateAuthUser();
    }
    return filtered;
  };
  async function fetchTokens({ email, password }) {
    let response = await fetch("http://localhost:8090/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    console.log(result);
    dispatch(getTokens(result));
    localStorage.setItem("access_token", result.access_token);
    localStorage.setItem("refresh_token", result.refresh_token);
    // let access = localStorage.getItem("access_token");
    // console.log(access);
    // let refresh = localStorage.getItem("refresh_token");
    // console.log(refresh);
  }

  return (
    <div className={styles.login}>
      <header className={styles.header_mob}>
        <Link to="/">
          <div className={styles.mobile__logo}>
            <div className={styles.mobile__img}></div>
          </div>
        </Link>
      </header>
      <section className={styles.login__page}>
        <div className={styles.login__wrapper}>
          <div className={styles.login__logo}></div>
          <input
            value={log}
            onChange={(e) => updateLog(e.target.value)}
            type="text"
            className={styles.login__login}
            placeholder="email"
          />
          <input
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
            type="text"
            className={styles.login__password}
            placeholder="Пароль"
          />
          <button
            onClick={() => {
              checkUserReg(usersFromRedux, log /* password */);
              fetchTokens({
                email: log,
                password: password,
              });
            }}
            className={styles.login__submit}
          >
            Войти
          </button>
          {authUser === true ? <Navigate to="/profile" replace={true} /> : " "}
          <Link to="/register">
            <button className={styles.login__register}>
              Зарегистрироваться
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
