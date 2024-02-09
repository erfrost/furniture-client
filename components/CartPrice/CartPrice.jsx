import formattedNumber from "../../utils/formattedNumber";
import styles from "./CartPrice.module.css";

const CartPrice = ({ item }) => {
  const procent =
    "-" +
    Math.round((1 - item.discountPrice / item.price) * 100).toString() +
    "%";

  return (
    <div className={styles.container}>
      {item.discountPrice < item.price ? (
        <>
          <div className={styles.newPriceContainer}>
            <div className={styles.price}>
              {formattedNumber(item.discountPrice * item.count) + " ₽"}
            </div>
            <span className={styles.discount}>{`со скидкой ${procent}`}</span>
          </div>
          <div className={styles.oldPriceContainer}>
            <span className={styles.oldPrice}>
              {formattedNumber(item.price * item.count) + " ₽"}
            </span>
            <span className={styles.text}>без скидки</span>
          </div>
        </>
      ) : (
        <div className={styles.price}>
          {formattedNumber(item.price * item.count) + " ₽"}
        </div>
      )}
    </div>
  );
};

export default CartPrice;
