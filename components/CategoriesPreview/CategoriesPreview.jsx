import Image from "next/image";
import styles from "./CategoriesPreview.module.css";
import stool from "@/assets/stool.png";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import cancelAction from "@/utils/cancelAction";
import NewsSlider from "../NewsSlider/NewsSlider";

const CategoriesPreview = ({ categories, news }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.categoriesList}>
        {categories?.slice(0, 3).map((cat) => (
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
            onClick={() => router.push(`/category/${cat._id}`)}
          >
            <span className={styles.itemText}>{cat.title}</span>
            <Image
              src={stool}
              alt="stool"
              width={160}
              height={152}
              priority
              className={styles.image}
              onDragStart={cancelAction}
              onContextMenu={cancelAction}
            />
          </motion.div>
        ))}
      </div>
      <NewsSlider news={news} />
    </div>
  );
};

export default CategoriesPreview;
