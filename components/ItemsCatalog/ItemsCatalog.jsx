/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./ItemsCatalog.module.css";
import axiosInstance from "@/axios.config";
import AlertInfo from "../AlertInfo/AlertInfo";
import { throttle } from "lodash";

const ItemsCatalog = ({
  items,
  isDiscountPage,
  queryCategoryId,
  querySubcategoryId,
  querySearch,
  queryFurnisherId,
}) => {
  const [allItems, setAllItems] = useState(items);
  const [reqError, setReqError] = useState(null);
  let isLoading = false;
  let offset = 25;
  let nullMoreItems = false;

  useEffect(() => {
    setAllItems(items);
  }, [items]);

  const loadMoreItems = async () => {
    if (!isLoading && !nullMoreItems) {
      isLoading = true;
      try {
        if (isDiscountPage) {
          const items = await axiosInstance.get(
            `items/discount?limit=25&offset=${offset}`
          );
          if (!items.data.length) nullMoreItems = true;
          setAllItems((prevState) => [...prevState, ...items.data.items]);
        } else {
          let items;
          if (queryCategoryId) {
            items = await axiosInstance.get(
              `items/by_category/${queryCategoryId}?limit=25&offset=${offset}`
            );
          } else if (querySubcategoryId) {
            items = await axiosInstance.get(
              `items/by_subcategory/${querySubcategoryId}?limit=25&offset=${offset}`
            );
          } else if (querySearch) {
            items = await axiosInstance.get(
              `items/search?search=${querySearch}&limit=25&offset=${offset}`
            );
          } else if (queryFurnisherId) {
            console.log("requst");
            items = await axiosInstance.get(
              `items/by_furnisher/${queryFurnisherId}?limit=25&offset=${offset}`
            );
            console.log(items);
          }
          if (!items.data.items.length) nullMoreItems = true;
          setAllItems((prevState) => [...prevState, ...items.data.items]);
        }
      } catch (error) {
        console.log(error.message);
        setReqError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      } finally {
        offset += 25;
        isLoading = false;
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

      if (scrollTop + clientHeight >= scrollHeight - footerHeight)
        loadMoreItems();
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
          <ItemCard item={item} key={item._id} />
        ))}
      </div>
      {reqError && (
        <AlertInfo
          title="Произошла ошибка:"
          description={reqError}
          type="error"
        />
      )}
    </>
  );
};

export default ItemsCatalog;
