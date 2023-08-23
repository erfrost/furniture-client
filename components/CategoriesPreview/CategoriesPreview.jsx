import Image from "next/image";
import styles from "./CategoriesPreview.module.css";
import stool from "@/assets/stool.png";
import stool2 from "@/assets/stool2.png";
import { useState } from "react";
import { motion } from "framer-motion";

const CategoriesPreview = ({ categories }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.categoriesList}>
        {categories.slice(0, 3).map((cat) => (
          <motion.div
            initial={{
              background: "linear-gradient(to right, #ADBFA4, #85977C)",
            }}
            whileHover={{
              background: "linear-gradient(to right, #85977C, #ADBFA4)",
              transition: { duration: 0.3 },
            }}
            className={styles.item}
            key={cat._id}
          >
            <span className={styles.itemText}>{cat.title}</span>
            <Image
              src={stool}
              alt="stool"
              width={160}
              height={152}
              className={styles.image}
            />
          </motion.div>
        ))}
      </div>
      <div className={styles.sliderContainer}>
        <div className={styles.content}>
          <div className={styles.texts}>
            <span className={styles.titleMain}>Широкий ассортимент кресел</span>
            <span className={styles.titleSubmain}>
              Lorem ipsum dolor sim ament Lorem ipsum dolor sim ament
            </span>
          </div>
          <div className={styles.btn}>Перейти к разделу</div>
        </div>
        <Image
          src={stool2}
          alt="stool2"
          width={381}
          height={339}
          className={styles.sliderImage}
        />
        <div className={styles.slider}>
          <div
            className={`${styles.line} ${
              activeIndex === 1 ? styles.active : null
            }`}
            onClick={() => setActiveIndex(1)}
          ></div>
          <div
            className={`${styles.line} ${
              activeIndex === 2 ? styles.active : null
            }`}
            onClick={() => setActiveIndex(2)}
          ></div>
          <div
            className={`${styles.line} ${
              activeIndex === 3 ? styles.active : null
            }`}
            onClick={() => setActiveIndex(3)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPreview;
