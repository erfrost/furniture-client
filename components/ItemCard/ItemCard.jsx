/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./ItemCard.module.css";
import cartIcon from "@/assets/cartIcon.svg";
import DiscountPrice from "../DiscountPrice/DiscountPrice";
import cancelAction from "@/utils/cancelAction";
import formattedNumber from "@/utils/formattedNumber";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";
import { addToCart, getCartFromCookie, removeFromCart } from "@/utils/cart";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckIcon } from "@chakra-ui/icons";

const ItemCard = ({ item }) => {
  const [activeBtn, setActiveBtn] = useState(false);
  const router = useRouter();

  const cart = getCartFromCookie();
  const itemExists = cart.some((el) => el.itemId === item._id);

  useEffect(() => {
    if (itemExists) {
      setActiveBtn(true);
    }
  }, []);

  const procent =
    "-" +
    Math.round((1 - item.discountPrice / item.price) * 100).toString() +
    "%";

  const onCartAdd = () => {
    const currentCart = getCartFromCookie();

    if (currentCart.some((el) => el.itemId === item._id)) {
      removeFromCart(item._id);
      setActiveBtn(false);
    } else {
      addToCart(item._id, 1);
      setActiveBtn(true);
    }
  };

  useEffect(() => {
    const images = document.querySelectorAll(".ItemCard_image__mTZsx");
    if (images.length) {
      images.forEach((el) => (el.parentElement.style.minWidth = "100%"));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Image
        src={item.photo_names[0]}
        alt="item"
        width={300}
        height={300}
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
      {item.specifications.length ? (
        <span className={styles.specification}>
          {item.specifications[0].title}:{" "}
          {item.specifications[0].value.length > 50
            ? `${item.specifications[0].value.substring(0, 50)}...`
            : item.specifications[0].value}
        </span>
      ) : null}
      <div className={styles.btnsContainer}>
        <div
          className={styles.moreBtn}
          onClick={() => router.push(`/item/${item._id}`)}
        >
          ПОДРОБНЕЕ
        </div>
        <div
          className={`${styles.inCartBtn} ${
            activeBtn ? styles.activeCart : null
          }`}
          onClick={onCartAdd}
        >
          {activeBtn ? (
            <CheckIcon boxSize="50%" />
          ) : (
            <Image
              src={cartIcon}
              alt="cartIcon"
              width={25}
              height={25}
              draggable={false}
              onDragStart={cancelAction}
              onContextMenu={cancelAction}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
