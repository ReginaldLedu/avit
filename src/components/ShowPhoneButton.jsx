import React from "react";
import styles from "../index.module.css";
import { useSelector } from "react-redux";

export default function ShowPhoneButton() {
  const user = useSelector((state) => state.avitProUser.user);
  const chosenProduct = useSelector(
    (state) => state.avitProToolkit.currentPost
  );
  return (
    <>
      {user.email !== chosenProduct.user.email ? (
        <div className={styles.itemPage__showPhone}>
          <p className={styles.showPhone__text}>Показать телефон</p>
          <p className={styles.showPhone__number}>8 905 ХХХ ХХ ХХ</p>
        </div>
      ) : (
        <>
          <div className={styles.itemPage__buttonWrapper}>
            <div className={styles.itemPage__changePost}>Редактировать</div>
            <div className={styles.itemPage__changePost}>
              Снять с публикации
            </div>
          </div>
        </>
      )}
    </>
  );
}
