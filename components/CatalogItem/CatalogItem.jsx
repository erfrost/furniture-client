import Image from "next/image";
import styles from "./CatalogItem.module.css";
import { BACKEND_IMAGES_URL } from "@/config";

const CatalogItem = ({ item }) => {
  console.log(BACKEND_IMAGES_URL);
  console.log(item);
  return (
    <div className={styles.container}>
      <Image
        src={BACKEND_IMAGES_URL + item.photo_name}
        alt="category"
        width={250}
        height={150}
        priority={true}
        className={styles.image}
      />
      <span className={styles.title}>{item.title}</span>
    </div>
  );
};

CatalogItem.getInitialProps = async ({ query }) => {
  try {
    console.log(query);
    const { _id: id } = query.item;
  } catch (error) {}
};

export default CatalogItem;
