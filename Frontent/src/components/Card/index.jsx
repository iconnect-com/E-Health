import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Card = ({ Icon, title, url = "", color, colorInner, total }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < total) {
        setCount(count + 1);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [count, total]);

  return (
    <Link className={styles.card} to={url}>
      <div className={styles.text}>
        <p>{title}</p>

        <h1> {count}</h1>
      </div>

      <div className={`${styles.circle} ${styles[colorInner]}`}>
        <div className={`${styles.icircle} ${styles[color]}`}>{<Icon />}</div>
      </div>
    </Link>
  );
};

export default Card;
