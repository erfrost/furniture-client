import Head from "next/head";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Дом Мебельный центр</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="manifest" href="/manifest.json"></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        ></link>
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        ></link>
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#e2e8ce" />
        <meta
          name="description"
          content='"Мебельный центр ДОМ" - это крупный онлайн-гипермаркет мебели и товаров для дома. Мы работаем в этой сфере больше 5 лет и сумели зарекомендовать себя как надежного продавца. Купив мебель однажды, 64% клиентов возвращаются к нам за новой мебелью.'
        />
        <meta
          name="keywords"
          content="Мебель Нижневартовск, Мебель Лангепас, Мебель со склада, купить мебель онлайн, онлайн магазин, онлайн магазин мебели, Нижневартовск, Лангепас, склад, диван, шкаф, стенка, кровать, Мебель для гостиной, Мебель для прихожей, Мягкая мебель, Мебель для спальни, Детская мебель, Мебель для кухни, Шкафы для дома, Матрасы, Мебель из натурального дерева, Плетеная мебель из ротанга, Мебель для ванной комнаты, Мебель для домашнего кабинета и офиса
, Аксессуары для интерьера, аксессуары, зеркала, лампы, кресла, стулья, онлайн, для дачи, комоды, кухонные гарнитуры, кухни, раковины, тумбы, для подростка, для девочки, для мальчика, скидки на мебель, мебель по акции, распродажа, рассрочка"
        />
        <meta name="yandex-verification" content="23c981ccac8729f6" />
        <meta name="google-site-verification" content="1Bvp_6TjYTPGy2u5RoIMW-fzh547OhfeZqyppeg6MKE" />
      </Head>
      <RecoilRoot>
        <ChakraProvider>
          <Component {...pageProps} />
          <Script src="//code.jivo.ru/widget/78D5IbCyIB" async></Script>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}
