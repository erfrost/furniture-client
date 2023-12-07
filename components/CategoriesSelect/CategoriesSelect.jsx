import Link from "next/link";
import styles from "./CategoriesSelect.module.css";
import catalogIcon from "@/assets/catalogIcon.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import cancelAction from "@/utils/cancelAction";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import furnituresIds from "@/mock/furnituresIds";

const CategoriesSelect = ({ categories, subcategories }) => {
  const [currentSubcategories, setCurrentSubcategories] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);

  const officeCategory = categories[7];

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
    if (screenWidth > 1500) return 7;
    else if (screenWidth > 1425) return 6;
    else if (screenWidth > 1225) return 5;
    else if (screenWidth > 1060) return 4;
    else if (screenWidth > 950) return 3;
    else if (screenWidth > 850) return 2;
    else return 1;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
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
            <Popover key={cat._id}>
              <PopoverTrigger>
                <div className={styles.link}>{cat.title}</div>
              </PopoverTrigger>
              <PopoverContent className={styles.popoverContent}>
                <PopoverBody className={styles.popoverBody}>
                  <Link
                    href="/category/[categoryId]"
                    as={`/category/${cat._id}`}
                    className={`${styles.link} ${styles.catLink}`}
                  >
                    {cat.title}
                  </Link>
                  {subcategories
                    .filter((subcat) => subcat.category_id === cat._id)
                    .map((subcat) => (
                      <Link
                        href={`${
                          subcat._id === "656da2464eecad4547e7066c"
                            ? "/furnitures"
                            : "/subcategory/[subcategoryId]"
                        }`}
                        as={
                          subcat._id === "656da2464eecad4547e7066c"
                            ? "/furnitures"
                            : `/subcategory/${subcat._id}`
                        }
                        className={`${styles.link} ${styles.subcatLink}`}
                        key={subcat._id}
                      >
                        {subcat.title}
                      </Link>
                    ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ))}
          {
            <Popover key={officeCategory._id}>
              <PopoverTrigger>
                <div className={styles.link}>{officeCategory.title}</div>
              </PopoverTrigger>
              <PopoverContent className={styles.popoverContent}>
                <PopoverBody className={styles.popoverBody}>
                  <Link
                    href="/category/[categoryId]"
                    as={`/category/${officeCategory._id}`}
                    className={`${styles.link} ${styles.catLink}`}
                  >
                    {officeCategory.title}
                  </Link>
                  {subcategories
                    .filter(
                      (subcat) => subcat.category_id === officeCategory._id
                    )
                    .map((subcat) => (
                      <Link
                        href={`${
                          subcat._id === "656da2464eecad4547e7066c"
                            ? "/furnitures"
                            : "/subcategory/[subcategoryId]"
                        }`}
                        as={
                          subcat._id === "656da2464eecad4547e7066c"
                            ? "/furnitures"
                            : `/subcategory/${subcat._id}`
                        }
                        className={`${styles.link} ${styles.subcatLink}`}
                        key={subcat._id}
                      >
                        {subcat.title}
                      </Link>
                    ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          }
          <Link href="/promotion" className={`${styles.link} ${styles.bold}`}>
            Акция
          </Link>
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
                {categories
                  ?.filter((cat) => !furnituresIds.includes(cat._id))
                  .map((cat) => (
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
                      href="/category/[categoryId]"
                      as={`/category/${cat._id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Image
                        src={cat.photo_name}
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
                <div className={styles.promotionLink}>
                  <Link
                    href="/promotion"
                    className={`${styles.catTitle} ${styles.promotionLink}`}
                  >
                    Акция
                  </Link>
                </div>
              </div>
              <div className={`${styles.column} ${styles.subcategoriesColumn}`}>
                {currentSubcategories?.map((subcat) => (
                  <Link
                    className={styles.subcategoryTitle}
                    key={subcat._id}
                    href={
                      subcat._id === "654f52db3cef74b2b79bc645"
                        ? "/kitchenWorks"
                        : subcat._id === "654bb115c2fbb0f34ee5a6e8"
                        ? "/kitchens"
                        : "/subcategory/[subcategoryId]"
                    }
                    as={
                      subcat._id === "654f52db3cef74b2b79bc645"
                        ? "/kitchenWorks"
                        : subcat._id === "654bb115c2fbb0f34ee5a6e8"
                        ? "/kitchens"
                        : `/subcategory/${subcat._id}`
                    }
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
      <Link href="/kitchensToOrder" className={styles.kitchenBtn}>
        Кухни на заказ
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
      </Link>
    </div>
  );
};

export default CategoriesSelect;
