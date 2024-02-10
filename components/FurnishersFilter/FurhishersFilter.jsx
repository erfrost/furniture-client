import { CheckIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import styles from "./FurhishersFilter.module.css";

const FurhishersFilter = ({
  furnishersState,
  onFurnishersFilterOpen,
  isFurnishersOpen,
  furnisherFilterAdd,
}) => {
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
        onClick={onFurnishersFilterOpen}
      >
        Фильтр по поставщикам
      </span>
      <TriangleDownIcon
        className={styles.filterIcon}
        onClick={onFurnishersFilterOpen}
      />
      <motion.div
        initial={false}
        animate={isFurnishersOpen ? "open" : "closed"}
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.15,
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
        className={`${styles.list} ${styles.furnishersList}`}
        key="furnishersList"
      >
        {furnishersState.map((item) => (
          <motion.div
            className={styles.furnisherItem}
            key={item.id}
            variants={itemVariants}
          >
            <div
              className={styles.square}
              onClick={() =>
                furnisherFilterAdd(item.id, "checkIcon-" + item.id)
              }
            >
              <CheckIcon
                boxSize="70%"
                opacity={0}
                transition="all 0.3s ease"
                id={"checkIcon-" + item.id}
              />
            </div>
            <span className={styles.furnisherTitle}>{item.id}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FurhishersFilter;
