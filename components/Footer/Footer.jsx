import logo from "@/assets/logoWhite.svg";
import styles from "./Footer.module.css";
import Link from "next/link";
import TelegramWhite from "@/assets/telegramWhite";
import OdnoklassnikiWhite from "@/assets/odnoklassnikiWhite";
import VkWhite from "@/assets/vkWhite";
import { Divider } from "@chakra-ui/react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/">
          <Image
            className={styles.logo}
            src={logo}
            alt="logo"
            width={120}
            height={50}
          />
        </Link>
        <div className={styles.infoContainer}>
          <div className={styles.listContainer}>
            <span className={styles.title}>Навигация</span>
            <Link href="/aboutUs" className={styles.link}>
              О нас
            </Link>
            <Link href="/refund" className={styles.link}>
              Условия возврата
            </Link>
            <Link href="/deliveryAndPayment" className={styles.link}>
              Доставка и оплата
            </Link>
            <Link href="/salons" className={styles.link}>
              Салоны продаж
            </Link>
            <Link href="/kitchensToOrder" className={styles.link}>
              Кухни на заказ
            </Link>
          </div>
          <div className={styles.listContainer}>
            <span className={styles.title}>Контакты</span>
            <div className={styles.social}>
              <TelegramWhite />
              <VkWhite />
              <OdnoklassnikiWhite />
            </div>
            <Link href="mailto:89227720462@mail.ru">
              <span className={styles.socialLink}>89227720462@mail.ru</span>
            </Link>
            <Link href="tel:+7 (929) 298-01-23">
              <span className={styles.socialLink}>+7 (929) 298-01-23</span>
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