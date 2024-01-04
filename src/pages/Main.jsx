import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "../index.module.css";
import { allPostsFill, getAllPostImg, getCurrentPost } from "../store/slice";
import LoginButton from "../components/LoginButton";
import CreatePostButton from "../components/CreatePostButton";
import PersonalPage from "../components/PersonalPage";
import { data } from "../helpers/helper";
// import { avitProApi } from "../api/requests";
import { getIMGSRC } from "../helpers/helper";

const Main = () => {
  /* const { data: ads } = avitProApi.useFetchAllAdsQuery("");
  console.log(ads); */
  const user = useSelector((state) => state.avitProUser.user);
  // console.log(user);
  const searchInputRef = useRef();
  const dispatch = useDispatch();

  const [chosenPost, setChosenPost] = useState(false);
  const updateChosenPost = () => {
    setChosenPost(true);
  };
  const [posts, setPosts] = useState([]);
  const [allAdsImg, setAllAdsImg] = useState([]);
  // console.log(allAdsImg[0]);

  const URLTogetIMG = "http://localhost:8090/images";
  useEffect(() => {
    axios.get(URLTogetIMG).then((resp) => {
      const allIMG = resp.data;
      setAllAdsImg(allIMG);
      dispatch(getAllPostImg(allIMG));
      // console.log(allIMG);
    });
  }, []);

  const url = "http://localhost:8090/ads";
  useEffect(() => {
    axios.get(url).then((resp) => {
      const allPosts = resp.data;
      // console.log(allPosts);
      setPosts(allPosts);
      dispatch(allPostsFill(allPosts));
    });
  }, [url]);

  const allPostsFromRedux = useSelector(
    (state) => state.avitProToolkit.allPosts
  );
  /*console.log(allPostsFromRedux);*/

  function getFilteredPosts(array, input) {
    setPosts(
      array.filter(function (post) {
        const postWithLowerCase = post.title.toLowerCase();
        const inputToLowerCase = input.toLowerCase();
        return postWithLowerCase.includes(inputToLowerCase);
      })
    );
  }
  const getPost = (id) => {
    const url = `http://localhost:8090/ads/${id}`;
    axios.get(url).then((resp) => {
      const currentPost = resp.data;
      dispatch(getCurrentPost(currentPost));
      updateChosenPost();
      // console.log(currentPost);
    });
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.mobile__logo}>
          <div className={styles.mobile__img}></div>
        </div>
        <input
          type="text"
          className={styles.mobile__search}
          placeholder="Поиск"
        />
        {user.email === "" ? (
          <LoginButton />
        ) : (
          <>
            {" "}
            <CreatePostButton /> <PersonalPage />
          </>
        )}
      </header>
      <div className={styles.wrapper}>
        <div className={styles.search__box}>
          <div className={styles.logo}></div>
          <input
            ref={searchInputRef}
            type="text"
            className={styles.search__input}
            onChange={(event) => {
              getFilteredPosts(allPostsFromRedux[0], event.target.value);
            }}
          />
          <button className={styles.search__button}>Найти</button>
        </div>
        <main className={styles.main}>
          <h1 className={styles.main__title}>Объявления</h1>

          <div className={styles.items}>
            {posts.map((post) => (
              <div
                key={posts.indexOf(post)}
                className={styles.item}
                onClick={() => getPost(post.id)}
              >
                {chosenPost === true ? (
                  <Navigate to="/chosenPost" replace={true} />
                ) : (
                  ""
                )}
                <div className={styles.item__pic}>
                  {allAdsImg.filter((item) => item.ad_id === post.id).length >
                  0 ? (
                    <img
                      className={styles.item__pic}
                      src={getIMGSRC(allAdsImg, post.id)}
                    />
                  ) : (
                    <p className={styles.item__noPic}>НЕТ ФОТО</p>
                  )}
                </div>
                <h3 className={styles.item__title}>{post.title}.</h3>
                <p className={styles.item__price}>{post.price}</p>
                <p className={styles.item__location}>{post.user.city}</p>
                <p className={styles.item__time}>{data(post.created_on)}</p>
              </div>
            ))}
            {/*} {ads.map((post) => (
              <div
                key={posts.indexOf(post)}
                className={styles.item}
                onClick={() => getPost(post.id)}
              >
                {chosenPost === true ? (
                  <Navigate to="/chosenPost" replace={true} />
                ) : (
                  ""
                )}
                <div className={styles.item__pic}>
                  <img src="/img/Triangles.png" />
                </div>
                <h3 className={styles.item__title}>{post.title}.</h3>
                <p className={styles.item__price}>{post.price}</p>
                <p className={styles.item__location}>{post.user.city}</p>
                <p className={styles.item__time}>{data(post.created_on)}</p>
              </div>
            ))}*/}
          </div>
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
};
export default Main;
