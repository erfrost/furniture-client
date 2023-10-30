import styles from "./ImagesList.module.css";
import cancelAction from "@/utils/cancelAction";
import Image from "next/image";

const ImagesList = ({ item, setCurrentImageIndex }) => {
  return (
    <div className={styles.imagesList}>
      {item?.photo_names?.map((img, index) => (
        <Image
          key={index}
          src={img}
          width={100}
          height={100}
          alt="image"
          className={styles.miniImage}
          onDragStart={cancelAction}
          onContextMenu={cancelAction}
          onClick={() => setCurrentImageIndex(index)}
        />
      ))}
    </div>
  );
};

export default ImagesList;
