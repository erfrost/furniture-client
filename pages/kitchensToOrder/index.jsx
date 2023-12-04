/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/KitchensToOrder.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";
import { Divider, useDisclosure } from "@chakra-ui/react";
import KitchenForm from "@/components/KitchenForm/KitchenForm";
import ItemsCatalog from "@/components/ItemsCatalog/ItemsCatalog";
import formatItemsCount from "@/utils/caseFormatted";
import CatalogTitle from "@/components/CatalogTitle/CatalogTitle";

const Index = ({
  kitchenWork,
  kitchenWorkCount,
  kitchens,
  kitchensCount,
  furnitures,
  furnituresCount,
  error,
}) => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [kitchensWorkCountState, setKitchensWorkCountState] =
    useState(kitchenWorkCount);
  const [kitchensCountState, setKitchensCountState] = useState(kitchensCount);
  const [furnituresCountState, setFurnituresCountState] =
    useState(furnituresCount);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [projectIsOpen, setProjectIsOpen] = useState(false);
  const [sizerIsOpen, setSizerIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);
  const [success, setSuccess] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(kitchenWork);
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

  const loadFunc = async (offset) => {
    try {
      const res = await axiosInstance.get(
        `items/by_subcategory/6562ef3e4ba1483903c3811a?limit=25&offset=${offset}`
      );

      return res;
    } catch (error) {
      setReqError(
        error?.response?.data?.message ||
          "Произошла ошибка запроса. Попробуйте позднее"
      );
    }
  };

  const projectRequest = async (name, phone) => {
    try {
      await axiosInstance.post("telegram/send", {
        text: `Новая заявка на бесплатный проект!\nИмя: ${name}\nНомер телефона: ${phone}`,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setReqError(
        error?.response?.data?.message ||
          "Произошла ошибка запроса. Попробуйте позднее"
      );
    }
  };

  const sizerRequest = async (name, phone) => {
    try {
      await axiosInstance.post("telegram/send", {
        text: `Новая заявка на вызов замерщика!\nИмя: ${name}\nНомер телефона: ${phone}`,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setReqError(
        error?.response?.data?.message ||
          "Произошла ошибка запроса. Попробуйте позднее"
      );
    }
  };

  return (
    <>
      <div className={styles.container}>
        {screenWidth < 768 ? (
          <div className={styles.fullScreen}>
            <MobileNav />
          </div>
        ) : (
          <div className={styles.fullScreen}>
            <Header />
            <CategoriesSelect
              categories={categories}
              subcategories={subcategories}
            />
          </div>
        )}
        <div className={styles.content}>
          <RouteToHome />
          <CatalogTitle title="Наши работы" />
          <span className={styles.itemsCount}>
            Найдено: {kitchensWorkCountState}{" "}
            {formatItemsCount(kitchensWorkCountState)}
          </span>
          <ItemsCatalog
            items={kitchenWork}
            allCount={kitchenWorkCount}
            setCountState={setKitchensWorkCountState}
          />
          <div className={styles.btns}>
            <div
              className={styles.btn}
              onClick={() => {
                onOpen(true);
                setProjectIsOpen(true);
              }}
            >
              Заказать бесплатный проект
            </div>
            <div
              className={styles.btn}
              onClick={() => {
                onOpen(true);
                setSizerIsOpen(true);
              }}
            >
              Вызвать замерщика бесплатно
            </div>
            <Link
              href="https://dsv-mebel.ru/constructor-3d/"
              className={styles.btn}
            >
              3D онлайн конструктор
            </Link>
          </div>
          <Divider />
          <CatalogTitle title="Кухни на заказ" />
          <span className={styles.itemsCount}>
            Найдено: {kitchensCountState} {formatItemsCount(kitchensCountState)}
          </span>
          <ItemsCatalog
            items={kitchens}
            allCount={kitchensCount}
            setCountState={setKitchensCountState}
          />
          <Divider />
          <CatalogTitle title="Фурнитура" />
          <span className={styles.itemsCount}>
            Найдено: {furnituresCountState}
            {formatItemsCount(furnituresCountState)}
          </span>
          <ItemsCatalog
            items={furnitures}
            allCount={furnituresCount}
            setCountState={setFurnituresCountState}
          />
        </div>
        <Footer />
        {projectIsOpen ? (
          <KitchenForm
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            setProjectIsOpen={setProjectIsOpen}
            setSizerIsOpen={setSizerIsOpen}
            tgRequestFunction={projectRequest}
            isOpen={isOpen}
            onClose={onClose}
          />
        ) : null}
        {sizerIsOpen ? (
          <KitchenForm
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            setProjectIsOpen={setProjectIsOpen}
            setSizerIsOpen={setSizerIsOpen}
            tgRequestFunction={sizerRequest}
            isOpen={isOpen}
            onClose={onClose}
          />
        ) : null}
        {reqError && (
          <AlertInfo
            title="Произошла ошибка:"
            description={reqError}
            type="error"
          />
        )}
        {success && (
          <AlertInfo
            title="Успешно! "
            description={"Заявка отправлена"}
            type="success"
          />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const kitchens = await axiosInstance.get(
      "items/by_subcategory/654bb115c2fbb0f34ee5a6e8"
    );
    const kitchenWork = await axiosInstance.get(
      "items/by_subcategory/654f52db3cef74b2b79bc645"
    );
    const furnitures = await axiosInstance.get(
      "items/by_subcategory/656da2464eecad4547e7066c"
    );

    return {
      props: {
        kitchenWork: kitchenWork.data.items,
        kitchenWorkCount: kitchenWork.data.count,
        kitchens: kitchens.data.items,
        kitchensCount: kitchens.data.count,
        furnitures: furnitures.data.items,
        furnituresCount: furnitures.data.count,
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
