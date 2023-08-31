import { Spinner } from "@chakra-ui/react";
import styles from "./LoadSpinner.module.css";

const LoadSpinner = () => {
  return <Spinner className={styles.spinner} />;
};

export default LoadSpinner;
