import axiosInstance from "@/axios.config";
import Catalog from "@/components/Catalog/Catalog";
import CategoriesPreview from "@/components/CategoriesPreview/CategoriesPreview";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Header from "@/components/Header/Header";
import styles from "@/styles/homePage.module.css";
import { useState } from "react";

const Index = ({ categories, error }) => {
  const [reqError, setReqError] = useState(error);
  console.log(categories, reqError);
  return (
    <div className={styles.container}>
      <div className={styles.fullScreen}>
        <Header />
        <CategoriesSelect categories={categories} />
        <CategoriesPreview categories={categories} />
      </div>
      <Catalog categories={categories} />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const categories = await axiosInstance.get("categories");

    return {
      props: {
        categories: categories.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "На сервере произошла ошибка. Попробуйте позднее",
      },
    };
  }
}

export default Index;
