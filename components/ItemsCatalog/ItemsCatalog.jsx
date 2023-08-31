import { useEffect, useRef, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./ItemsCatalog.module.css";
import axiosInstance from "@/axios.config";
import AlertInfo from "../AlertInfo/AlertInfo";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import { throttle } from "lodash";

const ItemsCatalog = ({ items, isDiscountPage }) => {
  const [allItems, setAllItems] = useState(items);
  const [offset, setOffset] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [reqError, setReqError] = useState(null);

  const loadMoreItems = async () => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        if (isDiscountPage) {
          const items = await axiosInstance.get(
            `items/discount?limit=25&offset=${offset}`
          );
          setAllItems((prevState) => [...prevState, ...items.data]);
        } else {
          const items = await axiosInstance.get(
            `items?limit=25&offset=${offset}`
          );
          setAllItems((prevState) => [...prevState, ...items.data]);
        }
      } catch (error) {
        setReqError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      } finally {
        setOffset((prevState) => prevState + 25);
        setIsLoading(false);
      }
    }
  };

  const handleScroll = useRef(
    throttle(() => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const footer = document.querySelector(".Footer_container__Mn8SS");
      let footerHeight;
      if (footer) {
        footerHeight = footer.offsetHeight;
      }

      if (
        scrollTop + clientHeight >= scrollHeight - footerHeight &&
        !isLoading
      ) {
        loadMoreItems();
      }
    }, 500)
  ).current;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.list}>
        {allItems?.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
        {reqError && (
          <AlertInfo
            title="Произошла ошибка:"
            description={reqError}
            type="error"
          />
        )}
      </div>
      {isLoading && <LoadSpinner />}
    </>
  );
};

export default ItemsCatalog;
