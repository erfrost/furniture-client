import cancelAction from "../../utils/cancelAction";
import styles from "./SalonItem.module.css";
import Link from "next/link";
import Image from "next/image";

const SalonItem = ({ salon }) => {
  return (
    <div className={styles.container}>
      <Image
        src={salon.img.src}
        alt="image"
        width={300}
        height={300}
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
