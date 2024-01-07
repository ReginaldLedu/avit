import React, { useState } from "react";
import styles from "../index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRemovePostMutation } from "../api/requests";
import { useNavigate } from "react-router-dom";
import ChangePost from "./ChangePost";
import { changePost } from "../store/slice";

export default function ShowPhoneButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changePostSwitch = useSelector(
    (state) => state.avitProToolkit.changePostSwitchOn
  );
  const chosenProduct = useSelector(
    (state) => state.avitProToolkit.currentPost
  );
  const tokens = useSelector((state) => state.avitProUser.tokens);
  const [isSkipRefetching, setSkipRefetching] = useState(false);
  const [removePost] = useRemovePostMutation(
    chosenProduct.id,
    tokens.access_token
  );
  const user = useSelector((state) => state.avitProUser.user);

  function postRemoval({ id, token }) {
    setSkipRefetching(true);
    console.log(isSkipRefetching);
    console.log(token, id);
    removePost({ id, token });
    navigate("/");
  }

  const [phoneNumber, setPhoneNumberOpen] = useState(false);

  const showChangePostScreen = () => {
    dispatch(changePost());
  };
  return (
    <>
      {changePostSwitch === true ? <ChangePost /> : ""}
      {user.email !== chosenProduct.user.email ? (
        <div className={styles.itemPage__showPhone}>
          <p className={styles.showPhone__text}>Показать телефон</p>
          {phoneNumber === false ? (
            <p
              onClick={() => setPhoneNumberOpen(true)}
              className={styles.showPhone__number}
            >{`${chosenProduct.user.phone.slice(0, 6)}ХХХ ХХ ХХ`}</p>
          ) : (
            <p className={styles.showPhone__number}>
              {chosenProduct.user.phone}
            </p>
          )}
        </div>
      ) : (
        <>
          <div className={styles.itemPage__buttonWrapper}>
            <div
              onClick={showChangePostScreen}
              className={styles.itemPage__changePost}
            >
              Редактировать
            </div>
            <div
              onClick={() =>
                postRemoval({
                  id: chosenProduct.id,
                  token: tokens.access_token,
                })
              }
              className={styles.itemPage__changePost}
            >
              Снять с публикации
            </div>
          </div>
        </>
      )}
    </>
  );
}
