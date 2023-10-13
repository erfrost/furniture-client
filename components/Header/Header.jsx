/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Header.module.css";
import { PhoneIcon } from "@chakra-ui/icons";
import cartIcon from "@/assets/cartIcon.svg";
import Search from "../Search/Search";
import heartIcon from "@/assets/heartIcon.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import logo from "@/assets/logoBlack.svg";
import Image from "next/image";
import cancelAction from "@/utils/cancelAction";
import { getFavoritesFromCookie } from "@/utils/favorites";
import axiosInstance from "@/axios.config";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import AlertInfo from "../AlertInfo/AlertInfo";

const Header = () => {
  const [popoverActive, setPopoverActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [reqError, setReqError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
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
            width={105}
            height={73}
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
      />
      <Link href="tel: +7 (929) 298-01-23" className={styles.phoneContainer}>
        <div className={styles.photoIcon}>
          <PhoneIcon color="#262626" fontSize="large" boxSize="45%" />
        </div>
        <span className={styles.phone}>+7 (929) 298-01-23</span>
      </Link>
      <div className={styles.favoriteRelative}>
        <div
          id="favoriteIcon"
          onClick={() => setPopoverActive((prevState) => !prevState)}
        >
          <Image
            className={styles.heartIcon}
            src={heartIcon}
            alt="heartIcon"
            width={50}
            height={50}
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
                  <FavoriteItem key={item._id} item={item} />
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
          width={50}
          height={50}
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
