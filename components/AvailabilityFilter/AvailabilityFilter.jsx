import { CheckIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import styles from "./AvailabilityFilter.module.css";
import { useEffect, useState } from "react";
import { croppingAddress } from "../../utils/croppingAddress";

const AvailabilityFilter = ({
  onAvailabilityFilterOpen,
  isAvailabilityOpen,
  availabilityFilterAdd,
}) => {
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const itemVariants = {
    open: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 42,
      },
    },
    closed: { opacity: 0 },
  };

  return (
    <div className={styles.filter}>
      <span
        className={`${styles.text} ${styles.filterText}`}
        onClick={onAvailabilityFilterOpen}
      >
        Фильтр по наличию
      </span>
      <TriangleDownIcon
        className={styles.filterIcon}
        onClick={onAvailabilityFilterOpen}
      />
      <motion.div
        initial={false}
        animate={isAvailabilityOpen ? "open" : "closed"}
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.25,
              staggerChildren: 0.02,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        className={`${styles.list} ${styles.checkboxList}`}
        key="furnishersList"
      >
        <motion.div className={styles.checkboxItem} variants={itemVariants}>
          <div className={styles.square} onClick={availabilityFilterAdd}>
            <CheckIcon
              boxSize="70%"
              opacity={0}
              transition="all 0.3s ease"
              id={"checkIcon-address"}
            />
          </div>
          <span className={styles.address}>
            {screenWidth < 465
              ? croppingAddress(
                  "Г. Нижневартовск МЦ Дом, Ул. Кузоваткина 3, стр. 9"
                )
              : "Г. Нижневартовск МЦ Дом, Ул. Кузоваткина 3, стр. 9"}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AvailabilityFilter;
