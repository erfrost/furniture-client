import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import styles from "./AlertInfo.module.css";

const AlertInfo = ({ title, description, type }) => {
  return (
    <Alert status={type} className={styles.alert}>
      <AlertIcon />
      <AlertTitle className={styles.title}>{title}</AlertTitle>
      <AlertDescription className={styles.description}>
        {description}
      </AlertDescription>
    </Alert>
  );
};

export default AlertInfo;
