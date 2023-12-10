import RouteToHome from "../RouteToHome/RouteToHome";
import styles from "./CatalogTitle.module.css";
import { useRecoilState } from "recoil";
import { furnishersFilterState, sortState } from "@/storage/atoms";
import { useEffect, useState } from "react";
import { CheckIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import axiosInstance from "@/axios.config";
import AlertInfo from "../AlertInfo/AlertInfo";
import { sortedFurnishers } from "@/utils/sortedFurnishers";

const CatalogTitle = ({ title, isFurnishersPage }) => {
  const [furnishersState, setFurnishersState] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [furnisherFilterArr, setFurnisherFilterArr] = useRecoilState(
    furnishersFilterState
  );
  const [sort, setSort] = useRecoilState(sortState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchFurnishers = async () => {
      try {
        const res = await axiosInstance.get("/furnishers");

        const result = sortedFurnishers(res.data);

        setFurnishersState(result);
      } catch (error) {
        setReqError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      }
    };

    fetchFurnishers();
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      const popoverContent = document.querySelector(
        ".CatalogTitle_furnishersList__RHF9N"
      );
      const icons = document.querySelectorAll(".CatalogTitle_filter__di3tg");

      let clickedOnIcon = false;

      icons.forEach((icon) => {
        if (icon.contains(e.target)) {
          clickedOnIcon = true;
        }
      });

      if (
        popoverContent &&
        !popoverContent.contains(e.target) &&
        !clickedOnIcon
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
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

  const furnisherFilterAdd = (furnisherId, iconId) => {
    const icon = document.getElementById(iconId);
    const isAlready = furnisherFilterArr.find((e) => e === furnisherId);

    if (!icon) return;

    if (!isAlready) {
      setFurnisherFilterArr((prevState) => [...prevState, furnisherId]);
      icon.style.opacity = "1";
    } else {
      const icon = document.getElementById(iconId);
      setFurnisherFilterArr((prevState) => {
        const arr = [...prevState];
        return arr.filter((item) => item !== furnisherId);
      });
      icon.style.opacity = "0";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.searchText}>{title}</span>
        {router.asPath !== "/kitchensToOrder" ? <RouteToHome /> : null}
      </div>
      <div className={styles.filterContainer}>
        <div className={styles.sort}>
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
            <TriangleDownIcon
              className={`${styles.filterIcon} ${
                sort === "up"
                  ? styles.up
                  : sort === "none"
                  ? styles.displayNone
                  : null
              }`}
            />
          </div>
        </div>
        {!isFurnishersPage ? (
          <div className={styles.filter}>
            <span
              className={`${styles.text} ${styles.filterText}`}
              onClick={() => setIsFilterOpen((prevState) => !prevState)}
            >
              Фильтр по поставщикам
            </span>
            <TriangleDownIcon
              className={styles.filterIcon}
              onClick={() => setIsFilterOpen((prevState) => !prevState)}
            />
            <div
              className={`${styles.furnishersList} ${
                isFilterOpen ? styles.active : null
              }`}
            >
              {furnishersState.map((item) => (
                <div className={styles.furnisherItem} key={item.id}>
                  <div
                    className={styles.square}
                    onClick={() =>
                      furnisherFilterAdd(item.id, "checkIcon-" + item.id)
                    }
                  >
                    <CheckIcon
                      boxSize="70%"
                      opacity={0}
                      transition="all 0.3s ease"
                      id={"checkIcon-" + item.id}
                    />
                  </div>
                  <span className={styles.furnisherTitle}>{item.id}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {reqError && (
        <AlertInfo
          title="Произошла ошибка:"
          description={reqError}
          type="error"
        />
      )}
    </div>
  );
};

export default CatalogTitle;
