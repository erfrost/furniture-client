import arrow from "@/assets/routerArrow.svg";
import styles from "./RouteToHome.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import cancelAction from "@/utils/cancelAction";

const RouteToHome = () => {
  const router = useRouter();

  return (
    <div className={styles.routerContainer}>
      <Image
        src={arrow}
        alt="arrow"
        className={styles.image}
        draggable={false}
        onDragStart={cancelAction}
        onContextMenu={cancelAction}
      />
      <span className={styles.routerTitle} onClick={() => router.push("/")}>
        Вернуться на главную
      </span>
    </div>
  );
};

export default RouteToHome;
