import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./ImagesList.module.css";
import cancelAction from "@/utils/cancelAction";

const ImagesList = ({ item, setCurrentImageIndex }) => {
  return (
    <div className={styles.imagesList}>
      {item?.photo_names?.map((img, index) => (
        <LazyLoadImage
          key={index}
          src={img}
          effect="blur"
          className={styles.miniImage}
          onDragStart={cancelAction}
          onContextMenu={cancelAction}
          onClick={() => setCurrentImageIndex(index)}
        />
      ))}
      {/* <div className={`${styles.arrowContainer} + ${styles.bottom}`}>
        <ChevronDownIcon />
      </div> */}
    </div>
  );
};

export default ImagesList;
