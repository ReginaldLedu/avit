import React, { useState } from "react";
import { addUser } from "../store/sliceUsers";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import styles from "../index.module.css";
// import { register } from "../api/requests";
import { useRegisterRTKMutation } from "../api/requests";

// import { useSelector } from "react-redux";

export default function Register() {
  /* const userFromRedux = useSelector((state) => state.avitProUser.user);
  console.log(userFromRedux); */
  const [registerRTK] = useRegisterRTKMutation();

  const dispatch = useDispatch();

  const [status, setStatus] = useState("typing");
  const [email, setEmail] = useState("");
  const updateEmail = (emailFromInput) => {
    setEmail(emailFromInput);
  };
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  /*  function isEmailValid(value) {
    console.log(EMAIL_REGEXP.test(value));
    return EMAIL_REGEXP.test(value);
  } */

  const [password, setPassword] = useState("");
  const updatePassword = (value) => {
    setPassword(value);
  };

  const [passwordConf, setPasswordConf] = useState("");
  const updatePasswordConf = (value) => {
    setPasswordConf(value);
  };

  const [userName, setUserName] = useState("");
  const updateUserName = (value) => {
    setUserName(value);
  };

  const [userLastName, setUserLastName] = useState("");
  const updateUserLastName = (value) => {
    setUserLastName(value);
  };

  const [userCity, setUserCity] = useState("");
  const updateUserCity = (value) => {
    setUserCity(value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await checkFields(email, password, passwordConf);

      setStatus("success");
      dispatch(addUser(user));
    } catch (err) {
      setStatus("error");
    }
  }
  function checkFields(emailFromUser, passwordFromuser, passwordConfFromUser) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let shouldError = EMAIL_REGEXP.test(emailFromUser) === false;
        let passError = passwordFromuser !== passwordConfFromUser;
        if (shouldError || passError) {
          reject(new Error("Пожалуйста, проверьте поле с email и паролями"));
        } else {
          resolve();
        }
      }, 500);
    });
  }

  const user = {
    password: password,
    role: "user",
    email: email,
    name: userName,
    surname: userLastName,
    phone: "string",
    city: userCity,
    id: 0,
  };

  /* async function register({ email, password, name, surname, city }) {
    let response = await fetch("http://localhost:8090/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, surname, city }),
    });
    const result = await response.json();
    console.log(result);
  } */

  return (
    <div className={styles.register}>
      <section className={styles.register__page}>
        <div className={styles.register__wrapper}>
          <div className={styles.login__logo}></div>
          <input
            type="text"
            value={email}
            className={styles.register__email}
            placeholder="email"
            onChange={(e) => {
              updateEmail(e.target.value);
            }}
          ></input>

          <input
            type="password"
            value={password}
            className={styles.register__password}
            placeholder="Пароль"
            onChange={(e) => {
              updatePassword(e.target.value);
            }}
          />
          <input
            type="password"
            value={passwordConf}
            className={styles["register__password-repeat"]}
            placeholder="Повторите пароль"
            onChange={(e) => {
              updatePasswordConf(e.target.value);
            }}
          />
          <input
            type="text"
            value={userName}
            className={styles.register__name}
            placeholder="Имя (необязательно)"
            onChange={(e) => {
              updateUserName(e.target.value);
            }}
          />
          <input
            type="text"
            value={userLastName}
            onChange={(e) => {
              updateUserLastName(e.target.value);
            }}
            className={styles.register__lastname}
            placeholder="Фамилия (необязательно)"
          />
          <input
            type="text"
            value={userCity}
            onChange={(e) => {
              updateUserCity(e.target.value);
            }}
            className={styles.register__city}
            placeholder="Город (необязательно)"
          />
          <button
            className={styles.register__register}
            onClick={(e) => {
              onSubmit(e);
              registerRTK({
                email: email,
                name: userName,
                surname: userLastName,
                role: "user",
                city: userCity,
                password: password,
              });
              
            }}
          >
            Зарегистрироваться
          </button>
          {status === "success" ? <Navigate to="/login" replace={true} /> : " "}
          {status === "error" ? (
            <p>Пожалуйста, проверьте поле с email и паролями</p>
          ) : (
            ""
          )}
        </div>
      </section>
    </div>
  );
}
