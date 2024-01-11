import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "../index.module.css";
import { allPostsFill, getAllPostImg, getCurrentPost } from "../store/slice";
import { data } from "../helpers/helper";
import { getIMGSRC } from "../helpers/helper";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Main = () => {
  const itemsRef = useRef();
  const searchInputRef = useRef();
  const dispatch = useDispatch();

  const [chosenPost, setChosenPost] = useState(false);
  const updateChosenPost = () => {
    setChosenPost(true);
  };
  const [posts, setPosts] = useState([]);
  const [allAdsImg, setAllAdsImg] = useState([]);


  const URLTogetIMG = "http://localhost:8090/images";
  useEffect(() => {
    axios.get(URLTogetIMG).then((resp) => {
      const allIMG = resp.data;
      setAllAdsImg(allIMG);
      dispatch(getAllPostImg(allIMG));
     
    });
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);


  useEffect(() => {
    console.log(currentPage);
    console.log(fetching);
    if (fetching) {
      axios
        .get(`http://localhost:8090/ads?page=${currentPage}`)
        .then((resp) => {
          setPosts([...posts, ...resp.data]);
          dispatch(allPostsFill(resp.data));
          setCurrentPage(currentPage + 1);
          setTotalCount(resp.headers["x-total-count"]);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  const allPostsFromRedux = useSelector(
    (state) => state.avitProToolkit.allPosts
  );

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [totalCount]);

  const scrollHandler = (e) => {
    console.log(fetching);
    console.log(totalCount);
    console.log(currentPage);
    if (
      /* itemsRef.current.offsetHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100 */
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100 /* &&
      posts.length < totalCount */
    ) {
      setFetching(true);
    }
  };

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
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.search__box}>
          <div className={styles.logo}></div>
          <input
            ref={searchInputRef}
            type="text"
            className={styles.search__input}
            onChange={(event) => {
              getFilteredPosts(allPostsFromRedux, event.target.value);
            }}
          />
          <button className={styles.search__button}>Найти</button>
        </div>
        <main className={styles.main}>
          <h1 className={styles.main__title}>Объявления</h1>

          <div ref={itemsRef} className={styles.items}>
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
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
export default Main;
