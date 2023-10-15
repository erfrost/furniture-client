/* eslint-disable react-hooks/exhaustive-deps */
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./FavoriteItem.module.css";
import { BACKEND_IMAGES_URL } from "@/config";
import cancelAction from "@/utils/cancelAction";
import formattedNumber from "@/utils/formattedNumber";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCartFromCookie } from "@/utils/cart";
import { removeFromFavorites } from "@/utils/favorites";

const FavoriteItem = ({ item, setFavoriteItems }) => {
  const [inCartActive, setInCartActive] = useState(false);
  const router = useRouter();

  const procent =
    "-" +
    Math.round((1 - item.discountPrice / item.price) * 100).toString() +
    "%";

  useEffect(() => {
    const LazyLoadContainer = document.querySelector(
      ".lazy-load-image-background"
    );
    if (LazyLoadContainer) {
      LazyLoadContainer.style.height = "156px !important";
    }
  }, []);

  useEffect(() => {
    const cartItem = getCartFromCookie();
    const currentItemInCart = cartItem.find((el) => el.itemId === item._id);

    if (currentItemInCart) {
      setInCartActive(true);
    }
  }, []);

  const deleteFromFavorite = (itemId) => {
    setFavoriteItems((prevState) => {
      const items = [...prevState];
      const filteredItems = items.filter((el) => el._id !== itemId);
      return filteredItems;
    });
    removeFromFavorites(itemId);
  };

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
          <div className={styles.priceContainer}>
            <span className={styles.newPrice}>
              {formattedNumber(item.discountPrice) + " ₽"}
            </span>
            <span className={styles.oldPrice}>
              {formattedNumber(item.price) + " ₽"}
            </span>
            <div className={styles.discountContainer}>{procent}</div>
          </div>
        ) : (
          <span className={styles.price}>{formattedNumber(item.price)} ₽</span>
        )}
        <span
          className={styles.title}
          onClick={() => router.push(`/item/${item._id}`)}
        >
          {item.title}
        </span>
        <span
          className={styles.remove}
          onClick={() => deleteFromFavorite(item._id)}
        >
          Удалить из избранного
        </span>
      </div>
      {inCartActive ? (
        <div className={styles.moreBtn} onClick={() => router.push("/cart")}>
          ПЕРЕЙТИ В КОРЗИНУ
        </div>
      ) : (
        <div
          className={styles.moreBtn}
          onClick={() => router.push(`/item/${item._id}`)}
        >
          ДОБАВИТЬ В КОРЗИНУ
        </div>
      )}
    </div>
  );
};

export default FavoriteItem;
