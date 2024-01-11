import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../index.module.css";

export default function SliderForCurrentIPost() {
  const chosenProduct = useSelector(
    (state) => state.avitProToolkit.currentPost
  );
  const allProductIMG = useSelector((state) => state.avitProToolkit.allPostIMG);
  const filteredImg = allProductIMG.filter(
    (item) => item.ad_id === chosenProduct.id
  );
  const [position, setPosition] = useState(0);
  const [counter, setCounter] = useState(0);
  const containerSlider = useRef();
  const track = useRef();
  const showNextSlide = () => {
    const itemWidth = 320;
    const totalWidth = itemWidth * filteredImg.length;
    setCounter(counter + 1);
    console.log(counter);
    if (Math.abs(position) + 320 >= totalWidth) {
      setCounter(0);
      setPosition(0);
    } else {
      const itemLeft = position - 320;
      setPosition(itemLeft);
    }
  };
  const sliderContainer = {
    transform: `translateX(${position}px)`,
  };

  return (
    <>
      <div ref={containerSlider} className={styles.itemPage__photo}>
        <ul
          style={sliderContainer}
          ref={track}
          className={styles.itemPage__carousel}
        >
          {filteredImg.length > 0 ? (
            filteredImg.map((item) => (
              <li className={styles.carousel__pic} key={item.id}>
                <img
                  key={item.id}
                  src={`http://localhost:8090/${item.url}`}
                  alt="#"
                  className={styles.carousel__img}
                />
              </li>
            ))
          ) : (
            <p className={styles.itemPage__noIMG}>НЕТ ФОТО</p>
          )}
        </ul>
      </div>
      {filteredImg.length > 1 ? (
        <div onClick={showNextSlide} className={styles.arrow__forward}></div>
      ) : (
        ""
      )}
    </>
  );
}
