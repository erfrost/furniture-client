import styles from "./MobileNav.module.css";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import HeartIcon from "@/assets/heartIcon";
import CartIcon from "@/assets/cartIcon";
import Link from "next/link";
import Search from "../Search/Search";
import { useRouter } from "next/router";
import logo from "@/assets/logoBlack.svg";
import Image from "next/image";
import cancelAction from "@/utils/cancelAction";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      setIsOpen(false);
      router.push(`search?search=${searchText}`);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");

    if (isOpen) {
      body.style.transition = "all 0.3s ease 0s";
      body.style.overflow = "hidden";
      if (screenWidth < 550) {
        body.style.transform = "translate(200px, 0)";
      } else {
        body.style.transform = "translate(300px, 0)";
      }
    } else {
      body.style.transform = "none";
      body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const body = document.querySelector("body");
    const header = document.querySelector(".MobileNav_container__k3Zl_");
    if (!header) return;

    const handleClick = (event) => {
      const isClickInsideHeader = header.contains(event.target);
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

  return (
    <div className={styles.container}>
      <div
        className={styles.btn}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <HamburgerIcon color="#697862" boxSize="60%" />
      </div>
      <div
        className={styles.menu}
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
      >
        <Search
          searchText={searchText}
          setSearchText={setSearchText}
          onEnterClick={handleKeyDown}
        />
        <Link href="#" className={styles.link} onClick={() => setIsOpen(false)}>
          Каталог
        </Link>
        <Link href="#" className={styles.link} onClick={() => setIsOpen(false)}>
          О нас
        </Link>
        <Link href="#" className={styles.link} onClick={() => setIsOpen(false)}>
          Мероприятия
        </Link>
        <Link href="#" className={styles.link} onClick={() => setIsOpen(false)}>
          Полезное
        </Link>
        <Link href="#" className={styles.link} onClick={() => setIsOpen(false)}>
          Вопрос - ответ
        </Link>
      </div>
      <Link href="/" className={styles.logoLink}>
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
      <div className={styles.iconsContainer}>
        <HeartIcon />
        <CartIcon />
      </div>
    </div>
  );
};

export default MobileNav;
