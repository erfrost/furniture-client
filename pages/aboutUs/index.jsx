/* eslint-disable react-hooks/exhaustive-deps */
import AboutUsSEO from "@/SEO/AboutUsSEO";
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/aboutUs.module.css";
import homePageStyles from "@/styles/homePage.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Index = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    async function fetchCategoriesAndSubcategories() {
      if (!categories.length && !subcategories.length) {
        try {
          const categoriesAndSubcategories = await axiosInstance.get(
            "categoriesAndSubcategories"
          );
          const categories = categoriesAndSubcategories.data.categories;
          const subcategories = categoriesAndSubcategories.data.subcategories;

          setCategories(categories);
          setSubcategories(subcategories);
        } catch (error) {
          setReqError(
            error?.response?.data?.message ||
              "Произошла ошибка запроса. Попробуйте позднее"
          );
        }
      }
    }

    fetchCategoriesAndSubcategories();
  }, []);

  return (
    <>
      <AboutUsSEO />
      <div className={homePageStyles.container}>
        {screenWidth < 768 ? (
          <div className={homePageStyles.fullScreen}>
            <MobileNav categories={categories} />
          </div>
        ) : (
          <>
            <Header />
            <CategoriesSelect
              categories={categories}
              subcategories={subcategories}
            />
          </>
        )}
        <div className={styles.content}>
          <RouteToHome />
          <span className={styles.title}>Более 10 лет на рынке</span>
          <span className={styles.subtitle}>
            НАШИ МАГАЗИНЫ ЯВЛЯЮТСЯ ЛИДЕРАМИ ПРОДАЖ В СВОИХ ГОРОДАХ
          </span>
          <span className={styles.texts}>
            <span className={styles.text}>
              Мы имеем богатый опыт работы на рынке, и наша компания успешно
              функционирует уже более 30 лет.
            </span>
            <span className={styles.text}>
              Мы гордимся своими достижениями и являемся признанными лидерами
              продаж в наших
              <Link className={styles.link} href="/salons">
                &nbsp;городах
              </Link>
              .
            </span>
            <span className={styles.text}>
              В гипермаркете «Дом» представлено множество отделов, включая
              мягкую мебель, элитную мебель, спальни, кухни, офисную мебель,
              детскую мебель, освещение, сопутствующие товары и многое другое.
            </span>
            <span className={styles.text}>
              Мы предлагаем услуги доставки и имеем высококвалифицированных
              сборщиков. Наша цель - сделать покупки в наших магазинах приятными
              для вас. Наши сотрудники всегда готовы помочь вам с компетентными
              рекомендациями и дружелюбным обслуживанием.
            </span>
            <span className={styles.text}>
              Мы также гарантируем проверку товара перед отправкой. Наши
              сотрудники тщательно проверят ваш товар на складе, чтобы убедиться
              в его соответствии заявленному описанию. Если возникнут какие-либо
              проблемы, мы свяжемся с вами.
            </span>
            <span className={styles.text}>
              Если вы не получите посылку или товар будет поврежден, мы
              <Link href="/refund" className={styles.link}>
                &nbsp;вернем вам&nbsp;
              </Link>
              деньги. Ваше удовлетворение - наш главный приоритет.
            </span>
          </span>
        </div>
        <Footer />
        {reqError && (
          <AlertInfo
            title="Произошла ошибка:"
            description={reqError}
            type="error"
          />
        )}
      </div>
    </>
  );
};

export default Index;
