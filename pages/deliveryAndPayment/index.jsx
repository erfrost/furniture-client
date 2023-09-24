/* eslint-disable react-hooks/exhaustive-deps */
import DeliveryAndPaymentSEO from "@/SEO/DeliveryAndPaymentSEO";
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/deliveryAndPayment.module.css";
import homePageStyles from "@/styles/homePage.module.css";
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
      <DeliveryAndPaymentSEO />
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
          <span className={styles.title}>Доставка и оплата</span>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Доставка</span>
            <div className={styles.cardContent}>
              <span className={styles.defaultText}>
                Доставка производится{" "}
                <span className={styles.boldText}>
                  ежедневно с 9.00 до 21.00
                </span>{" "}
                с подъемом на этаж и заносом в дом (цены на услуги грузчиков
                уточняйте у оператора). Чаще всего доставка может быть
                произведена в день заказа, но зависит от загруженности курьеров
                и грузчиков.{" "}
              </span>
              <span className={styles.defaultText}>
                Доставка производится по Региону и прилежащим к нему населенным
                пунктам.
              </span>
              <span className={styles.boldText}>
                Доставка по городу 750 рублей. Доставка в другие места рядом с
                вашим населённым пунктом обговариваются с оператором.
              </span>
            </div>
          </div>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Обратите внимание</span>
            <div className={styles.cardContent}>
              <span className={styles.defaultText}>
                Цены за доставку указаны без учета{" "}
                <span className={styles.boldText}>заноса и подъема,</span> если
                вам нужны будут эти услуги, то они просчитываются отдельно с
                оператором.
              </span>
              <span className={styles.defaultText}>
                Доставка товара осуществляется в интервале времени, а не к
                определенному часу. Перед доставкой с вами свяжется курьер и
                предупредит о времени визита. Если получателя по каким-то
                причинам нет на адресе доставки, курьер будет ожидать максимум{" "}
                <span className={styles.boldText}>10 минут.</span>
              </span>
            </div>
          </div>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Оплата</span>
            <div className={styles.cardContent}>
              <span className={styles.boldText}>Товар можно оплатить:</span>
              <span className={styles.defaultText}>
                В магазине Уют на кассе - любым способом.
              </span>
              <span className={styles.boldText}>
                При покупке в интернет магазине:
              </span>
              <span className={styles.defaultText}>
                Наличными или по карте при получении товара по адресу
                получателя. Мгновенный платеж с помощью любой банковской карты,
                а так же SberPay или ЮMoney.
              </span>
            </div>
          </div>
        </div>
        {reqError && (
          <AlertInfo
            title="Произошла ошибка:"
            description={reqError}
            type="error"
          />
        )}
        <Footer />
      </div>
    </>
  );
};

export default Index;
