import { NextSeo } from "next-seo";

const CartSEO = ({ title }) => {
  return (
    <NextSeo
      title="Корзина | Дом"
      description="Корзина товаров"
      keywords="Категории, мебель, корзина, оформление заказа"
    />
  );
};

export default CartSEO;
