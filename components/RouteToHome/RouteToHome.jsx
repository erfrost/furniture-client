import RouterArrow from "@/assets/routerArrow";
import styles from "./RouteToHome.module.css";
import { useRouter } from "next/router";

const RouteToHome = () => {
  const router = useRouter();

  return (
    <div className={styles.routerContainer}>
      <RouterArrow />
      <span className={styles.routerTitle} onClick={() => router.push("/")}>
        Вернуться на главную
      </span>
    </div>
  );
};

export default RouteToHome;
