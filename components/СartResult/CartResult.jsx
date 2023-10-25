import formattedNumber from "@/utils/formattedNumber";
import styles from "./CartResult.module.css";
import { useDisclosure } from "@chakra-ui/react";
import OrderModal from "../OrderModal/OrderModal";

const CartResult = ({ items, totalCount }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
  const totalDiscountPrice = items.reduce(
    (acc, item) => acc + item.discountPrice * item.count,
    0
  );
  const discount = totalPrice - totalDiscountPrice;

  return (
    <div className={styles.container}>
      <div className={styles.btn} onClick={onOpen}>
        Перейти к оформлению заказа
      </div>
      <span className={styles.title}>Корзина</span>
      <div className={styles.row}>
        <span className={styles.subTitle}>{`Корзина (${
          totalCount || 0
        })`}</span>
        <span className={styles.itemsPrice}>
          {formattedNumber(totalPrice) + " ₽"}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.subTitle}>Скидка</span>
        <span className={styles.discountPrice}>
          {formattedNumber(discount) + " ₽"}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.title}>К оплате</span>
        <span className={styles.title}>
          {formattedNumber(totalDiscountPrice) + " ₽"}
        </span>
      </div>
      <OrderModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default CartResult;
