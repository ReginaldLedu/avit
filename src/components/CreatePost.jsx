import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAddPost } from "../store/slice";
// import axios from "axios";
import styles from "../index.module.css";
//import { addPostText } from "../api/requests";
// import { getTokens } from "../store/sliceUsers";
import {
  refreshTokens,
  useAddPostTextRTKMutation,
  useAddImageToThePostMutation,
} from "../api/requests";

export default function CreatePost() {
  /* async function onSubmit(id, token) {
    let response = await fetch(`http://localhost:8090/ads/${id}/image`, {
      method: "POST",
      body: new FormData(formRef.current),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let result = await response.json();
    alert(result.message);
  }*/
  const formRef = useRef();
  const [updatePost, result] = useAddImageToThePostMutation();
  console.log(updatePost);
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const [addPostTextRTK] = useAddPostTextRTKMutation();

  const fileReader = new FileReader();
  const tokens = useSelector((state) => state.avitProUser.tokens);
  // console.log(tokens);
  const [url, setURL] = useState("");
  fileReader.onloadend = () => {
    setURL(fileReader.result);
    console.log(url);
  };

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
        console.log(data.data.id);
        fetch(`http://localhost:8090/ads/${data.data.id}/image`, {
          method: "POST",
          headers: {
            /*"Content-Type": "mutipart/form-data",*/
            Authorization: `Bearer ${tokens.access_token}`,
          },
          body: formIMG,
        });
        // onSubmit(data.data.id, tokens.access_token);
        /* updatePost({
          body: formIMG,
          id: data.data.id,
          token: tokens.access_token,
        }); */
      });
    console.log(result);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  /*const onChange = (e) => {
    formRef.current.append("file", e.target.files[0]);
    console.log(formRef);
  };*/

  const dispatch = useDispatch();
  const closeCreateForm = () => {
    dispatch(closeAddPost());
  };
  const handleFile1Change = (event) => {
    event.preventDefault();
    setFile1(event.target.files[0]);
    console.log(file1);
    fileReader.readAsDataURL(event.target.files[0]);
    formIMG.append("file", file1);
    console.log(formIMG);
  };

  const handleFile2Change = (event) => {
    event.preventDefault();
    setFile2(event.target.files[0]);
    console.log(file2);
  };
  const handleFile3Change = (event) => {
    event.preventDefault();
    setFile3(event.target.files[0]);
    console.log(file3);
  };
  const handleFile4Change = (event) => {
    event.preventDefault();
    setFile4(event.target.files[0]);
    console.log(file4);
  };
  const handleFile5Change = (event) => {
    event.preventDefault();
    setFile5(event.target.files[0]);
    console.log(file5);
  };
  const formIMG = new FormData();

  return (
    <section className={styles.createPost}>
      <div className={styles.createPost__wrapper}>
        <div className={styles.createPost__topWrapper}>
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

        <form ref={formRef} action="submit" id="form" name="form">
          <label htmlFor="input__file1" className={styles.createPost__photo}>
            <span className={styles.createPost__plus1}></span>
            <span className={styles.createPost__plus2}></span>
          </label>
          <input
            onChange={handleFile1Change}
            className={styles.createPost__photoInput}
            type="file"
            id="input__file1"
            name="file"
          />
          <label htmlFor="input__file2" className={styles.createPost__photo}>
            <span className={styles.createPost__plus1}></span>
            <span className={styles.createPost__plus2}></span>
          </label>
          <input
            onChange={handleFile2Change}
            className={styles.createPost__photoInput}
            type="file"
            id="input__file2"
            name="picture"
          />
          <label htmlFor="input__file3" className={styles.createPost__photo}>
            <span className={styles.createPost__plus1}></span>
            <span className={styles.createPost__plus2}></span>
          </label>
          <input
            onChange={handleFile3Change}
            className={styles.createPost__photoInput}
            type="file"
            id="input__file3"
            name="picture"
          />
          <label htmlFor="input__file4" className={styles.createPost__photo}>
            <span className={styles.createPost__plus1}></span>
            <span className={styles.createPost__plus2}></span>
          </label>
          <input
            onChange={handleFile4Change}
            className={styles.createPost__photoInput}
            type="file"
            id="input__file4"
            name="picture"
          />
          <label htmlFor="input__file5" className={styles.createPost__photo}>
            <span className={styles.createPost__plus1}></span>
            <span className={styles.createPost__plus2}></span>
          </label>
          <input
            onChange={handleFile5Change}
            className={styles.createPost__photoInput}
            type="file"
            id="input__file5"
            name="picture"
          />
        </form>
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
              // updatePost(url, 1, tokens.access_token);
            } catch (error) {
              console.log(error);
            } finally {
              closeCreateForm();
            }
          }}
          type="submit"
          className={styles.createPost__submit}
        >
          Опубликовать
        </button>
      </div>
    </section>
  );
}
