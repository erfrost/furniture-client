import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styles from "./KitchenForm.module.css";
import { formatPhoneNumber } from "@/utils/formattedPhoneNumber";

const KitchenForm = ({
  setProjectIsOpen,
  setSizerIsOpen,
  name,
  setName,
  phone,
  setPhone,
  tgRequestFunction,
  isOpen,
  onClose,
}) => {
  const onSubmit = () => {
    setProjectIsOpen(false);
    setSizerIsOpen(false);
    tgRequestFunction(name, phone);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className={styles.content}>
        <ModalHeader className={styles.header}>
          Введите ваши контактные данные
        </ModalHeader>
        <ModalCloseButton className={styles.closebtn} />
        <ModalBody className={styles.body}>
          <span className={styles.text}>Мы свяжемся с вами</span>
          <div className={styles.form}>
            <span className={styles.formTitle}>Имя</span>
            <Input
              placeholder="Иван"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.form}>
            <span className={styles.formTitle}>Телефон</span>
            <Input
              placeholder="+7 (919) 111-23-45"
              className={styles.input}
              value={phone}
              onChange={(e) =>
                setPhone((prevState) =>
                  formatPhoneNumber(prevState, e.target.value)
                )
              }
            />
          </div>
          <div
            className={`${styles.btn} ${
              !name.length || !phone.length === 18 ? styles.disabled : null
            }`}
            onClick={name.length && phone.length === 18 ? onSubmit : null}
          >
            Отправить
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default KitchenForm;
