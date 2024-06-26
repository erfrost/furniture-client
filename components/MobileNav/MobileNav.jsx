/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./MobileNav.module.css";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import heartIcon from "../../assets/heartIcon.svg";
import cartIcon from "../../assets/cartIcon.svg";
import Link from "next/link";
import Search from "../Search/Search";
import { useRouter } from "next/router";
import logo from "../../assets/logo.svg";
import Image from "next/image";
import cancelAction from "../../utils/cancelAction";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import AlertInfo from "../AlertInfo/AlertInfo";
import { getFavoritesFromCookie } from "../../utils/favorites";
import axiosInstance from "../../axios.config";
import { Divider } from "@chakra-ui/react";

const MobileNav = () => {
  const [popoverActive, setPopoverActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [reqError, setReqError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const router = useRouter();

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && searchText.length > 0) {
      inputRef.current.blur();
      setIsOpen(false);
      router.push(`search?search=${searchText}`);
    }
  };

  useEffect(() => {
    const body = document.querySelector("body");

    if (isOpen) {
      body.style.transition = "all 0.3s ease 0s";
      body.style.overflow = "hidden";
      body.style.transform = "translate(300px, 0)";
    } else {
      body.style.transform = "none";
      body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const body = document.querySelector("body");
    const header = document.querySelector(".MobileNav_container__k3Zl_");
    if (!header) return;

    const handleClick = (e) => {
      const isClickInsideHeader = header.contains(e.target);
      if (!isClickInsideHeader) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      body.addEventListener("click", handleClick);
      body.addEventListener("touchstart", handleClick);
    }

    return () => {
      body.removeEventListener("click", handleClick);
      body.removeEventListener("touchstart", handleClick);
    };
  }, [isOpen]);

  const goToCategories = async () => {
    setIsOpen(false);
    if (router.pathname !== "/") {
      await router.push("/");

      setTimeout(() => {
        const catalog = document.querySelector(
          ".CategoriesCatalog_container__4lSB5"
        );
        if (catalog) {
          catalog.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      setTimeout(() => {
        const catalog = document.querySelector(
          ".CategoriesCatalog_container__4lSB5"
        );
        if (catalog) {
          catalog.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  const fetchFavoriteItems = async () => {
    if (!favoriteItems.length) {
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
    }
  };

  useEffect(() => {
    if (popoverActive) {
      fetchFavoriteItems();
    }
  }, [popoverActive]);

  return (
    <div className={styles.container}>
      <div
        className={styles.btn}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <HamburgerIcon color="#697862" boxSize="60%" />
      </div>
      <div className={styles.menu}>
        <Search
          searchText={searchText}
          setSearchText={setSearchText}
          onEnterClick={handleKeyDown}
          inputRef={inputRef}
        />
        <div className={styles.link} onClick={goToCategories}>
          Каталог
        </div>
        <Divider />
        <Link
          href="/promotion"
          className={styles.link}
          onClick={() => setIsOpen(false)}
        >
          Акция
        </Link>
        <Divider />
        <Link
          href="/kitchensToOrder"
          className={styles.link}
          onClick={() => setIsOpen(false)}
        >
          Кухни на заказ
        </Link>
        <Divider />
        <Link
          href="/aboutUs"
          className={styles.link}
          onClick={() => setIsOpen(false)}
        >
          О нас
        </Link>
        <Divider />
        <Link
          href="/refund"
          className={styles.link}
          onClick={() => setIsOpen(false)}
        >
          Условия возврата
        </Link>
        <Divider />
        <Link
          href="/deliveryAndPayment"
          className={styles.link}
          onClick={() => setIsOpen(false)}
        >
          Доставка и оплата
        </Link>
        <Divider />
        <Link
          href="/contacts"
          className={styles.link}
          onClick={() => setIsOpen(false)}
        >
          Контакты
        </Link>
      </div>
      <Link href="/" className={styles.logoLink}>
        <Image
          src={logo}
          alt="logo"
          className={styles.logo}
          onDragStart={cancelAction}
          onContextMenu={cancelAction}
        />
      </Link>
      <div className={styles.iconsContainer}>
        <div className={styles.favoriteRelative}>
          <div
            id="favoriteIcon"
            onClick={() => setPopoverActive((prevState) => !prevState)}
          >
            <Image
              className={styles.heartIcon}
              src={heartIcon}
              alt="heartIcon"
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
                      item={item}
                      key={item._id}
                      setFavoriteItems={setFavoriteItems}
                    />
                  ))
                ) : (
                  <span className={styles.nullFavorites}>
                    Ничего не найдено
                  </span>
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

export default MobileNav;
