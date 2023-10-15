import Head from "next/head";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Дом Мебельный центр</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json"></link>
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#e2e8ce" />
        <meta
          name="description"
          content="'Мебельный центр ДОМ' - это крупный онлайн-гипермаркет мебели и товаров для дома. Мы работаем в этой сфере больше 5 лет и сумели зарекомендовать себя как надежного продавца. Купив мебель однажды, 64% клиентов возвращаются к нам за новой мебелью."
        />
        <meta
          name="keywords"
          content="Мебель Нижневартовск, Мебель Лангепас, Мебель Сургут, Мебель Ноябрьск, Мебель Нефтеюганск, Мебель со склада, купить мебель онлайн, онлайн магазин, онлайн магазин мебели, Нижневартовск, Cургут, Лангепас, Ноябрьск, Нефтеюганск, склад, диван, шкаф, стенка, кровать, Мебель для гостиной, Мебель для прихожей, Мягкая мебель, Мебель для спальни, Детская мебель, Мебель для кухни, Шкафы для дома, Матрасы, Мебель из натурального дерева, Плетеная мебель из ротанга, Мебель для ванной комнаты, Мебель для домашнего кабинета и офиса
, Аксессуары для интерьера, аксессуары, зеркала, лампы, кресла, стулья, онлайн, для дачи, комоды, кухонные гарнитуры, кухни, раковины, тумбы, для подростка, для девочки, для мальчика, скидки на мебель, мебель по акции, распродажа, рассрочка"
        ></meta>
        <script src="//code.jivo.ru/widget/fo3JcgKaha" async></script>
      </Head>
      <RecoilRoot>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
