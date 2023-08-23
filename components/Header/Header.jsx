import Logo from "@/assets/logo";
import styles from "./Header.module.css";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import Heart from "@/assets/heartIcon";
import CartIcon from "@/assets/cartIcon";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <InputGroup>
        <InputLeftElement pointerEvents="none" height="48px">
          <SearchIcon color="#262626" />
        </InputLeftElement>
        <Input className={styles.input} placeholder="Введите запрос" />
      </InputGroup>
      <div className={styles.phoneContainer}>
        <div className={styles.photoIcon}>
          <PhoneIcon color="#262626" fontSize="large" />
        </div>
        <a href="tel:" className={styles.phone}>
          +7 (951) 117-28-56
        </a>
      </div>
      <Heart className={styles.icon} />
      <CartIcon className={styles.icon} />
    </div>
  );
};
export default Header;
