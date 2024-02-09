import formattedNumber from "../../utils/formattedNumber";
import styles from "./DiscountPrice.module.css";

const DiscountPrice = ({ item, procent }) => {
  return (
    <div className={styles.priceContainer}>
      <span className={styles.newPrice}>
        {formattedNumber(item.discountPrice) + " ₽"}
      </span>
      <span className={styles.oldPrice}>
        {formattedNumber(item.price) + " ₽"}
      </span>
      <div className={styles.discountContainer}>{procent}</div>
    </div>
  );
};

export default DiscountPrice;
