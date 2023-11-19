/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import OurWorksSwiper from "@/components/OurWorksSwiper/OurWorksSwiper";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/KitchensToOrder.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import cancelAction from "@/utils/cancelAction";
import Link from "next/link";
import Image from "next/image";
import { Divider, useDisclosure } from "@chakra-ui/react";
import KitchenForm from "@/components/KitchenForm/KitchenForm";

const Index = ({ images, kitchens, error }) => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [projectIsOpen, setProjectIsOpen] = useState(false);
  const [sizerIsOpen, setSizerIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);
  const [success, setSuccess] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
          {images.length ? <OurWorksSwiper images={images} /> : null}
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
          <div className={styles.titleContainer}>
            <span className={styles.blockTitle}>Кухни на заказ</span>
            <Divider />
          </div>
          <div className={styles.list}>
            {kitchens.length ? (
              kitchens?.map((item) => (
                <div className={styles.item} key={item._id}>
                  <Link className={styles.link} href={`/kitchen/${item._id}`}>
                    <Image
                      src={item.photo_names[0]}
                      alt="preview"
                      width={300}
                      height={300}
                      className={styles.image}
                      draggable={false}
                      onDragStart={cancelAction}
                      onContextMenu={cancelAction}
                    />
                  </Link>
                  <Link href={`/kitchen/${item._id}`} className={styles.title}>
                    {item.title}
                  </Link>
                  <Link className={styles.link} href={`/kitchen/${item._id}`}>
                    <div className={styles.btn}>Подробнее</div>
                  </Link>
                </div>
              ))
            ) : (
              <span className={styles.nullText}>Ничего не найдено</span>
            )}
          </div>
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
    const kitchens = await axiosInstance.get("/kitchen");
    const kitchenWork = await axiosInstance.get("/kitchenWork");

    return {
      props: {
        images: kitchenWork.data,
        kitchens: kitchens.data,
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
