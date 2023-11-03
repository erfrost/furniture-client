import { useEffect, useState } from "react";
import styles from "./HeaderContacts.module.css";
import { ChevronDownIcon } from "@chakra-ui/icons";

const HeaderContacts = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const list = document.querySelector(".HeaderContacts_list__s6iXe");
    if (!list) return;
    if (isOpen) {
      list.style.display = "flex";
      setTimeout(() => {
        list.style.opacity = "1";
      }, 0);
    } else {
      console.log("close");
      list.style.opacity = "0";
      setTimeout(() => {
        list.style.display = "none";
      }, 300);
    }
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <div
        className={styles.btn}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        Контакты
        <ChevronDownIcon className={styles.icon} />
      </div>
      <div className={styles.list}>
        <span className={styles.item}>
          г.Нижневартовск МЦ Дом ул. Кузоваткина 3 стр. 9 - +7 (922) 773-22-55
        </span>
        <span className={styles.item}>
          г.Нижневартовск ИЦ Гулливер Индустриальная 46 стр.1 - +7 (922)
          772-04-62
        </span>
        <span className={styles.item}>
          г.Лангепас Отдел Кухонька Мира 7 - +7 (932) 409-99-18
        </span>
      </div>
    </div>
  );
};

export default HeaderContacts;
