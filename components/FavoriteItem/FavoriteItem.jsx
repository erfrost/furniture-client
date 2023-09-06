import { LazyLoadImage } from "react-lazy-load-image-component";
import DiscountPrice from "../DiscountPrice/DiscountPrice";
import styles from "./FavoriteItem.module.css";
import { BACKEND_IMAGES_URL } from "@/config";
import cancelAction from "@/utils/cancelAction";
import formattedNumber from "@/utils/formattedNumber";
import { useRouter } from "next/router";

const FavoriteItem = ({ item }) => {
  const router = useRouter();

  const procent =
    "-" +
    Math.round((1 - item.discountPrice / item.price) * 100).toString() +
    "%";

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LazyLoadImage
          src={BACKEND_IMAGES_URL + item.photo_names[0]}
          effect="blur"
          className={styles.image}
          onDragStart={cancelAction}
          onContextMenu={cancelAction}
          onClick={() => router.push(`/item/${item._id}`)}
        />
        {item.price > item.discountPrice ? (
          <DiscountPrice item={item} procent={procent} />
        ) : (
          <span className={styles.price}>{formattedNumber(item.price)} ₽</span>
        )}
        <span
          className={styles.title}
          onClick={() => router.push(`/item/${item._id}`)}
        >
          {item.title}
        </span>
      </div>
      <div
        className={styles.moreBtn}
        onClick={() => router.push(`/item/${item._id}`)}
      >
        В КОРЗИНУ
      </div>
    </div>
  );
};

export default FavoriteItem;
