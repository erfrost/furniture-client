if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const r=e=>a(e,t),d={module:{uri:t},exports:n,require:r};s[t]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(c(...e),n)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/X2kAYPPH0sGxUc_EPkTOn/_buildManifest.js",revision:"afcf93f824630839292f3ae4b48c5711"},{url:"/_next/static/X2kAYPPH0sGxUc_EPkTOn/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/165-aa869645d639c6dc.js",revision:"aa869645d639c6dc"},{url:"/_next/static/chunks/278-8ac5ba51ed4f8226.js",revision:"8ac5ba51ed4f8226"},{url:"/_next/static/chunks/412-67304a410f670d5f.js",revision:"67304a410f670d5f"},{url:"/_next/static/chunks/659-2b887eb9f2c182ef.js",revision:"2b887eb9f2c182ef"},{url:"/_next/static/chunks/775-a75bef8409675aa7.js",revision:"a75bef8409675aa7"},{url:"/_next/static/chunks/894-adfcf580be0e871f.js",revision:"adfcf580be0e871f"},{url:"/_next/static/chunks/962-4ec753da2269b176.js",revision:"4ec753da2269b176"},{url:"/_next/static/chunks/framework-7a7e500878b44665.js",revision:"7a7e500878b44665"},{url:"/_next/static/chunks/main-7459c6d7e81f882a.js",revision:"7459c6d7e81f882a"},{url:"/_next/static/chunks/pages/_app-a146de9710e571a9.js",revision:"a146de9710e571a9"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/aboutUs-411138a70e507e60.js",revision:"411138a70e507e60"},{url:"/_next/static/chunks/pages/availability-e1516aa4751f0d09.js",revision:"e1516aa4751f0d09"},{url:"/_next/static/chunks/pages/cart-a751c3d39b3794fa.js",revision:"a751c3d39b3794fa"},{url:"/_next/static/chunks/pages/category/%5BcategoryId%5D-42dc97503f136168.js",revision:"42dc97503f136168"},{url:"/_next/static/chunks/pages/contacts-26b79787efeaa76e.js",revision:"26b79787efeaa76e"},{url:"/_next/static/chunks/pages/deliveryAndPayment-71bdc7ddad854078.js",revision:"71bdc7ddad854078"},{url:"/_next/static/chunks/pages/furnisher/%5BfurnisherId%5D-a491d8fa054ca1fe.js",revision:"a491d8fa054ca1fe"},{url:"/_next/static/chunks/pages/furnishers-4462388a91116e9d.js",revision:"4462388a91116e9d"},{url:"/_next/static/chunks/pages/furnitures-a9975cef5f96d0a4.js",revision:"a9975cef5f96d0a4"},{url:"/_next/static/chunks/pages/index-e2a1c2698d638596.js",revision:"e2a1c2698d638596"},{url:"/_next/static/chunks/pages/item/%5BitemId%5D-4586b5cc8a5ccf59.js",revision:"4586b5cc8a5ccf59"},{url:"/_next/static/chunks/pages/kitchen/%5BkitchenId%5D-8e76eaddc45338a9.js",revision:"8e76eaddc45338a9"},{url:"/_next/static/chunks/pages/kitchenWorks-1e865f9556237c80.js",revision:"1e865f9556237c80"},{url:"/_next/static/chunks/pages/kitchensToOrder-816d2138a98f3023.js",revision:"816d2138a98f3023"},{url:"/_next/static/chunks/pages/promotion-d1edb3027b516021.js",revision:"d1edb3027b516021"},{url:"/_next/static/chunks/pages/refund-d8416d5ea83ba27b.js",revision:"d8416d5ea83ba27b"},{url:"/_next/static/chunks/pages/search-6f9701112dabce70.js",revision:"6f9701112dabce70"},{url:"/_next/static/chunks/pages/subcategory/%5BsubcategoryId%5D-1d215f3cbf5df4eb.js",revision:"1d215f3cbf5df4eb"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-67ecae49743f0bac.js",revision:"67ecae49743f0bac"},{url:"/_next/static/css/0193eb95d65f1a0d.css",revision:"0193eb95d65f1a0d"},{url:"/_next/static/css/254d57232aaac38f.css",revision:"254d57232aaac38f"},{url:"/_next/static/css/2a14c755d87c0695.css",revision:"2a14c755d87c0695"},{url:"/_next/static/css/2ca503c9393587b9.css",revision:"2ca503c9393587b9"},{url:"/_next/static/css/42e4be792e8bafbb.css",revision:"42e4be792e8bafbb"},{url:"/_next/static/css/59ca76f2d6a96ca5.css",revision:"59ca76f2d6a96ca5"},{url:"/_next/static/css/5dffe670a142fb7f.css",revision:"5dffe670a142fb7f"},{url:"/_next/static/css/5ec51853d8567bbc.css",revision:"5ec51853d8567bbc"},{url:"/_next/static/css/6712802d5b6b559b.css",revision:"6712802d5b6b559b"},{url:"/_next/static/css/69527e4d1ced6960.css",revision:"69527e4d1ced6960"},{url:"/_next/static/css/6ca6427e8dd0fa53.css",revision:"6ca6427e8dd0fa53"},{url:"/_next/static/css/7d280e8562e3f350.css",revision:"7d280e8562e3f350"},{url:"/_next/static/css/8eab1c2fe6a35d4b.css",revision:"8eab1c2fe6a35d4b"},{url:"/_next/static/css/bb2f2f95d814d0b4.css",revision:"bb2f2f95d814d0b4"},{url:"/_next/static/css/e62895a5fe6385b3.css",revision:"e62895a5fe6385b3"},{url:"/_next/static/css/ece6768cb59aae16.css",revision:"ece6768cb59aae16"},{url:"/_next/static/css/ee1c9ba432646f7d.css",revision:"ee1c9ba432646f7d"},{url:"/_next/static/css/f6daaba2fd095dfd.css",revision:"f6daaba2fd095dfd"},{url:"/_next/static/media/Inter-Medium.0ac8b11a.woff",revision:"0ac8b11a"},{url:"/_next/static/media/Inter-Regular.cbeb09e8.woff",revision:"cbeb09e8"},{url:"/_next/static/media/Inter-SemiBold.f3a684b7.woff",revision:"f3a684b7"},{url:"/_next/static/media/Montserrat-Medium.f9efb4a5.woff",revision:"f9efb4a5"},{url:"/_next/static/media/Montserrat-Regular.644c9f38.woff",revision:"644c9f38"},{url:"/_next/static/media/Montserrat-SemiBold.3d7fec9b.woff",revision:"3d7fec9b"},{url:"/_next/static/media/ajax-loader.0b80f665.gif",revision:"0b80f665"},{url:"/_next/static/media/cartIcon.f1161c0e.svg",revision:"8e7ac8324382b003869af67a9aa36b8a"},{url:"/_next/static/media/catalogIcon.e45e08aa.svg",revision:"b9473a5d3f2a96c815b347418ed961f2"},{url:"/_next/static/media/heartIcon.142d5630.svg",revision:"5272c14fb9df0051d7bd50f6972a0d1d"},{url:"/_next/static/media/logo.ad15d916.svg",revision:"dfb611794c82871af0852320b8c7eeda"},{url:"/_next/static/media/logoWhite.3d0eba4d.svg",revision:"c18ff29e6141424f665bb8758c269a0f"},{url:"/_next/static/media/minus.f1b0b259.svg",revision:"c35959b13bbb601196e70085f9d60202"},{url:"/_next/static/media/plus.4c73255d.svg",revision:"4e86e9bc924c7161afd8749703407e81"},{url:"/_next/static/media/routerArrow.f9fdba7b.svg",revision:"7eb997d3b1c3b63afa6ef9ab3198e80c"},{url:"/_next/static/media/slick.25572f22.eot",revision:"25572f22"},{url:"/_next/static/media/slick.653a4cbb.woff",revision:"653a4cbb"},{url:"/_next/static/media/slick.6aa1ee46.ttf",revision:"6aa1ee46"},{url:"/_next/static/media/slick.f895cfdf.svg",revision:"f895cfdf"},{url:"/_next/static/media/sortIcon.857284eb.svg",revision:"561970ce07d18049ba78cee0cd56badc"},{url:"/_next/static/media/subcategoryIcon.767db888.svg",revision:"04125293df15918350b1d78c76c71a1b"},{url:"/_next/static/media/Нижневартовск1.105d94bb.jpeg",revision:"61f673679c49a104bbb6c26f2e5e8d11"},{url:"/_next/static/media/Нижневартовск2.04fdb913.jpeg",revision:"0d64b012f6b1adc2a5bdfca85a854144"},{url:"/_next/static/media/Нижневартовск3.2f101b51.jpeg",revision:"73c2746e71fa503698a06a300ad52546"},{url:"/favicons/android-chrome-192x192.png",revision:"2f0dc17d812bfab728347196408ac2d2"},{url:"/favicons/android-chrome-512x512.png",revision:"7b83c06b5c2e8f2f245dbd9550d416ba"},{url:"/favicons/apple-touch-icon.png",revision:"3e1dff742b0d78d303dbc5167347f04d"},{url:"/favicons/browserconfig.xml",revision:"b0df1d8364886483f481bc261ea8db4b"},{url:"/favicons/favicon-16x16.png",revision:"4aec6a112193d6f2dbd6b93a1cd922e4"},{url:"/favicons/favicon-32x32.png",revision:"7803541ad84634de738fe29c87462439"},{url:"/favicons/favicon.ico",revision:"b4884de9e606b919645450798b79cf44"},{url:"/favicons/mstile-150x150.png",revision:"8dd3dda48e3f83eaa7553ea5bc8535dd"},{url:"/favicons/safari-pinned-tab.svg",revision:"b2995394e13337d49187a1051882f344"},{url:"/icon-192x192.png",revision:"78bc29f83464d2979135b193d15a34ec"},{url:"/icon-256x256.png",revision:"aa9107f159c8e7d2223404e6aa6af37d"},{url:"/icon-384x384.png",revision:"822d907a77fcd96a949a24a1e68cb7a0"},{url:"/icon-512x512.png",revision:"8545121238c15da2938e3bfc5ce534e5"},{url:"/manifest.json",revision:"0ba85855f840af99cd19a14edbc7984f"},{url:"/robots.txt",revision:"f16c465198ee783e5c974bd25d6e9a1c"},{url:"/sitemap.xml",revision:"1729d9902a13a36d28b7b41daed49e52"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
