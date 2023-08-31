import styles from "./Header.module.css";
import { PhoneIcon } from "@chakra-ui/icons";
import CartIcon from "@/assets/cartIcon";
import Search from "../Search/Search";
import HeartIcon from "@/assets/heartIcon";
import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { searchItemsState } from "@/storage/atoms";
import AlertInfo from "../AlertInfo/AlertInfo";
import { useRouter } from "next/router";
import logo from "@/assets/logoBlack.svg";
import Image from "next/image";
import cancelAction from "@/utils/cancelAction";

const Header = () => {
  const [searchItems, setSearchItems] = useRecoilState(searchItemsState);
  const [searchText, setSearchText] = useState("");
  const [reqError, setReqError] = useState(null);

  const router = useRouter();

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      router.push(`search?search=${searchText}`);
    }
  };

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
      <HeartIcon />
      <CartIcon />
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
