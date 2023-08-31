import styles from "./ItemCard.module.css";
import { BACKEND_IMAGES_URL } from "@/config";
import CartIcon from "@/assets/cartIcon";
import DiscountPrice from "../DiscountPrice/DiscountPrice";
import cancelAction from "@/utils/cancelAction";
import formattedNumber from "@/utils/formattedNumber";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ItemCard = ({ item }) => {
  const procent =
    "-" +
    Math.round((1 - item.discountPrice / item.price) * 100).toString() +
    "%";

  return (
    <div className={styles.container}>
      <LazyLoadImage
        src={BACKEND_IMAGES_URL + item.photo_names[0]}
        effect="blur"
        className={styles.image}
        onDragStart={cancelAction}
        onContextMenu={cancelAction}
      />
      {item.price > item.discountPrice ? (
        <DiscountPrice item={item} procent={procent} />
      ) : (
        <span className={styles.price}>{formattedNumber(item.price)} ₽</span>
      )}
      <span className={styles.title}>{item.title}</span>
      <span className={styles.specification}>
        {item.specifications[0]?.title}: {item.specifications[0]?.value}
      </span>
      <div className={styles.btnsContainer}>
        <div className={styles.moreBtn}>ПОДРОБНЕЕ</div>
        <div className={styles.inCartBtn}>
          <CartIcon />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
