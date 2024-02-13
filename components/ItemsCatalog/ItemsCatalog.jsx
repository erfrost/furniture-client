/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./ItemsCatalog.module.css";
import { throttle } from "lodash";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import {
  availabilityFilterState,
  furnishersFilterState,
  sortState,
} from "../../storage/atoms";

const ItemsCatalog = ({ items, allCount, setCountState }) => {
  const [allItems, setAllItems] = useState(items);
  const [filteredItems, setFilteredItems] = useState(items);
  const [limit, setLimit] = useState(35);
  const furnisherFilterArr = useRecoilValue(furnishersFilterState);
  const availabilityFilter = useRecoilValue(availabilityFilterState);
  const sort = useRecoilValue(sortState);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/kitchensToOrder") {
      setLimit(Infinity);
    }
  }, []);

  useEffect(() => {
    setAllItems(allItems);
  }, [items]);

  useEffect(() => {
    if (sort === "none") {
      setFilteredItems(allItems);
      setCountState(allCount);
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
      if (setCountState) setCountState(allCount);
      return;
    }

    const resultArray = allItems.filter((item) =>
      furnisherFilterArr.includes(item.furnisherId)
    );
    setFilteredItems(resultArray);
    if (setCountState) setCountState(resultArray.length);
  }, [furnisherFilterArr, allItems]);

  useEffect(() => {
    if (!availabilityFilter) {
      setFilteredItems(allItems);
      if (setCountState) setCountState(allCount);
      return;
    }

    const resultArray = allItems.filter((item) => item.availability);
    setFilteredItems(resultArray);
    if (setCountState) setCountState(resultArray.length);
  }, [availabilityFilter, allItems]);

  useEffect(() => {
    const handleScroll = throttle(async () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const footer = document.querySelector(".Footer_container__Mn8SS");
      let footerHeight;
      if (footer) {
        footerHeight = footer.offsetHeight;
      }

      if (scrollTop + clientHeight >= scrollHeight - footerHeight)
        setLimit((prevState) => prevState + 35);
    }, 500);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    router.query.subcategoryId,
    router.query.categoryId,
    router.query.furnisherId,
  ]);

  return (
    <>
      <div className={styles.list}>
        {filteredItems?.slice(0, limit).map((item) => (
          <ItemCard item={item} key={item._id} />
        ))}
      </div>
    </>
  );
};

export default ItemsCatalog;
