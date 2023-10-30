/* eslint-disable react-hooks/exhaustive-deps */
import CartSEO from "@/SEO/СartSEO";
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CartItem from "@/components/CartItem/CartItem";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import CartResult from "@/components/СartResult/CartResult";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/cartPage.module.css";
import homePageStyles from "@/styles/homePage.module.css";
import { addToCart, getCartFromCookie, removeFromCart } from "@/utils/cart";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Index = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(undefined);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(null);

  useEffect(() => {
    if (items.length) {
      setTotalCount(items.reduce((acc, item) => acc + item.count, 0));
    }
  }, [items]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const cartItems = getCartFromCookie();
        const itemIds = cartItems.map((item) => item.itemId);

        const items = await axiosInstance.post("items/by_ids", {
          itemIds,
        });

        if (items.data.length) {
          const cartItems = getCartFromCookie();

          const newItems = items.data.map((item) => {
            const currentItem = cartItems.find((el) => el.itemId === item._id);
            if (currentItem) {
              return { ...item, count: currentItem.count };
            } else return item;
          });
          setItems(newItems);

          const count = newItems.reduce((acc, item) => acc + item.count, 0);
          setTotalCount(count);
        }
      } catch (error) {
        setReqError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      }
    }

    fetchItems();
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

  const deleteFromCart = (itemId) => {
    removeFromCart(itemId);
    const newItems = items.filter((item) => item._id !== itemId);
    setItems(newItems);
  };

  const handleChangeCount = (action, itemId) => {
    const currentItem = items.find((item) => item._id === itemId);
    if (action === "minus" && currentItem.count > 1) {
      const newItems = items.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            count: item.count - 1,
          };
        }
        return item;
      });
      setItems(newItems);
      addToCart(itemId, currentItem.count - 1);
    } else if (action === "plus" && currentItem.count < 50) {
      const newItems = items.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            count: item.count + 1,
          };
        }
        return item;
      });
      setItems(newItems);
      addToCart(itemId, currentItem.count + 1);
    }
  };

  return (
    <>
      <CartSEO />
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
          <div className={styles.cartContainer}>
            {items.length ? (
              <div className={styles.list}>
                {items.map((item) => (
                  <CartItem
                    item={item}
                    count={item.count}
                    handleChangeCount={handleChangeCount}
                    deleteFromCart={deleteFromCart}
                    key={item._id}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.nullCartContainer}>
                <span className={styles.nullCart}>Корзина пуста</span>
              </div>
            )}
            {items.length ? (
              <CartResult items={items} totalCount={totalCount} />
            ) : null}
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
