import { availabilityCounter } from "../../utils/availabilityCounter";
import { availabilityText } from "../../utils/availabilityText";
import styles from "./AvailabilityIndicator.module.css";
import { Tooltip } from "@chakra-ui/react";

const AvailabilityIndicator = ({ availability }) => {
  const count = availabilityCounter(availability);

  const addresses = [];

  if (availability.kuzovatkina3)
    addresses.push("Г. Нижневартовск МЦ Дом, Ул. Кузоваткина 3, стр. 9");
  if (availability.neftyanikov87)
    addresses.push("Г. Нефтеюганск Ул. Нефтяников, 87");
  if (availability.mira7)
    addresses.push("Г. Лангепас Отдел Кухонька, Ул. Мира, 7");

  return (
    <Tooltip
      hasArrow
      label={
        <div className={styles.tooltipContent}>
          {addresses.length ? (
            addresses.map((address, index) => (
              <span className={styles.address} key={index}>
                {address}
              </span>
            ))
          ) : (
            <span className={styles.address}>Товара нет в наличии</span>
          )}
        </div>
      }
      className={styles.tooltip}
    >
      <div className={styles.container}>
        <div
          className={`${styles.circle} ${
            count > 0 ? styles.greenCircle : styles.redCircle
          }`}
        ></div>
        <span className={styles.text}>{availabilityText(count)}</span>
      </div>
    </Tooltip>
  );
};

export default AvailabilityIndicator;
