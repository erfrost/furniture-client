/* eslint-disable react-hooks/exhaustive-deps */
import RouteToHome from "../RouteToHome/RouteToHome";
import styles from "./CatalogTitle.module.css";
import { useRecoilState } from "recoil";
import { sortState } from "@/storage/atoms";
import { useEffect, useState } from "react";

const CatalogTitle = ({ title, items, setSortedItems }) => {
  const [sort, setSort] = useRecoilState(sortState);
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const onChangeSort = () => {
    if (sort === "none") {
      setSort("up");
    } else if (sort === "up") {
      setSort("down");
    } else if (sort === "down") {
      setSort("none");
    }
  };

  useEffect(() => {
    if (sort === "none") {
      setSortedItems(items);
    }
    if (sort === "up") {
      setSortedItems((prevState) => {
        const items = [...prevState];
        items.sort((a, b) => a.discountPrice - b.discountPrice);
        return items;
      });
    } else if (sort === "down") {
      setSortedItems((prevState) => {
        const items = [...prevState];
        items.sort((a, b) => b.discountPrice - a.discountPrice);
        return items;
      });
    }
  }, [sort]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.searchText}>{title}</span>
        <RouteToHome />
      </div>
      <div className={styles.filterContainer}>
        {screenWidth > 400 ? (
          <span className={styles.text}>Cортировка</span>
        ) : null}
        <div className={styles.btn} onClick={onChangeSort}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
          >
            <path
              d="M1.00008 0.547976C1.01939 0.506437 9.96105 0.464873 9.99967 0.547976C10.0383 0.631079 6.65862 5.57523 6.63931 5.90761C6.61999 6.23999 6.67793 9.50148 6.63931 9.5638C6.60068 9.62613 4.57288 10.5402 4.51494 10.4986C4.45701 10.4571 4.59219 6.46851 4.51494 6.13612C4.43769 5.80374 0.980768 0.589516 1.00008 0.547976Z"
              fill="#C9C9C9"
              stroke="#C9C9C9"
            />
          </svg>
          <span className={styles.text}>По цене</span>
          <svg
            className={`${styles.icon} ${
              sort === "up"
                ? styles.up
                : sort === "none"
                ? styles.displayNone
                : null
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
          >
            <path d="M1 0.5H7L4 3.5L1 0.5Z" fill="#A0A0A0" />
            <path
              d="M1 0.5V0C0.797769 0 0.615451 0.121821 0.53806 0.308658C0.46067 0.495495 0.503448 0.710554 0.646447 0.853553L1 0.5ZM7 0.5L7.35355 0.853553C7.49655 0.710554 7.53933 0.495495 7.46194 0.308658C7.38455 0.121821 7.20223 0 7 0V0.5ZM4 3.5L3.64645 3.85355L4 4.20711L4.35355 3.85355L4 3.5ZM1 1H7V0H1V1ZM6.64645 0.146447L3.64645 3.14645L4.35355 3.85355L7.35355 0.853553L6.64645 0.146447ZM4.35355 3.14645L1.35355 0.146447L0.646447 0.853553L3.64645 3.85355L4.35355 3.14645Z"
              fill="#A0A0A0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CatalogTitle;
