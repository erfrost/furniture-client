import furnituresIds from "../../mock/furnituresIds";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoriesCatalog.module.css";

const CategoriesCatalog = ({ categories }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Наш каталог</span>
      <div className={styles.list}>
        {categories
          ?.filter((cat) => !furnituresIds.includes(cat._id))
          .map((cat) => (
            <CategoryItem category={cat} key={cat._id} />
          ))}
      </div>
    </div>
  );
};

export default CategoriesCatalog;
