import { useRouter } from "next/router";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoriesCatalog.module.css";

const CategoriesCatalog = ({ categories }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Наш каталог</span>
      <div className={styles.list}>
        {categories?.map((cat) => (
          <CategoryItem key={cat._id} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesCatalog;
