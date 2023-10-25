import styles from "./CategoriesPreview.module.css";
import { useRouter } from "next/router";
import NewsSlider from "../NewsSlider/NewsSlider";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import cancelAction from "@/utils/cancelAction";
import image1 from "@/assets/categoriesPreview1.png";
import image2 from "@/assets/categoriesPreview2.png";
import image3 from "@/assets/categoriesPreview3.png";

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
      image: image1.src,
    },
    {
      text: "Салоны продаж",
      function: () => router.push("/salons"),
      image: image2.src,
    },
    { text: "Мебель со скидкой", function: goToCategories, image: image3.src },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.categoriesList}>
        {mockText.map((item, index) => (
          <div className={styles.item} key={index} onClick={item.function}>
            <span className={styles.itemText}>{item.text}</span>
            <LazyLoadImage
              src={item.image}
              alt="photo"
              className={styles.image}
              draggable={false}
              onDragStart={cancelAction}
              onContextMenu={cancelAction}
            />
          </div>
        ))}
      </div>
      <NewsSlider news={news} />
    </div>
  );
};

export default CategoriesPreview;
