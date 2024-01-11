import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { closeAddPost } from "../store/slice";
import styles from "../index.module.css";
import {
  refreshTokens,
  useAddPostTextRTKMutation,
  useAddImageToThePostMutation,
} from "../api/requests";

export default function CreatePost() {
  const [updatePost] = useAddImageToThePostMutation();
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const [addPostTextRTK] = useAddPostTextRTKMutation();
  const fileReader = new FileReader();
  const [url, setURL] = useState("");

  fileReader.onloadend = () => {
    setURL(fileReader.result);
    console.log(url);
  };

  const [newPostId, setNewPostId] = useState(0);
  const handleAddPost = async () => {
	
    await addPostTextRTK({
      title: formData.title,
      description: formData.description,
      price: formData.price,
      token: accessToken,
    })
      .catch((error) => {
        if (error.status === 401) {
          console.log(accessToken, refreshToken);
          refreshTokens(accessToken, refreshToken);
        }
      })
      .then((data) => {
        setNewPostId(data.data.id);
      });
    console.log(newPostId);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const closeCreateForm = () => {
    dispatch(closeAddPost());
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    try {
      updatePost({
        file: event.target.files[0],
        id: newPostId,
        token: accessToken,
      });
    } catch (error) {
      console.log(error);
    }
   
    fileReader.readAsDataURL(event.target.files[0]);
   
  };

  return (
    <section className={styles.createPost}>
      <header className={styles.header_mob}>
        <Link to="/">
          <div className={styles.mobile__logo}>
            <div className={styles.mobile__img}></div>
          </div>
        </Link>
      </header>
      <div className={styles.createPost__wrapper}>
        <div className={styles.createPost__topWrapper}>
          <div
            onClick={closeCreateForm}
            className={styles.createPost__back}
          ></div>
          <h2 className={styles.createPost__title}>Новое объявление</h2>
          <div onClick={closeCreateForm} className={styles.createPost__close}>
            <span className={styles.createPost__close1}></span>
            <span className={styles.createPost__close2}></span>
          </div>
        </div>
        <label htmlFor="goodsTitle" className={styles.createPost__labels}>
          Название
        </label>
        <input
          name="title"
          onChange={handleInputChange}
          value={formData.title}
          placeholder="Введите название"
          id="goodsTitle"
          type="text"
          className={styles.goodsTitle}
        />
        <label htmlFor="goodsText" className={styles.createPost__labels}>
          Описание
        </label>
        <textarea
          onChange={handleInputChange}
          value={formData.description}
          name="description"
          placeholder="Введите описание"
          id="goodsText"
          type="text"
          className={styles.goodsText}
        ></textarea>

        <label
          htmlFor="createPost__price"
          className={styles.createPost__labels}
        >
          Цена
        </label>
        <input
          onChange={handleInputChange}
          value={formData.price}
          name="price"
          id="createPost__price"
          type="text"
          className={styles.createPost__price}
        />

        <button
          onClick={() => {
            try {
              handleAddPost();
            } catch (error) {
              console.log(error);
            } finally {
              () => closeCreateForm();
            }
          }}
          type="submit"
          className={styles.createPost__submit}
        >
          Опубликовать текстовую часть
        </button>

        {/* <form ref={formRef} action="submit" id="form" name="form"> */}
        <p className={styles.changePost__photosTitle}>
          Фотографии товара{" "}
          <span className={styles.changePost__photosTitle_grey}>
         
            не более 5 фотографий
          </span>
        </p>

        <label
          id="one"
          htmlFor="input__file1"
          className={styles.createPost__photo}
        >
          <span className={styles.createPost__plus1}></span>
          <span className={styles.createPost__plus2}></span>
        </label>
        <input
          onChange={handleFileChange}
          className={styles.createPost__photoInput}
          type="file"
          id="input__file1"
          name="file"
        />
        <label
          id="two"
          htmlFor="input__file2"
          className={styles.createPost__photo}
        >
          <span className={styles.createPost__plus1}></span>
          <span className={styles.createPost__plus2}></span>
        </label>
        <input
          onChange={handleFileChange}
          className={styles.createPost__photoInput}
          type="file"
          id="input__file2"
          name="picture"
        />
        <label
          id="three"
          htmlFor="input__file3"
          className={styles.createPost__photo}
        >
          <span className={styles.createPost__plus1}></span>
          <span className={styles.createPost__plus2}></span>
        </label>
        <input
          onChange={handleFileChange}
          className={styles.createPost__photoInput}
          type="file"
          id="input__file3"
          name="picture"
        />
        <label
          id="four"
          htmlFor="input__file4"
          className={styles.createPost__photo}
        >
          <span className={styles.createPost__plus1}></span>
          <span className={styles.createPost__plus2}></span>
        </label>
        <input
          onChange={handleFileChange}
          className={styles.createPost__photoInput}
          type="file"
          id="input__file4"
          name="picture"
        />
        <label
          id="five"
          htmlFor="input__file5"
          className={styles.createPost__photo}
        >
          <span className={styles.createPost__plus1}></span>
          <span className={styles.createPost__plus2}></span>
        </label>
        <input
          onChange={handleFileChange}
          className={styles.createPost__photoInput}
          type="file"
          id="input__file5"
          name="picture"
        />
        {/* </form> */}
      </div>
    </section>
  );
}

/* fetch(`http://localhost:8090/ads/${data.data.id}/image`, {
          method: "POST",
          headers: {
            "Content-Type": "mutipart/form-data",
            Authorization: `Bearer ${tokens.access_token}`,
          },
          body: formIMG,
        }); 
        // onSubmit(data.data.id, tokens.access_token);
        for (let i = 1; i < 2; i++) {
          updatePost({
            body: formIMG,
            id: data.data.id,
            token: tokens.access_token,
          });

          console.log({
            body: formIMG,
            id: data.data.id,
            token: tokens.access_token,
          });
          formIMG.delete("file");
        } */
