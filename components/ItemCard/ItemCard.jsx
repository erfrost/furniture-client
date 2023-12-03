/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./ItemCard.module.css";
import cartIcon from "@/assets/cartIcon.svg";
import DiscountPrice from "../DiscountPrice/DiscountPrice";
import cancelAction from "@/utils/cancelAction";
import formattedNumber from "@/utils/formattedNumber";
import { addToCart, getCartFromCookie, removeFromCart } from "@/utils/cart";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckIcon } from "@chakra-ui/icons";
import Link from "next/link";

const ItemCard = ({ item }) => {
  const [activeBtn, setActiveBtn] = useState(false);

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
      <Link href="/item/[itemId]" as={`/item/${item._id}`} target="_blank">
        <Image
          src={item.photo_names[0]}
          alt="item"
          width={300}
          height={300}
          className={`${styles.image} ${
            item.subcategory_id === "65670ca9a623b6fddfce5ffd" ||
            item.subcategory_id === "655c90e8cbffef93b8accab8" ||
            item.subcategory_id === "65670c97a623b6fddfce5ff9" ||
            item.subcategory_id === "65670cbea623b6fddfce6001" ||
            item.subcategory_id === "65670cd5a623b6fddfce6005" ||
            item.subcategory_id === "653c08511e1415d9c89d1769"
              ? styles.vertImage
              : null
          }`}
          onDragStart={cancelAction}
          onContextMenu={cancelAction}
        />
      </Link>
      {item.price > item.discountPrice ? (
        <DiscountPrice item={item} procent={procent} />
      ) : (
        <span className={styles.price}>{formattedNumber(item.price)} ₽</span>
      )}
      <Link
        className={styles.title}
        href="/item/[itemId]"
        as={`/item/${item._id}`}
        target="_blank"
      >
        {item.title.length < 40 ? item.title : item.title.slice(0, 40) + "..."},{" "}
        {item.furnisherId}
      </Link>
      <span className={styles.vendorCode}>Артикул: {item.vendor_code}</span>
      {item.specifications.length ? (
        <span className={styles.specification}>
          {item.specifications[0].title}:{" "}
          {item.specifications[0].value.length > 50
            ? `${item.specifications[0].value.substring(0, 50)}...`
            : item.specifications[0].value}
        </span>
      ) : null}
      <div className={styles.btnsContainer}>
        <Link
          className={styles.moreBtn}
          href="/item/[itemId]"
          as={`/item/${item._id}`}
          target="_blank"
        >
          ПОДРОБНЕЕ
        </Link>
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
              className={styles.cartIcon}
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
