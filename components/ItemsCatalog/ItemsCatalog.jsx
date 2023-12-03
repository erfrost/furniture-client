/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./ItemsCatalog.module.css";
import axiosInstance from "@/axios.config";
import AlertInfo from "../AlertInfo/AlertInfo";
import { throttle } from "lodash";
import { useRecoilValue } from "recoil";
import { furnishersFilterState, sortState } from "@/storage/atoms";
import { useRouter } from "next/router";
import Image from "next/image";

const ItemsCatalog = ({
  items,
  allCount,
  setCountState,
  isDiscountPage,
  loadFunc,
}) => {
  const [allItems, setAllItems] = useState(items);
  const [filteredItems, setFilteredItems] = useState(items);
  const [subcategoryId, setSubcategoryId] = useState(undefined);
  const furnisherFilterArr = useRecoilValue(furnishersFilterState);
  const sort = useRecoilValue(sortState);
  const [reqError, setReqError] = useState(null);
  let isLoading = false;
  let offset = 25;
  let emptyMoreItems = false;

  const router = useRouter();

  useEffect(() => {
    setSubcategoryId(router.query.subcategoryId);
  }, [router.query.subcategoryId]);

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
    if (!isLoading && !emptyMoreItems) {
      isLoading = true;
      try {
        let res;

        if (isDiscountPage) {
          res = await axiosInstance.get(
            `items/discount?limit=25&offset=${offset}`
          );
        } else res = await loadFunc(offset);

        if (!res.data.items.length) return (emptyMoreItems = true);
        setAllItems((prevState) => [...prevState, ...res.data.items]);
      } catch (error) {
        console.log(error);
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
  console.log(router);
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
        loadMoreItems();
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
        {subcategoryId === "654f52db3cef74b2b79bc645"
          ? items.map((item) => (
              <Image
                className={styles.image}
                key={item._id}
                src={item.photo_name}
                alt="photo"
                width={300}
                height={100}
              />
            ))
          : filteredItems?.map((item) => (
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
