import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styles from "./OrderModal.module.css";

const OrderModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className={styles.content}>
        <ModalHeader className={styles.header}>
          Введите ваши контактные данные
        </ModalHeader>
        <ModalCloseButton className={styles.closebtn} />
        <ModalBody className={styles.body}>
          <span className={styles.text}>
            Мы свяжемся с вами для уточнения деталей заказа
          </span>
          <div className={styles.form}>
            <span className={styles.formTitle}>Имя</span>
            <Input placeholder="Иван" className={styles.input} />
          </div>
          <div className={styles.form}>
            <span className={styles.formTitle}>Телефон</span>
            <Input placeholder="+7 (919) 111-23-45" className={styles.input} />
          </div>
          <div className={`${styles.btn} ${styles.btn1}`}>
            Оплатить при получении
          </div>
          <div className={`${styles.btn} ${styles.btn2}`}>Оплатить онлайн</div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal;
