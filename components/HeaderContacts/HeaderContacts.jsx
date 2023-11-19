import styles from "./HeaderContacts.module.css";
import Link from "next/link";

const HeaderContacts = () => {
  return (
    <Link className={styles.btn} href="/contacts">
      Контакты
    </Link>
  );
};

export default HeaderContacts;
