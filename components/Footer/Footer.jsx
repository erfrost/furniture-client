import LogoWhite from "@/assets/logoWhite";
import styles from "./Footer.module.css";
import Link from "next/link";
import TelegramWhite from "@/assets/telegramWhite";
import OdnoklassnikiWhite from "@/assets/odnoklassnikiWhite";
import VkWhite from "@/assets/vkWhite";
import { Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [screenWidth, setScreenWidth] = useState(null);

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

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/">
          <LogoWhite />
        </Link>
        <div className={styles.infoContainer}>
          <div className={styles.listContainer}>
            <span className={styles.title}>Навигация</span>
            <Link href="#" className={styles.link}>
              О нас
            </Link>
            <Link href="#" className={styles.link}>
              Мероприятия
            </Link>
            <Link href="#" className={styles.link}>
              Полезное
            </Link>
            <Link href="#" className={styles.link}>
              Вопрос-ответ
            </Link>
          </div>
          <div className={styles.listContainer}>
            <span className={styles.title}>Навигация</span>
            <div className={styles.social}>
              <TelegramWhite />
              <VkWhite />
              <OdnoklassnikiWhite />
            </div>
            <Link href="tel:">
              <span className={styles.phoneNumber}>+7 (951) 117-56-39</span>
            </Link>
          </div>
        </div>
      </div>
      <Divider className={styles.divider} />
      <div className={styles.bottom}>
        <span className={styles.rules}>
          © 2023 Мебельный центр Дом. Все права защищены
        </span>
      </div>
    </div>
  );
};

export default Footer;
