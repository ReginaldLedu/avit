import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../index.module.css";
import CreatePostButton from "../components/CreatePostButton";
import { getCurrentUserPosts, getCurrentPost } from "../store/slice";
import { data } from "../helpers/helper";
import { updateUserDataInAPI } from "../api/requests";
import { addUser } from "../store/sliceUsers";

// import axios from "axios";

export default function Profile() {
  const [chosenPost, setChosenPost] = useState(false);
  const updateChosenPost = () => {
    setChosenPost(true);
  };
  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.avitProUser.tokens);
  // console.log(tokens);
  const userFromRedux = useSelector((state) => state.avitProUser.user);
  //console.log(userFromRedux);
  const [status, setStatus] = useState("empty");
  const updateStatus = () => {
    setStatus("updated");
  };

  const [userPosts, setUserPosts] = useState([]);
  const updateUserPosts = (value) => {
    setUserPosts(value);
  };
  function disabledCheck(st) {
    if (st === "updated") {
      return styles.settings__submit;
    }
  }

  const getPost = (id) => {
    const url = `http://localhost:8090/ads/${id}`;
    axios.get(url).then((resp) => {
      const currentPost = resp.data;
      dispatch(getCurrentPost(currentPost));
      updateChosenPost();
      console.log(currentPost);
    });
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
      dispatch(getCurrentUserPosts(result));
      updateUserPosts(result);
    }
    getUserPosts(userFromRedux.id);
  }, []);

  const [userData, setUserData] = useState({
    email: userFromRedux.email,
    name: userFromRedux.name,
    surname: userFromRedux.surname,
    phone: userFromRedux.phone,
    city: userFromRedux.city,
    id: userFromRedux.id,
  });

  const updateUserInfo = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const updateUserInRedux = (userData) => {
    dispatch(addUser(userData));
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.mobile__logo}>
          <div className={styles.mobile__img}></div>
        </div>
        <CreatePostButton />
        <div className={styles.profile__button}>Личный кабинет</div>
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
          <h1
            className={styles.profile__greeting}
          >{`Здравствуйте, ${userFromRedux.name}`}</h1>

          <div className={styles.profile__settings}>
            <h2 className={styles.settings__title}>Настройки профиля</h2>
            <div className={styles.settings__wrapper}>
              <div className={styles.settings__photo}>
                <img src="#" alt="" className={styles.settings__pic} />
                <p className={styles["settings__change-photo"]}>Заменить</p>
              </div>
              <div className={styles.settings__text}>
                <div className={styles["settings__name-box"]}>
                  <div className={styles.name__wrapper}>
                    <label htmlFor="name">Имя</label>
                    <input
                      name="name"
                      placeholder={userFromRedux.name}
                      value={userData.name}
                      id="name"
                      type="text"
                      className={styles.settings__name}
                      onChange={updateUserInfo}
                      onBlur={updateStatus}
                    />
                  </div>
                  <div className={styles.lastname__wrapper}>
                    <label htmlFor="lastname"> Фамилия </label>
                    <input
                      value={userData.surname}
                      placeholder={userFromRedux.surname}
                      name="surname"
                      id="lastname"
                      type="text"
                      className={styles.settings__lastname}
                      onChange={updateUserInfo}
                      onBlur={updateStatus}
                    />
                  </div>
                </div>
                <label htmlFor="city"> Город </label>
                <input
                  placeholder={userFromRedux.city}
                  value={userData.city}
                  name="city"
                  id="city"
                  type="text"
                  className={styles.settings__city}
                  onChange={updateUserInfo}
                  onBlur={updateStatus}
                />

                <label htmlFor="phone">Телефон </label>
                <input
                  name="phone"
                  value={userData.phone}
                  id="phone"
                  type="text"
                  className={styles.settings__phone}
                  onChange={updateUserInfo}
                  onBlur={updateStatus}
                />

                <button
                  type="submit"
                  onClick={() => {
                    updateUserDataInAPI(
                      userData.email,
                      userData.name,
                      userData.surname,
                      userData.phone,
                      userData.city,
                      tokens.access_token
                    );
                    updateUserInRedux(userData);
                  }}
                  disabled={status === "empty"}
                  className={disabledCheck(status)}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
          <section className={styles.myGoods}>
            <h3 className={styles.myGoods__title}>Мои товары</h3>
            <div className={styles.myGoods__wrapper}>
              {chosenPost === true ? (
                <Navigate to="/chosenPost" replace={true} />
              ) : (
                ""
              )}
              {userPosts.length > 0
                ? userPosts.map((post) => (
                    <div
                      key={post.id}
                      className={styles.item}
                      onClick={() => getPost(post.id)}
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
              {/*<div className={styles.item}>
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
              </div> */}
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

{
  /*{userPosts.map((post) => (
                <div key={post.id} className={styles.item}>
                  <div className={styles.item__pic}></div>
                  <h3 className={styles.item__title}>
                    Ракетка для большого тенниса Triumph Pro ST...
                  </h3>
                  <p className={styles.item__price}>2 200 ₽</p>
                  <p className={styles.item__location}>Санкт Петербург</p>
                  <p className={styles.item__time}>Сегодня в 10:45</p>
                </div>
              ))}*/
}
