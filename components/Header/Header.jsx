import styles from "./Header.module.css";
import { PhoneIcon } from "@chakra-ui/icons";
import CartIcon from "@/assets/cartIcon";
import Search from "../Search/Search";
import HeartIcon from "@/assets/heartIcon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import logo from "@/assets/logoBlack.svg";
import Image from "next/image";
import cancelAction from "@/utils/cancelAction";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { getFavoritesFromCookie } from "@/utils/favorites";
import axiosInstance from "@/axios.config";
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import arrow from "@/assets/swiperArrow.svg";

const Header = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [searchText, setSearchText] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [reqError, setReqError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      router.push(`search?search=${searchText}`);
    }
  };

  const fetchFavoriteItems = async () => {
    if (!favoriteItems.length) {
      try {
        setIsLoading(true);

        const items = await axiosInstance.post("items/favorites", {
          itemIds: getFavoritesFromCookie(),
        });
        console.log(items);
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
    const popover = document.querySelector(".chakra-popover__popper");
    if (popover) {
      popover.style.width = "586px";
    }
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
      <div className={styles.phoneContainer}>
        <div className={styles.photoIcon}>
          <PhoneIcon color="#262626" fontSize="large" boxSize="45%" />
        </div>
        <a href="tel:" className={styles.phone}>
          +7 (951) 117-28-56
        </a>
      </div>
      <Popover
        isOpen={isOpen}
        onOpen={() => {
          onOpen();
          fetchFavoriteItems();
        }}
        onClose={onClose}
        placement="bottom-end"
      >
        <PopoverTrigger>
          <div>
            <HeartIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent className={styles.popoverContent}>
          {/* <div className={`${styles.swiperBtn} ${styles.leftBtn}`}>
            <Image src={arrow} alt="btn" />
          </div> */}
          <div className={styles.popoverHeader}>Избранные товары</div>
          {isLoading ? (
            <LoadSpinner />
          ) : (
            <div className={styles.list}>
              {favoriteItems.map((item) => (
                <FavoriteItem key={item._id} item={item} />
              ))}
            </div>
          )}
          {/* <div className={`${styles.swiperBtn} ${styles.rightBtn}`}>
            <Image src={arrow} alt="btn" />
          </div> */}
        </PopoverContent>
      </Popover>
      <CartIcon />
    </div>
  );
};

export default Header;
