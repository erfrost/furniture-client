/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./ItemsCatalog.module.css";
import axiosInstance from "@/axios.config";
import AlertInfo from "../AlertInfo/AlertInfo";
import { throttle } from "lodash";
import { useRecoilValue } from "recoil";
import { furnishersFilterState, sortState } from "@/storage/atoms";

const ItemsCatalog = ({
  items,
  allCount,
  setCountState,
  isDiscountPage,
  loadFunc,
}) => {
  const [allItems, setAllItems] = useState(items);
  const [filteredItems, setFilteredItems] = useState(items);
  const furnisherFilterArr = useRecoilValue(furnishersFilterState);
  const sort = useRecoilValue(sortState);
  const [reqError, setReqError] = useState(null);
  let isLoading = false;
  let offset = 25;
  let nullMoreItems = false;

  useEffect(() => {
    setAllItems(items);
  }, [items]);

  useEffect(() => {
    if (sort === "none") {
      setFilteredItems(allItems);
    }
    if (sort === "up") {
      const result = [...filteredItems].sort(
        (a, b) => a.discountPrice - b.discountPrice
      );
      setFilteredItems(result);
    } else if (sort === "down") {
      const result = [...filteredItems].sort(
        (a, b) => b.discountPrice - a.discountPrice
      );
      setFilteredItems(result);
    }
  }, [sort, allItems]);

  useEffect(() => {
    if (!furnisherFilterArr.length) {
      setFilteredItems(allItems);
      if (setCountState && allCount > 0) setCountState(allCount);
      return;
    }

    const resultArray = allItems.filter((item) =>
      furnisherFilterArr.includes(item.furnisherId)
    );
    setFilteredItems(resultArray);
    if (setCountState) setCountState(resultArray.length);
  }, [furnisherFilterArr, allItems]);

  const loadMoreItems = async () => {
    if (!isLoading && !nullMoreItems) {
      isLoading = true;
      try {
        let items;

        if (isDiscountPage) {
          items = await axiosInstance.get(
            `items/discount?limit=25&offset=${offset}`
          );
        } else {
          items = await loadFunc(offset);
        }
        console.log(items);
        if (!items.data.items.length) return (nullMoreItems = true);
        console.log(items.data.items);
        setAllItems((prevState) => [...prevState, ...items.data.items]);
      } catch (error) {
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
        {filteredItems?.map((item) => (
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
