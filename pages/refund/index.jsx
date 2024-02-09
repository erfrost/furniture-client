/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "../../axios.config";
import AlertInfo from "../../components/AlertInfo/AlertInfo";
import CategoriesSelect from "../../components/CategoriesSelect/CategoriesSelect";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MobileNav from "../../components/MobileNav/MobileNav";
import RouteToHome from "../../components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "../../storage/atoms";
import styles from "../../styles/refund.module.css";
import homePageStyles from "../../styles/homePage.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import RefundSEO from "../../SEO/RefundSEO";

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
      <RefundSEO />
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
          <div className={styles.texts}>
            <span className={styles.title}>Условия возврата</span>
            <div className={styles.item}>
              <span className={styles.question}>
                Как вернуть или обменять товар
              </span>
              <div className={styles.answer}>
                <span>
                  Покупатель вправе отказаться от товара в любое время до его
                  передачи, а после передачи товара — в течение 30 календарных
                  дней. Возврат товара надлежащего качества возможен при
                  следующих условиях:
                </span>
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    Товар не подвергался сборке;
                  </li>
                  <li className={styles.listItem}>
                    Товар не был в употреблении;
                  </li>
                  <li className={styles.listItem}>
                    Сохранены товарный вид и потребительские свойства товара;
                  </li>
                  <li className={styles.listItem}>
                    Имеется товарный или кассовый чек, либо иной документ,
                    подтверждающий оплату товара.
                  </li>
                </ul>
                <span>
                  Возврату не подлежат индивидуально-определенные товары
                  надлежащего качества – любые товары, поставляемые по заказной
                  программе. При отказе потребителя от товара продавец должен
                  возвратить ему денежную сумму, уплаченную потребителем по
                  договору, за исключением расходов продавца на доставку от
                  потребителя возвращенного товара. Для оформления возврата
                  необходимо заполнить заявку на возврат на кассе магазина в
                  котором вы получали товар.
                </span>
              </div>
            </div>
            <div className={styles.item}>
              <span className={styles.question}>
                Как вернуть или обменять товар
              </span>
              <div className={styles.answer}>
                <span>
                  Можно ли вернуть или обменять товар если товарный чек не
                  сохранился?
                </span>
                <span>
                  Можно. В этом случае вам нужно будет назвать сотруднику
                  магазина номер заказа.Можно. В этом случае вам нужно будет
                  назвать сотруднику магазина номер заказа.
                </span>
              </div>
            </div>
            <div className={styles.item}>
              <span className={styles.question}>
                Как вернуть или обменять товар
              </span>
              <div className={styles.answer}>
                <span>
                  В какой срок мне будут возвращены средства при оформлении
                  возврата?
                </span>
                <span>
                  Как правило, возврат денежных средств происходит в течение 10
                  рабочих дней. В некоторых случаях он может быть увеличен – это
                  зависит от банка. Максимальный срок возврата денежных средств
                  составляет 30 рабочих дней.
                </span>
              </div>
            </div>
            <div className={styles.item}>
              <span className={styles.question}>
                Как вернуть или обменять товар
              </span>
              <div className={styles.answer}>
                <span>Можно ли вернуть средства на другую карту или счет?</span>
                <span>
                  При оплате наличными и оформлении возврата средства можно
                  вернуть на банковскую карту или счет. При оплате картой
                  возврат средств наличными невозможен. Средства можно вернуть
                  на другую карту/счет при условии, что будет предоставлена
                  справка из банка о том, что карта утеряна/заблокирована/истек
                  срок действия.
                </span>
              </div>
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
