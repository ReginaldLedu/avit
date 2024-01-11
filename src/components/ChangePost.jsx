import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { changePostClose } from "../store/slice";
import {
  useChangePostRTKMutation,
  useAddImageToThePostMutation,
} from "../api/requests";

export default function ChangePost() {
  const [updatePost] = useAddImageToThePostMutation();
  const tokens = useSelector((state) => state.avitProUser.tokens);
  const dispatch = useDispatch();
  const chosenProduct = useSelector(
    (state) => state.avitProToolkit.currentPost
  );
  const [currentTitle, setCurrentTitle] = useState(chosenProduct.title);
  const updateCurrentTitle = (value) => {
    setCurrentTitle(value);
  };
  const [currentDescription, setCurrentDescription] = useState(
    chosenProduct.description
  );
  const updateCurrentDescription = (value) => {
    setCurrentDescription(value);
  };

  const [currentPrice, setCurrentPrice] = useState(chosenProduct.price);
  const updateCurrentPrice = (value) => {
    setCurrentPrice(value);
  };
  function closeChangePostScreen() {
    dispatch(changePostClose());
  }

  const [changePostTextRTK] = useChangePostRTKMutation({
    title: currentTitle,
    description: currentDescription,
    price: currentPrice,
    id: chosenProduct.id,
    token: tokens.access_token,
  });
  function checkFields(currentTitle, currentPrice) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let shouldError = currentTitle.length <= 0;
        let passError = currentPrice.length <= 0;
        if (shouldError || passError) {
          reject(
            new Error("Пожалуйста, заполните поля с названием и ценой	товара")
          );
        } else {
          resolve();
        }
      }, 500);
    });
  }

  const handleChangePost = async () => {
    checkFields(currentTitle, currentPrice);
    await changePostTextRTK({
      title: currentTitle,
      description: currentDescription,
      price: currentPrice,
      id: chosenProduct.id,
      token: tokens.access_token,
    });
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    try {
      updatePost({
        file: event.target.files[0],
        id: chosenProduct.id,
        token: tokens.access_token,
      });
    } catch (error) {
      console.log(error);
    } finally {
      closeChangePostScreen;
    }
  };

  return (
    <section className={styles.changePost}>
      <header className={styles.header_mob}>
        <Link to="/">
          <div className={styles.mobile__logo}>
            <div className={styles.mobile__img}></div>
          </div>
        </Link>
      </header>
      <div className={styles.changePost__wrapper}>
        <div className={styles.changePost__topWrapper}>
          <div
            onClick={closeChangePostScreen}
            className={styles.comment__back}
          ></div>
          <h2 className={styles.changePost__title}>
            Редактировать{" "}
            <span className={styles.changePost__title2}>объявление</span>
          </h2>
          <div
            onClick={closeChangePostScreen}
            className={styles.changePost__close}
          >
            <span className={styles.changePost__close1}></span>
            <span className={styles.changePost__close2}></span>
          </div>
        </div>
        <form action="submit">
          <label htmlFor="goodsTitle" className={styles.changePost__labels}>
            Название
          </label>
          <input
            value={currentTitle}
            onChange={(e) => updateCurrentTitle(e.target.value)}
            name="title"
            placeholder="Введите название"
            id="goodsTitle"
            type="text"
            className={styles.changePost__goodsTitle}
          />
          <label htmlFor="goodsText" className={styles.changePost__labels}>
            Описание
          </label>
          <textarea
            value={currentDescription}
            onChange={(e) => updateCurrentDescription(e.target.value)}
            name="description"
            placeholder="Введите описание"
            id="goodsText"
            type="text"
            className={styles.changePost__goodsText}
          ></textarea>

          <label htmlFor="input__file" className={styles.changePost__photo}>
            <span className={styles.changePost__plus1}></span>
            <span className={styles.changePost__plus2}></span>
          </label>
          <input
            onChange={handleFileChange}
            className={styles.changePost__photoInput}
            type="file"
            id="input__file"
            name="picture"
          />
          <label htmlFor="input__file" className={styles.changePost__photo}>
            <span className={styles.changePost__plus1}></span>
            <span className={styles.changePost__plus2}></span>
          </label>
          <input
            onChange={handleFileChange}
            className={styles.changePost__photoInput}
            type="file"
            id="input__file"
            name="picture"
          />
          <label htmlFor="input__file" className={styles.changePost__photo}>
            <span className={styles.changePost__plus1}></span>
            <span className={styles.changePost__plus2}></span>
          </label>
          <input
            onChange={handleFileChange}
            className={styles.changePost__photoInput}
            type="file"
            id="input__file"
            name="picture"
          />
          <label
            id="four"
            htmlFor="input__file"
            className={styles.changePost__photo}
          >
            <span className={styles.changePost__plus1}></span>
            <span className={styles.changePost__plus2}></span>
          </label>
          <input
            onChange={handleFileChange}
            className={styles.changePost__photoInput}
            type="file"
            id="input__file"
            name="picture"
          />
          <label
            id="five"
            htmlFor="input__file"
            className={styles.changePost__photo}
          >
            <span className={styles.changePost__plus1}></span>
            <span className={styles.changePost__plus2}></span>
          </label>
          <input
            onChange={handleFileChange}
            className={styles.changePost__photoInput}
            type="file"
            id="input__file"
            name="picture"
          />

          <label
            htmlFor="changePost__price"
            className={styles.changePost__labels}
          >
            Цена
          </label>
          <input
            value={currentPrice}
            onChange={(e) => updateCurrentPrice(e.target.value)}
            name="price"
            id="changePost__price"
            type="text"
            className={styles.changePost__price}
          />

          <button
            onClick={(e) => {
              try {
                e.target.setAttribute("disabled", "");
                handleChangePost();
              } catch (error) {
                console.log(error.message);
              } finally {
                closeChangePostScreen();
              }
            }}
            type="submit"
            className={styles.changePost__submit}
          >
            Опубликовать
          </button>
        </form>
      </div>
    </section>
  );
}
