import Link from "next/link";
import styles from "./CategoriesSelect.module.css";
import catalogIcon from "@/assets/catalogIcon.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import cancelAction from "@/utils/cancelAction";
import { BACKEND_IMAGES_URL } from "@/config";

const CategoriesSelect = ({ categories, subcategories }) => {
  const [currentSubcategories, setCurrentSubcategories] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
  console.log(isOpen);
  useEffect(() => {
    const body = document.querySelector("body");
    const btn = document.querySelector(".CategoriesSelect_catalogBtn__w5DQe");
    const select = document.querySelector(
      ".CategoriesSelect_selectContainer__92U0j"
    );
    if (!select) return;

    const handleClick = (e) => {
      const isClickInsideSelect = select.contains(e.target);
      const isClickInsideBtn = btn.contains(e.target);
      if (!isClickInsideSelect && !isClickInsideBtn && isOpen) {
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

  const calculatedCount = () => {
    if (screenWidth > 1250) return 5;
    else if (screenWidth > 1100) return 4;
    else if (screenWidth > 850) return 3;
    else return 2;
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.catalogBtn}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <Image
          src={catalogIcon}
          alt="catalogIcon"
          draggable={false}
          onDragStart={cancelAction}
          onContextMenu={cancelAction}
        />
        <span className={styles.catalogBtnText}>Каталог</span>
      </div>
      <div className={styles.categories}>
        {categories?.slice(0, calculatedCount())?.map((cat) => (
          <Link
            href={`/category/${cat._id}`}
            key={cat._id}
            className={styles.link}
          >
            {cat.title}
          </Link>
        ))}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.selectContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.column}>
              {categories?.map((cat) => (
                <Link
                  className={styles.catTitle}
                  key={cat._id}
                  onMouseEnter={() =>
                    setCurrentSubcategories(
                      subcategories.filter(
                        (subcat) => subcat.category_id === cat._id
                      )
                    )
                  }
                  href={`/category/${cat._id}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Image
                    src={BACKEND_IMAGES_URL + cat.photo_name}
                    alt="photo"
                    width={100}
                    height={75}
                    className={styles.categoryImage}
                    draggable={false}
                    onDragStart={cancelAction}
                    onContextMenu={cancelAction}
                  />
                  {cat.title}
                </Link>
              ))}
            </div>
            <div className={styles.column}>
              {currentSubcategories?.map((subcat) => (
                <Link
                  className={styles.subcategoryTitle}
                  key={subcat._id}
                  href={`/subcategory/${subcat._id}`}
                  onClick={() => setIsOpen(false)}
                >
                  {subcat.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoriesSelect;
