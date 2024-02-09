import furnituresIds from "../../mock/furnituresIds";
import styles from "./FurnituresList.module.css";
import Link from "next/link";
import Image from "next/image";
import Icon from "../../assets/subcategoryIcon.svg";
import cancelAction from "../../utils/cancelAction";
import { useRouter } from "next/router";

const FurnituresList = ({ categories, subcategories }) => {
  const router = useRouter();

  return (
    <div
      className={
        router.asPath === "/kitchensToOrder"
          ? `${styles.content} ${styles.kitchensContent}`
          : styles.content
      }
    >
      {categories
        ?.filter((cat) => furnituresIds.includes(cat._id))
        .map((cat) => (
          <div className={styles.item} key={cat._id}>
            <div className={styles.line}></div>
            <Link
              href="/category/[categoryId]"
              as={`/category/${cat._id}`}
              className={styles.catTitle}
            >
              {cat.title}
            </Link>
            {!subcategories?.filter((subcat) => subcat.category_id === cat._id)
              .length ? (
              <span className={styles.subcatTitle}>Пусто</span>
            ) : (
              subcategories
                ?.filter((subcat) => subcat.category_id === cat._id)
                .map((subcat) => (
                  <div className={styles.subcatContainer} key={subcat._id}>
                    <Image
                      src={Icon}
                      alt="icon"
                      onDragStart={cancelAction}
                      onContextMenu={cancelAction}
                    />
                    <Link
                      href="/subcategory/[subcategoryId]"
                      as={`/subcategory/${subcat._id}`}
                      className={styles.subcatTitle}
                    >
                      {subcat.title}
                    </Link>
                  </div>
                ))
            )}
          </div>
        ))}
    </div>
  );
};

export default FurnituresList;
