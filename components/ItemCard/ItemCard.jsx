import styles from "./ItemCard.module.css";
import { BACKEND_IMAGES_URL } from "@/config";
import CartIcon from "@/assets/cartIcon";
import DiscountPrice from "../DiscountPrice/DiscountPrice";
import cancelAction from "@/utils/cancelAction";
import formattedNumber from "@/utils/formattedNumber";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";
import { addToCart, getCartFromCookie } from "@/utils/cart";
import { useEffect } from "react";

const ItemCard = ({ item }) => {
  const router = useRouter();

  const procent =
    "-" +
    Math.round((1 - item.discountPrice / item.price) * 100).toString() +
    "%";

  const onCartAdd = () => {
    const cart = getCartFromCookie();
    const currentItem = cart.find((el) => el.itemId === item._id);

    if (currentItem) {
      console.log(currentItem);
      const count = currentItem.count;
      addToCart(item._id, count + 1);
    } else addToCart(item._id, 1);

    console.log(getCartFromCookie());
  };

  useEffect(() => {
    const lazyLoad = document.querySelectorAll(".lazy-load-image-background");
    if (lazyLoad.length) {
      lazyLoad.forEach((el) => (el.style.width = "100%"));
    }
  }, []);

  return (
    <div className={styles.container}>
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
      <span className={styles.specification}>
        {item.specifications[0]?.title}: {item.specifications[0]?.value}
      </span>
      <div className={styles.btnsContainer}>
        <div
          className={styles.moreBtn}
          onClick={() => router.push(`/item/${item._id}`)}
        >
          ПОДРОБНЕЕ
        </div>
        <div className={styles.inCartBtn} onClick={onCartAdd}>
          <CartIcon />
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
