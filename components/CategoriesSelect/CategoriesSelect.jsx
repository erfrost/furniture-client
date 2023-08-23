import Link from "next/link";
import styles from "./CategoriesSelect.module.css";
import Icon from "@/assets/catalogIcon";

const CategoriesSelect = ({ categories }) => {
  return (
    <div className={styles.container}>
      <div className={styles.catalogBtn}>
        <Icon />
        <span className={styles.catalogBtnText}>Каталог</span>
      </div>
      <div className={styles.categories}>
        {categories.slice(0, 5).map((cat) => (
          <Link href="#" key={cat._id} className={styles.link}>
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSelect;
