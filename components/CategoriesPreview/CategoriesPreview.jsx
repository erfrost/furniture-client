import styles from "./CategoriesPreview.module.css";
import NewsSlider from "../NewsSlider/NewsSlider";

const CategoriesPreview = ({ news }) => {
  return (
    <div className={styles.container}>
      <NewsSlider news={news} />
    </div>
  );
};

export default CategoriesPreview;
