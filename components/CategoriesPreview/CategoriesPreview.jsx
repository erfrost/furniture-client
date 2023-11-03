import styles from "./CategoriesPreview.module.css";
import { useRouter } from "next/router";
import NewsSlider from "../NewsSlider/NewsSlider";
import cancelAction from "@/utils/cancelAction";
import image1 from "@/assets/categoriesPreview1.png";
import image2 from "@/assets/categoriesPreview2.png";
import image3 from "@/assets/categoriesPreview3.png";
import Image from "next/image";

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
      {/* <div className={styles.categoriesList}>
        {mockText.map((item, index) => (
          <div className={styles.item} key={index} onClick={item.function}>
            <span className={styles.itemText}>{item.text}</span>
            <Image
              src={item.image}
              alt="photo"
              width={150}
              height={150}
              className={styles.image}
              draggable={false}
              onDragStart={cancelAction}
              onContextMenu={cancelAction}
            />
          </div>
        ))}
      </div> */}
      <NewsSlider news={news} />
    </div>
  );
};

export default CategoriesPreview;
