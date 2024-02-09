import arrow from "../../assets/routerArrow.svg";
import styles from "./RouteToHome.module.css";
import Image from "next/image";
import cancelAction from "../../utils/cancelAction";
import Link from "next/link";

const RouteToHome = ({ category, subcategory, furnisher }) => {
  return (
    <div className={styles.container}>
      <div className={styles.routerContainer}>
        <Image
          src={arrow}
          alt="arrow"
          className={styles.image}
          draggable={false}
          onDragStart={cancelAction}
          onContextMenu={cancelAction}
        />
        <Link href="/" className={styles.routerTitle}>
          Вернуться на главную
        </Link>
      </div>
      {category && subcategory && furnisher ? (
        <div className={styles.navContainer}>
          <Link
            href="/category/[categoryId]"
            as={`/category/${category._id}`}
            className={styles.navItem}
          >
            {category.title}
          </Link>
          <Link
            href="/subcategory/[subcategoryId]"
            as={`/subcategory/${subcategory._id}`}
            className={styles.navItem}
          >
            {", " + subcategory.title}
          </Link>
          <Link
            href="/furnisher/[furnisherId]"
            as={`/furnisher/${furnisher}`}
            className={styles.navItem}
          >
            {", " + furnisher}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default RouteToHome;
