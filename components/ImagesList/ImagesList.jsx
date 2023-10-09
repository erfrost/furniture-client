import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./ImagesList.module.css";
import cancelAction from "@/utils/cancelAction";
import { BACKEND_IMAGES_URL } from "@/config";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const ImagesList = ({ item, setCurrentImageIndex }) => {
  return (
    <div className={styles.imagesList}>
      {/* <div className={`${styles.arrowContainer} ${styles.top}`}>
        <ChevronUpIcon />
      </div> */}
      {item?.photo_names?.map((img, index) => (
        <LazyLoadImage
          key={index}
          src={BACKEND_IMAGES_URL + img}
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