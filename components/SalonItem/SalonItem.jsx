import cancelAction from "@/utils/cancelAction";
import styles from "./SalonItem.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Link from "next/link";

const SalonItem = ({ salon }) => {
  console.log(salon);
  return (
    <div className={styles.container}>
      <LazyLoadImage
        src={salon.img.src}
        alt="image"
        className={styles.image}
        draggable={false}
        onDragStart={cancelAction}
        onContextMenu={cancelAction}
      />
      <span className={styles.city}>{salon.city}</span>
      <span className={styles.address}>{salon.address}</span>
      <Link href="tel:" className={styles.phone}>
        {salon.phone}
      </Link>
    </div>
  );
};

export default SalonItem;
