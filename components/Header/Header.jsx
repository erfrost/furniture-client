/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Header.module.css";
import cartIcon from "@/assets/cartIcon.svg";
import Search from "../Search/Search";
import heartIcon from "@/assets/heartIcon.svg";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import cancelAction from "@/utils/cancelAction";
import { getFavoritesFromCookie } from "@/utils/favorites";
import axiosInstance from "@/axios.config";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import AlertInfo from "../AlertInfo/AlertInfo";
import logo from "@/assets/logo.svg";
import HeaderContacts from "../HeaderContacts/HeaderContacts";

const Header = () => {
  const [popoverActive, setPopoverActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [reqError, setReqError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const router = useRouter();

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && searchText.length > 0) {
      inputRef.current.blur();
      router.push(`/search?search=${searchText}`);
    }
  };

  const fetchFavoriteItems = async () => {
    try {
      setIsLoading(true);
      const items = await axiosInstance.post("items/by_ids", {
        itemIds: getFavoritesFromCookie(),
      });
      setFavoriteItems(items.data);
    } catch (error) {
      setReqError(
        error?.response?.data?.message ||
          "Произошла ошибка запроса. Попробуйте позднее"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (popoverActive) {
      fetchFavoriteItems();
    }
  }, [popoverActive]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const popoverContent = document.querySelector(
        `.${styles.popoverContent}`
      );
      const icon = document.getElementById("favoriteIcon");
      if (
        popoverContent &&
        !popoverContent.contains(e.target) &&
        !icon.contains(e.target)
      ) {
        setPopoverActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            priority
            className={styles.logo}
            onDragStart={cancelAction}
            onContextMenu={cancelAction}
          />
        </Link>
      </div>
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        onEnterClick={handleKeyDown}
        inputRef={inputRef}
      />
      <HeaderContacts />
      <div className={styles.favoriteRelative}>
        <div
          id="favoriteIcon"
          onClick={() => setPopoverActive((prevState) => !prevState)}
        >
          <Image
            className={styles.heartIcon}
            src={heartIcon}
            alt="Главная"
            draggable={false}
            onDragStart={cancelAction}
            onContextMenu={cancelAction}
          />
        </div>
        <div
          className={`${styles.popoverContent} ${
            popoverActive ? styles.show : null
          }`}
        >
          <div className={styles.popoverHeader}>Избранные товары</div>
          {isLoading ? (
            <LoadSpinner />
          ) : (
            <div className={styles.list}>
              {favoriteItems.length ? (
                favoriteItems.map((item) => (
                  <FavoriteItem
                    key={item._id}
                    item={item}
                    setFavoriteItems={setFavoriteItems}
                  />
                ))
              ) : (
                <span className={styles.nullFavorites}>Ничего не найдено</span>
              )}
            </div>
          )}
        </div>
      </div>
      <Link href="/cart">
        <Image
          className={styles.cartIcon}
          src={cartIcon}
          alt="cartIcon"
          draggable={false}
          onDragStart={cancelAction}
          onContextMenu={cancelAction}
        />
      </Link>
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

export default Header;
