import { NextSeo } from "next-seo";

const CatalogSEO = ({ title, description }) => {
  return (
    <NextSeo
      title={title}
      description={description ? description : "Каталог товаров"}
      keywords="Категории, мебель, поиск, фильтрация, подкатегории, добавить в корзину, описание, описание товара, навигация, Мебель Нижневартовск, Мебель со склада, купить мебель онлайн, онлайн магазин, онлайн магазин мебели, скидки на мебель, мебель по акции, распродажа, характеристики товара"
    />
  );
};

export default CatalogSEO;
