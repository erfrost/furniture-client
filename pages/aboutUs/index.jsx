/* eslint-disable react-hooks/exhaustive-deps */
import AboutUsSEO from "../../SEO/AboutUsSEO";
import axiosInstance from "../../axios.config";
import AlertInfo from "../../components/AlertInfo/AlertInfo";
import CategoriesSelect from "../../components/CategoriesSelect/CategoriesSelect";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MobileNav from "../../components/MobileNav/MobileNav";
import RouteToHome from "../../components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "../../storage/atoms";
import styles from "../../styles/aboutUs.module.css";
import homePageStyles from "../../styles/homePage.module.css";
import { DownloadIcon } from "@chakra-ui/icons";
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
            <MobileNav />
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
          <span className={styles.title}>Более 30 лет на рынке</span>
          <span className={styles.subtitle}>
            Наша компания является ведущими магазинами мебели в своих городах
          </span>
          <div className={styles.texts}>
            <span className={styles.text}>
              Мы имеем богатый опыт работы на рынке, и наша компания успешно
              функционирует уже более 10 лет.
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
              В мебельном центре «Дом» представлено множество отделов, включая
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
            <div className={styles.orgInfo}>
              <span className={styles.orgTitle}>Реквизиты Продавца</span>
              <span className={styles.text}>
                Полное наименование: Старикова Елена Владимировна
              </span>
              <span className={styles.text}>ИНН: 235205998471</span>
              <span className={styles.text}>ОГРН/ОГРНИП: 323861700045122</span>
              <span className={styles.text}>
                Контактный телефон: +7 999 418-13-93
              </span>
              <span className={styles.text}>
                Контактный e-mail: 89227720462@mail.ru
              </span>
              <span className={styles.orgTitle}>Оферта</span>
              <a
                className={styles.downloadLink}
                href="https://disk.yandex.ru/i/ecrBaX4-CkAwaw"
                download
              >
                <DownloadIcon boxSize="40%" />
              </a>
            </div>
          </div>
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
