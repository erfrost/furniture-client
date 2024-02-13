import styles from "./AvailabilityIndicator.module.css";
import { Tooltip } from "@chakra-ui/react";

const AvailabilityIndicator = ({ availability }) => {
  return (
    <Tooltip
      hasArrow
      label={
        <div className={styles.tooltipContent}>
          <span className={styles.address}>
            {availability
              ? "Г. Нижневартовск МЦ Дом, Ул. Кузоваткина 3, стр. 9"
              : "Товара нет в наличии"}
          </span>
        </div>
      }
      className={styles.tooltip}
    >
      <div className={styles.container}>
        <div
          className={`${styles.circle} ${
            availability ? styles.greenCircle : styles.redCircle
          }`}
        ></div>
        <span className={styles.text}>
          {availability ? "В наличии" : "Нет в наличии"}
        </span>
      </div>
    </Tooltip>
  );
};

export default AvailabilityIndicator;
