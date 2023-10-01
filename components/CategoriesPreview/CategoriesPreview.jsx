import styles from "./CategoriesPreview.module.css";
import { useRouter } from "next/router";
import NewsSlider from "../NewsSlider/NewsSlider";

const CategoriesPreview = ({ news }) => {
  const router = useRouter();

  const goToCategories = async () => {
    const dicountCatalog = document.querySelector(
      ".homePage_catalogContainer___xOwi"
    );
    if (dicountCatalog) {
      dicountCatalog.scrollIntoView({ behavior: "smooth" });
    }
  };

  const mockText = [
    {
      text: "Кухни на заказ",
      function: () => router.push("/kitchensToOrder"),
    },
    { text: "Салоны продаж", function: () => router.push("/salons") },
    { text: "Мебель со скидкой", function: goToCategories },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.categoriesList}>
        {mockText.map((item, index) => (
          <div className={styles.item} key={index} onClick={item.function}>
            <span className={styles.itemText}>{item.text}</span>
            <svg
              width="32"
              height="9"
              viewBox="0 0 32 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31 5.1C31.3314 5.1 31.6 4.83137 31.6 4.5C31.6 4.16863 31.3314 3.9 31 3.9V5.1ZM0.575733 4.07574C0.341419 4.31005 0.341419 4.68995 0.575733 4.92426L4.39411 8.74264C4.62843 8.97696 5.00832 8.97696 5.24264 8.74264C5.47695 8.50833 5.47695 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47695 0.871573 5.47695 0.491674 5.24264 0.257359C5.00832 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575733 4.07574ZM31 3.9L0.999998 3.9V5.1L31 5.1V3.9Z"
                fill="#656565"
              />
            </svg>
          </div>
        ))}
      </div>
      <NewsSlider news={news} />
    </div>
  );
};

export default CategoriesPreview;
