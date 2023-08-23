import CatalogItem from "../CatalogItem/CatalogItem";
import styles from "./Catalog.module.css";

const Catalog = ({ categories }) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Наш каталог</span>
      <div className={styles.list}>
        {categories.map((cat) => (
          <CatalogItem key={cat._id} item={cat} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
