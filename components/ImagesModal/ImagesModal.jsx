/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./ImagesModal.module.css";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  DownloadIcon,
} from "@chakra-ui/icons";

const ImagesModal = ({ active, setIsActive, images, index }) => {
  const [currentIndex, setCurrentIndex] = useState(index);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    if (active) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [active]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClose);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClose);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setCurrentIndex((prevState) => {
        if (prevState - 1 < 0) return images.length - 1;
        else return prevState - 1;
      });
    } else if (e.key === "ArrowRight") {
      setCurrentIndex((prevState) => {
        if (prevState + 1 >= images.length) return 0;
        else return prevState + 1;
      });
    }
  };

  const handleClose = (e) => {
    if (e.target.classList[0] === "ImagesModal_imagesModal__bo9KA")
      setIsActive(false);
  };

  const handleDownload = async () => {
    const response = await fetch(images[currentIndex]);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "image.jpg";
    link.click();
  };

  return (
    <div className={styles.imagesModal}>
      <div
        className={`${styles.circle} ${styles.downloadCircle}`}
        onClick={handleDownload}
      >
        <DownloadIcon boxSize="50%" className={styles.icon} />
      </div>
      <div
        className={`${styles.circle} ${styles.closeCirlce}`}
        onClick={() => setIsActive(false)}
      >
        <CloseIcon boxSize="40%" className={styles.icon} />
      </div>
      <div
        className={`${styles.circle} ${styles.leftCircle}`}
        onClick={() =>
          setCurrentIndex((prevState) => {
            if (prevState - 1 < 0) return images.length - 1;
            else return prevState - 1;
          })
        }
      >
        <ChevronLeftIcon boxSize="65%" />
      </div>
      <Image
        src={images[currentIndex]}
        alt="image"
        width={500}
        height={500}
        className={styles.image}
      />
      <div
        className={`${styles.circle} ${styles.rightCircle}`}
        onClick={() =>
          setCurrentIndex((prevState) => {
            if (prevState + 1 >= images.length) return 0;
            else return prevState + 1;
          })
        }
      >
        <ChevronRightIcon boxSize="65%" />
      </div>
    </div>
  );
};

export default ImagesModal;
