import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { notFound } from "@tanstack/react-router";
import { BookingForm } from "@/mirror/booking";
import { RentalFacts } from "@/mirror/rental-facts";
import extraCss from "@/mirror/extra.css?raw";
import { startMirrorBehaviors } from "@/mirror/behaviors";
import { localizeHtml } from "@/mirror/localize";
import { languages, pageMeta, pagePath, siteOrigin, type Lang } from "@/mirror/locales";
import { getPageHtml } from "@/mirror/sources";
import { placeHtml, placeMeta } from "@/mirror/places";

const themeCss = "/mirror/wp-content/cache/breeze-minification/css/breeze_caravanrent-alicante-com-1-17.css";
const vehicleCss: Record<string, string> = {
  "ford-weinsberg": "/mirror/wp-content/cache/breeze-minification/css/breeze_ford-weinsberg-1-5416.css",
  "fiat-mclouis-mc4-379": "/mirror/wp-content/cache/breeze-minification/css/breeze_fiat-mclouis-mc4-379-1-5621.css",
  "peugeot-chausson": "/mirror/wp-content/cache/breeze-minification/css/breeze_peugeot-chausson-1-5489.css",
};

const pageCopy: Record<string, Record<Lang, { title: string; description: string }>> = {
  "the-advantages-of-traveling-in-motorhomes-in-spain": {
    es: { title: "Ventajas de viajar en autocaravana por España | Caravan Rent", description: "Por qué recorrer España en autocaravana: libertad, ahorro y la costa a tu ritmo." },
    en: { title: "The Advantages of Traveling in Motorhomes in Spain | Caravan Rent", description: "Why a motorhome is one of the best ways to explore Spain." },
    fr: { title: "Avantages de voyager en camping-car en Espagne | Caravan Rent", description: "Pourquoi découvrir l'Espagne en camping-car." },
    de: { title: "Vorteile einer Wohnmobilreise durch Spanien | Caravan Rent", description: "Warum ein Wohnmobil eine der besten Arten ist, Spanien zu entdecken." },
    ru: { title: "Плюсы путешествия по Испании на автодоме | Caravan Rent", description: "Почему автодом — один из лучших способов увидеть Испанию." },
    ua: { title: "Плюси подорожі Іспанією автодомом | Caravan Rent", description: "Чому автодім — один із найкращих способів побачити Іспанію." },
  },
  "what-to-take-on-a-motorhome-trip-to-spain-essential-packing-guide": {
    es: { title: "Qué llevar en un viaje en autocaravana por España | Caravan Rent", description: "Lista práctica para preparar un viaje en autocaravana por España." },
    en: { title: "What to Take on a Motorhome Trip to Spain | Caravan Rent", description: "A practical packing list for a motorhome trip through Spain." },
    fr: { title: "Que emporter pour un voyage en camping-car en Espagne | Caravan Rent", description: "La liste pratique pour préparer un voyage en camping-car." },
    de: { title: "Was Sie für eine Wohnmobilreise nach Spanien einpacken | Caravan Rent", description: "Eine praktische Packliste für die Wohnmobilreise." },
    ru: { title: "Что взять в поездку по Испании на автодоме | Caravan Rent", description: "Практичный список вещей для поездки на автодоме." },
    ua: { title: "Що взяти в поїздку Іспанією автодомом | Caravan Rent", description: "Практичний список речей для поїздки автодомом." },
  },
  "how-to-choose-a-motorhome-for-rent-and-key-things-to-consider": {
    es: { title: "Cómo elegir una autocaravana de alquiler | Caravan Rent", description: "Qué mirar antes de alquilar una autocaravana en Alicante." },
    en: { title: "How to Choose a Motorhome for Rent | Caravan Rent", description: "What to check before you rent a motorhome in Alicante." },
    fr: { title: "Comment choisir un camping-car à louer | Caravan Rent", description: "Ce qu'il faut vérifier avant de louer un camping-car." },
    de: { title: "Wie Sie das richtige Mietwohnmobil wählen | Caravan Rent", description: "Worauf Sie vor der Wohnmobilmiete achten sollten." },
    ru: { title: "Как выбрать автодом в аренду | Caravan Rent", description: "На что смотреть перед арендой автодома в Аликанте." },
    ua: { title: "Як обрати автодім в оренду | Caravan Rent", description: "На що дивитися перед орендою автодома в Аліканте." },
  },
  "category/blog": {
    es: { title: "Blog | Caravan Rent Alicante", description: "Artículos sobre viajes en autocaravana por España." },
    en: { title: "Blog | Caravan Rent Alicante", description: "Articles about motorhome travel in Spain." },
    fr: { title: "Blog | Caravan Rent Alicante", description: "Articles sur les voyages en camping-car en Espagne." },
    de: { title: "Blog | Caravan Rent Alicante", description: "Artikel über Wohnmobilreisen in Spanien." },
    ru: { title: "Блог | Caravan Rent Alicante", description: "Статьи о путешествиях по Испании на автодоме." },
    ua: { title: "Блог | Caravan Rent Alicante", description: "Статті про подорожі Іспанією автодомом." },
  },
  "privacy-policy-2": {
    es: { title: "Política de privacidad | Caravan Rent Alicante", description: "Cómo recogemos, usamos y protegemos tus datos." },
    en: { title: "Privacy Policy | Caravan Rent Alicante", description: "How we collect, use and protect your data." },
    fr: { title: "Politique de confidentialité | Caravan Rent Alicante", description: "Comment nous collectons, utilisons et protégeons vos données." },
    de: { title: "Datenschutz | Caravan Rent Alicante", description: "Wie wir Ihre Daten erheben, nutzen und schützen." },
    ru: { title: "Политика конфиденциальности | Caravan Rent Alicante", description: "Как мы собираем, используем и защищаем ваши данные." },
    ua: { title: "Політика конфіденційності | Caravan Rent Alicante", description: "Як ми збираємо, використовуємо й захищаємо ваші дані." },
  },
  "terms-conditions": {
    es: { title: "Condiciones de alquiler | Caravan Rent Alicante", description: "Condiciones generales del alquiler de autocaravanas." },
    en: { title: "Rental terms | Caravan Rent Alicante", description: "General terms for motorhome rental." },
    fr: { title: "Conditions de location | Caravan Rent Alicante", description: "Conditions générales de location de camping-car." },
    de: { title: "Mietbedingungen | Caravan Rent Alicante", description: "Allgemeine Bedingungen für die Wohnmobilmiete." },
    ru: { title: "Условия аренды | Caravan Rent Alicante", description: "Общие условия аренды автодома." },
    ua: { title: "Умови оренди | Caravan Rent Alicante", description: "Загальні умови оренди автодома." },
  },
  "ford-weinsberg": {
    es: { title: "Ford Weinsberg | Alquiler de autocaravanas", description: "Ford Weinsberg CaraSuite: diésel, manual, 4 plazas y 4 camas." },
    en: { title: "Ford Weinsberg | Motorhome rental", description: "Ford Weinsberg CaraSuite: diesel, manual, 4 seats and 4 beds." },
    fr: { title: "Ford Weinsberg | Location de camping-car", description: "Ford Weinsberg CaraSuite : diesel, manuelle, 4 places et 4 couchages." },
    de: { title: "Ford Weinsberg | Wohnmobil mieten", description: "Ford Weinsberg CaraSuite: Diesel, Schaltgetriebe, 4 Sitze und 4 Betten." },
    ru: { title: "Ford Weinsberg | Аренда автодома", description: "Ford Weinsberg CaraSuite: дизель, механика, 4 места и 4 спальных места." },
    ua: { title: "Ford Weinsberg | Оренда автодома", description: "Ford Weinsberg CaraSuite: дизель, механіка, 4 місця і 4 спальних місця." },
  },
  "fiat-mclouis-mc4-379": {
    es: { title: "Fiat-McLouis MC4 379 | Alquiler de autocaravanas", description: "Fiat McLouis MC4 379: diésel, automático, 5 plazas y 5 camas." },
    en: { title: "Fiat-McLouis MC4 379 | Motorhome rental", description: "Fiat McLouis MC4 379: diesel, automatic, 5 seats and 5 beds." },
    fr: { title: "Fiat-McLouis MC4 379 | Location de camping-car", description: "Fiat McLouis MC4 379 : diesel, automatique, 5 places et 5 couchages." },
    de: { title: "Fiat-McLouis MC4 379 | Wohnmobil mieten", description: "Fiat McLouis MC4 379: Diesel, Automatik, 5 Sitze und 5 Betten." },
    ru: { title: "Fiat-McLouis MC4 379 | Аренда автодома", description: "Fiat McLouis MC4 379: дизель, автомат, 5 мест и 5 спальных мест." },
    ua: { title: "Fiat-McLouis MC4 379 | Оренда автодома", description: "Fiat McLouis MC4 379: дизель, автомат, 5 місць і 5 спальних місць." },
  },
  "peugeot-chausson": {
    es: { title: "Peugeot Chausson | Alquiler de autocaravanas", description: "Peugeot Chausson 724: diésel, manual, 5 plazas y 6 camas." },
    en: { title: "Peugeot Chausson | Motorhome rental", description: "Peugeot Chausson 724: diesel, manual, 5 seats and 6 beds." },
    fr: { title: "Peugeot Chausson | Location de camping-car", description: "Peugeot Chausson 724 : diesel, manuelle, 5 places et 6 couchages." },
    de: { title: "Peugeot Chausson | Wohnmobil mieten", description: "Peugeot Chausson 724: Diesel, Schaltgetriebe, 5 Sitze und 6 Betten." },
    ru: { title: "Peugeot Chausson | Аренда автодома", description: "Peugeot Chausson 724: дизель, механика, 5 мест и 6 спальных мест." },
    ua: { title: "Peugeot Chausson | Оренда автодома", description: "Peugeot Chausson 724: дизель, механіка, 5 місць і 6 спальних місць." },
  },
};

const fixes = `
.cr-promo {
  position: fixed;
  inset: 0;
  z-index: 10000020;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  padding: 52px 10px 10px;
  background: rgba(0, 0, 0, .78);
}
.cr-promo-x {
  position: absolute;
  top: 8px;
  right: 10px;
  z-index: 2;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #111;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
}
.cr-promo-link { display: block; max-width: 100%; max-height: 100%; }
.cr-promo-link img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: calc(100vh - 64px);
  object-fit: contain;
  border-radius: 12px;
}
.mirror-page { overflow-x: clip; }
.mirror-page img { max-width: 100%; height: auto; }
.mirror-page iframe { max-width: 100%; }
.mirror-page .blog-section { padding-top: 0 !important; padding-bottom: 0 !important; }
.mirror-page .card-collapse,
.mirror-page .card-collapse.show { display: block !important; height: auto !important; overflow: visible !important; }
.mirror-page .faq-title > a { cursor: default; pointer-events: none; padding-right: 0 !important; }
.mirror-page .faq-title > a:after,
.mirror-page .faq-title > a::after,
.mirror-page .faq-title > a:not(.collapsed):after,
.mirror-page .faq-title > a:not(.collapsed)::after { content: none !important; display: none !important; }
@keyframes faq-in { from { opacity: 0; } to { opacity: 1; } }
.mirror-page .elementor-element-9ba51d6 .elementor-widget-image,
.mirror-page .elementor-element-9ba51d6 .elementor-widget-image a,
.mirror-page .elementor-element-9ba51d6 .elementor-widget-image figure { max-width: 100%; min-width: 0; }
.mirror-page .elementor-element-9ba51d6 .elementor-widget-image a,
.mirror-page .elementor-element-9ba51d6 .elementor-widget-image figure { display: block; }
.mirror-page .elementor-element-9ba51d6 img {
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
}
.mirror-page .elementor-element-61fb838 { display: none !important; }
@media (min-width: 1025px) {
  .mirror-page .elementor-sticky--active,
  .mirror-page .elementor-element-e7fc08a {
    display: flex !important;
    flex-direction: column !important;
    height: auto !important;
    min-height: 0 !important;
    width: 100% !important;
  }
  .mirror-page .elementor-element-e7fc08a > .e-con-inner {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 100% !important;
    max-width: 1240px !important;
    height: auto !important;
    margin: 0 auto !important;
    padding: 6px 20px !important;
    gap: 16px !important;
    box-sizing: border-box !important;
  }
  .mirror-page .elementor-element-e7fc08a > .e-con-inner > .elementor-element {
    width: auto !important;
    max-width: none !important;
    flex: 0 0 auto !important;
  }
  .mirror-page .elementor-element-12f2d0c { order: 1; }
  .mirror-page .elementor-element-12f2d0c img {
    width: 150px !important;
    max-width: 150px !important;
    height: auto !important;
    max-height: 96px !important;
    object-fit: contain !important;
  }
  .mirror-page .elementor-element-f871f8c {
    order: 2;
    flex: 1 1 auto !important;
  }
  .mirror-page .elementor-element-f871f8c .elementor-nav-menu--main {
    display: flex !important;
    justify-content: center !important;
  }
  .mirror-page .elementor-element-eaccd6c { display: none !important; }
  .mirror-page .elementor-element-e5eda82,
  .mirror-page .elementor-element-ddb11c1 {
    order: 3 !important;
    display: flex !important;
    justify-content: flex-end !important;
    margin-left: auto !important;
    width: auto !important;
  }
  .mirror-page .elementor-menu-toggle { display: none !important; }
}
.mirror-page .elementor-element-eaccd6c .elementor-icon-list-icon i,
.mirror-page .elementor-element-ddb11c1 .elementor-icon-list-icon i { color: #ffa633 !important; }
.mirror-page .elementor-element-eaccd6c .elementor-icon-list-icon svg,
.mirror-page .elementor-element-ddb11c1 .elementor-icon-list-icon svg { fill: #ffa633 !important; width: 22px; height: 22px; }
.mirror-page .elementor-element-eaccd6c .elementor-icon-list-item:hover svg,
.mirror-page .elementor-element-ddb11c1 .elementor-icon-list-item:hover svg { fill: #127384 !important; }
.mirror-page .elementor-element-dede770.elementor-sticky--active {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  z-index: 1000002 !important;
  background: #fff !important;
  overflow: visible !important;
}
.mirror-page .cr-head-spacer { height: 78px; }
@media (max-width: 767px) {
  .mirror-page .cr-head-spacer { height: 56px; }
}
.mirror-page .nav-social {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.mirror-page .nav-social a { color: #127384; font-size: 18px; }
.mirror-page .elementor-sticky__spacer {
  display: block !important;
  visibility: hidden !important;
  position: relative !important;
  pointer-events: none !important;
}
.mirror-page .facts-number,
.mirror-page .elementor-element-de578ca {
  background: #68a4a4 !important;
}
.mirror-page .single-contact-info { position: relative; cursor: pointer; }
.mirror-page .single-contact-info a::after { content: ""; position: absolute; inset: 0; }
.mirror-page .progress-wrap { cursor: pointer; }
.mirror-page .callback-countdown-block { display: none !important; }
#arcontactus.arcontactus-widget.arcontactus-message:not(.open):not(.opened):not(.popup-opened) {
  left: 20px !important;
  right: auto !important;
}
.mirror-page .elementor-element-de578ca {
  background: #68a4a4 !important;
}
.mirror-page #aboutus,
.mirror-page #faq,
.mirror-page #reviews,
.mirror-page #blog,
.mirror-page #contact { scroll-margin-top: 96px; }
.mirror-page .elementor-nav-menu--dropdown.elementor-nav-menu__container { pointer-events: none; }
.mirror-page .elementor-menu-toggle {
  position: relative;
  z-index: 1000004;
  pointer-events: auto;
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
}
.nav-check {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  opacity: 0;
  pointer-events: none;
}
.mirror-page .nav-check:checked + .elementor-menu-toggle .elementor-menu-toggle__icon--open { display: none !important; }
.mirror-page .nav-check:checked + .elementor-menu-toggle .elementor-menu-toggle__icon--close { display: block !important; }
.mirror-page .nav-check:checked + .elementor-menu-toggle + .elementor-nav-menu__container {
  display: block !important;
  position: fixed !important;
  top: calc(var(--nav-top, 72px) + 8px) !important;
  right: 10px !important;
  left: auto !important;
  width: max-content !important;
  max-width: calc(100vw - 20px) !important;
  height: auto !important;
  max-height: calc(100vh - var(--nav-top, 72px) - 24px) !important;
  margin: 0 !important;
  padding: 8px 0 !important;
  transform: none !important;
  overflow: auto !important;
  pointer-events: auto !important;
  visibility: visible !important;
  opacity: 1 !important;
  background: #fff !important;
  border: 1px solid #e4ecec !important;
  border-radius: 16px !important;
  box-shadow: 0 16px 40px rgba(32, 31, 29, .16) !important;
  z-index: 1000003 !important;
}
.mirror-page .elementor-nav-menu--dropdown .elementor-nav-menu,
.mirror-page .elementor-nav-menu--dropdown .menu-item,
.mirror-page .elementor-nav-menu--dropdown a.elementor-item {
  width: auto !important;
  max-width: none !important;
  overflow: visible !important;
  white-space: nowrap !important;
  text-align: left !important;
  box-sizing: border-box !important;
}
.mirror-page .elementor-nav-menu--dropdown .menu-item,
.mirror-page .elementor-nav-menu--dropdown .current-menu-item,
.mirror-page .elementor-nav-menu--dropdown .current_page_item,
.mirror-page .elementor-nav-menu--dropdown a.elementor-item,
.mirror-page .elementor-nav-menu--dropdown a.elementor-item-active,
.mirror-page .elementor-nav-menu--dropdown a.elementor-item:hover,
.mirror-page .elementor-nav-menu--dropdown a.elementor-item:focus {
  background: transparent !important;
  background-color: transparent !important;
  color: #2b2b2b !important;
}
.mirror-page .elementor-nav-menu--dropdown a.elementor-item {
  display: flex !important;
  justify-content: flex-start !important;
  padding: 14px 18px !important;
  font-size: 16px !important;
  line-height: 1.35 !important;
}
@media (max-width: 1024px) {
  .mirror-page .elementor-element-e7fc08a > .e-con-inner {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 6px !important;
    width: 100% !important;
    padding: 0 6px !important;
  }
  .mirror-page .elementor-element-e7fc08a,
  .mirror-page .elementor-element-e7fc08a > .e-con-inner {
    height: 84px !important;
    min-height: 84px !important;
    max-height: 84px !important;
    --min-height: 84px !important;
    --padding-top: 0px !important;
    --padding-bottom: 0px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .mirror-page .elementor-element-12f2d0c,
  .mirror-page .elementor-element-12f2d0c a,
  .mirror-page .elementor-element-12f2d0c figure {
    height: 84px !important;
    width: auto !important;
    max-width: none !important;
    display: flex !important;
    align-items: center !important;
  }
  .mirror-page .elementor-element-12f2d0c img {
    width: auto !important;
    max-width: none !important;
    height: 80px !important;
    max-height: 80px !important;
    object-fit: contain !important;
  }
  .mirror-page .elementor-element-e7fc08a > .e-con-inner > .elementor-element,
  .mirror-page .elementor-element-eaccd6c,
  .mirror-page .elementor-element-f871f8c,
  .mirror-page .elementor-element-ddb11c1 {
    width: auto !important;
    max-width: none !important;
    flex: 0 0 auto !important;
    --container-widget-width: auto;
  }
  .mirror-page .elementor-element-12f2d0c { order: 1; margin-right: auto !important; flex: 0 0 auto !important; }
  .mirror-page .elementor-element-eaccd6c,
  .mirror-page .elementor-element-ddb11c1 { order: 2; }
  .mirror-page .elementor-element-e5eda82 { order: 3; }
  .mirror-page .elementor-element-f871f8c { order: 4; margin-left: 2px !important; }
  .mirror-page .elementor-element-f871f8c .elementor-menu-toggle { margin: 0 !important; background: #fff !important; }
  .mirror-page .elementor-element-eaccd6c .elementor-icon-list-items,
  .mirror-page .elementor-element-eaccd6c a,
  .mirror-page .elementor-element-eaccd6c .elementor-icon-list-item {
    width: auto !important;
    justify-content: flex-end !important;
  }
  .mirror-page .elementor-icon-list-items.elementor-inline-items {
    display: flex !important;
    flex-flow: row nowrap !important;
    align-items: center !important;
    width: max-content !important;
    max-width: none !important;
    margin: 0 !important;
  }
  .mirror-page .elementor-icon-list-item:has(+ .lang-switch-item)::after { content: none !important; }
  .mirror-page .elementor-element-eaccd6c { --e-icon-list-icon-size: 26px; }
  .mirror-page .elementor-inline-items .elementor-icon-list-item { margin-inline: 7px !important; }
  .mirror-page .lang-switch-btn { width: 26px; height: 26px; min-width: 26px; font-size: 10px; border-radius: 3px; }
}
@media (max-width: 767px) {
  .mirror-page .elementor-element-e5eda82 { display: none !important; }
  .mirror-page .elementor-element-dede770,
  .mirror-page .elementor-element-e7fc08a,
  .mirror-page .elementor-element-e7fc08a > .e-con-inner {
    max-width: 100% !important;
    box-sizing: border-box !important;
    padding-left: 6px !important;
    padding-right: 6px !important;
  }
  .mirror-page .elementor-element-e7fc08a > .e-con-inner { gap: 4px !important; padding-top: 0 !important; padding-bottom: 0 !important; }
  .mirror-page .elementor-element-eaccd6c { --e-icon-list-icon-size: 22px; }
  .mirror-page .elementor-inline-items .elementor-icon-list-item { margin-inline: 4px !important; }
  .mirror-page .lang-switch-btn { width: 24px; height: 24px; min-width: 24px; font-size: 10px; }
  .mirror-page .elementor-menu-toggle {
    min-width: 32px !important;
    min-height: 32px !important;
    width: 32px !important;
    padding: 4px !important;
    margin-right: 0 !important;
  }
  .mirror-page .elementor-element-f871f8c { margin-left: 0 !important; }
}
.lang-switch { position: relative; font-family: "Fira Sans", sans-serif; }
.mirror-page .elementor-sticky--active,
.mirror-page .elementor-element-e7fc08a,
.mirror-page .elementor-element-e7fc08a > .e-con-inner,
.mirror-page .elementor-icon-list-items { overflow: visible !important; }
.lang-switch-item { display: inline-flex !important; align-items: center; }
.lang-switch-btn {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  min-width: 32px;
  padding: 0;
  margin: 0;
  list-style: none;
  background: #68a4a4;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1;
  cursor: pointer;
}
.lang-switch-btn::-webkit-details-marker { display: none; }
.lang-switch-btn::marker { content: ""; }
.lang-switch[open] .lang-switch-btn { background: #127384; }
.lang-switch:not([open]) .lang-switch-list { display: none !important; }
.lang-switch[open] .lang-switch-list {
  display: block !important;
  position: absolute;
  right: 0;
  left: auto;
  top: calc(100% + 8px);
  transform: none;
  width: max-content;
  z-index: 1000006;
  margin: 0;
  padding: 6px 14px;
  list-style: none;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, .18);
}
.mirror-page .lang-switch-list a {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: flex-start !important;
  gap: 10px;
  width: 100% !important;
  box-sizing: border-box;
  padding: 9px 0;
  color: #201f1d;
  text-align: left !important;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
}
.lang-flag { display: inline-flex; width: 18px; height: 12px; flex: 0 0 18px; margin: 0 !important; order: 0; border-radius: 2px; overflow: hidden; box-shadow: 0 0 0 1px rgba(0, 0, 0, .15); }
.lang-flag svg { display: block; width: 18px; height: 12px; }
.lang-switch-list a:hover { background: #f3f7f7; }
.lang-switch-list a[aria-current="true"] { color: #127384; font-weight: 700; }
.mirror-page .elementor-element-c44b831 img,
.mirror-page .elementor-element-109ec82 img,
.mirror-page .elementor-element-fc8dfdc img,
.vehicle-page .elementor-widget-image img.attachment-large {
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: cover !important;
  object-position: center !important;
}
.mirror-page .elementor-gallery__container {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 10px !important;
  height: auto !important;
  padding: 0 !important;
  position: relative !important;
}
.mirror-page .e-gallery-item {
  position: relative !important;
  inset: auto !important;
  display: block !important;
  width: auto !important;
  height: auto !important;
  aspect-ratio: 1;
  overflow: hidden;
  transform: none !important;
  margin: 0 !important;
}
.mirror-page .e-gallery-image {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-size: cover !important;
  background-position: center !important;
  opacity: 1 !important;
  filter: none !important;
  transform: none !important;
}
.mirror-page .e-gallery--lazyload .e-gallery-image,
.mirror-page .e-gallery-image img {
  filter: none !important;
  opacity: 1 !important;
  transform: none !important;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.mirror-page .elementor-icon-list--layout-traditional .elementor-icon-list-text { white-space: nowrap; }
@media (max-width: 767px) {
  .mirror-page .elementor-gallery__container { gap: 2px !important; }
}
.cr-lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000008;
  background: rgba(0, 0, 0, .88);
  display: flex;
  align-items: center;
  justify-content: center;
}
.cr-lightbox img { max-width: min(92vw, 1100px); max-height: 88vh; object-fit: contain; }
.cr-lightbox button {
  position: absolute;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 34px;
  cursor: pointer;
  line-height: 1;
}
.cr-lightbox .cr-x { top: 12px; right: 16px; }
.cr-lightbox .cr-prev { left: 8px; top: 50%; }
.cr-lightbox .cr-next { right: 8px; top: 50%; }
#gdpr-bar { display: none !important; }
#gdpr-bar.is-on { display: block !important; }
.vehicle-specs li { display: flex; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid #e6e0d8; font-size: 18px; }
.vehicle-specs .spec-label { font-weight: 700; }
.vehicle-page #comments, .vehicle-page .blogdetails-pagination { display: none; }
.mirror-page .rpi-slides {
  display: flex !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  scroll-behavior: auto !important;
  scroll-snap-type: none !important;
}
@media (max-width: 767px) {
  .mirror-page .wp-gr .grw-row {
    flex-direction: column !important;
    flex-wrap: nowrap !important;
    align-items: stretch !important;
  }
  .mirror-page .wp-gr .grw-row .grw-header,
  .mirror-page .wp-gr .grw-row .grw-content {
    width: 100% !important;
    max-width: 100% !important;
    flex: 0 0 auto !important;
  }
  .mirror-page .wp-gr .grw-content-inner {
    display: flex !important;
    width: 100% !important;
    min-height: 240px !important;
    align-items: stretch !important;
  }
  .mirror-page .wp-gr .rpi-slides {
    width: 100% !important;
    min-height: 240px !important;
    height: auto !important;
    flex: 1 0 auto !important;
    overflow-x: auto !important;
    overflow-y: visible !important;
    -webkit-mask: none !important;
    mask: none !important;
  }
  .mirror-page .wp-gr .rpi-slides .grw-review {
    flex: 0 0 88% !important;
    width: 88% !important;
    max-width: 88% !important;
    min-height: 210px !important;
    height: auto !important;
  }
  .mirror-page .section-search select.form-control {
    display: block;
    width: 100%;
    height: 48px;
    padding: 0 36px 0 12px;
    border: 0;
    background: transparent;
    color: #17191a;
    font-size: 15px;
  }
  .mirror-page figcaption.wp-caption-text,
  .mirror-page figcaption .cr-cities {
    color: #fff !important;
  }
  .mirror-page .faq-card p,
  .mirror-page .card-collapse,
  .mirror-page .card-collapse p {
    color: #201f1d !important;
  }
  .mirror-page .card-collapse.show {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }
  .mirror-page .cr-cities {
    margin: 10px 0 0;
    color: #1aa6b8;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.3;
  }
}
  .mirror-page .cr-hero {
    background: rgba(8, 42, 50, 0.62);
    border-radius: 16px;
    padding: 18px 18px 8px;
  }
  .mirror-page .banner-section .cr-hero h1 {
    font-size: clamp(26px, 3.2vw, 40px) !important;
    line-height: 1.15 !important;
    height: auto !important;
    margin: 0 0 8px !important;
    color: #fff !important;
  }
  .mirror-page .banner-section .cr-hero .cr-hero-slogan,
  .mirror-page .banner-section .cr-hero .cr-hero-lead {
    color: #fff !important;
  }
  .mirror-page .banner-section .cr-hero .cr-hero-slogan { margin: 0 0 12px; font-weight: 600; }
  .mirror-page .cr-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 18px;
    list-style: none;
    margin: 0 0 14px;
    padding: 0;
  }
  .mirror-page .cr-badges li {
    background: none;
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    line-height: 1.3;
    padding: 0;
    border-radius: 0;
    cursor: default;
  }
  .mirror-page .cr-badges li::before {
    content: "✓ ";
    color: #8ee0cf;
    font-weight: 700;
  }
  .mirror-page .cr-hero-lead {
    color: #fff !important;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.45;
    margin: 0 0 16px;
  }
  .mirror-page .cr-hero-actions { display: flex; flex-wrap: wrap; gap: 10px; }
  .mirror-page .cr-hero-actions a.btn {
    margin: 0;
    background-image: none !important;
    background-color: #1aa6b8 !important;
    border: 0 !important;
    color: #fff !important;
  }
  .mirror-page .cr-hero-actions a.cr-wa { background-color: #1ebe5d !important; }
  .mirror-page .cr-hero .cr-home-places { margin-top: 14px; }
  .mirror-page .cr-hero .cr-home-places a {
    background: #fff !important;
    color: #127384 !important;
    padding: 8px 14px !important;
    border-radius: 999px !important;
    border: 0 !important;
  }
  @media (max-width: 991px) {
    .mirror-page .banner-imgs img { max-height: 210px; width: 100%; object-fit: cover; }
  }
  .mirror-page figcaption .cr-van-meta {
    display: inline-block;
    margin-top: 6px;
    color: #fff !important;
    font-weight: 700;
    font-size: 15px;
    line-height: 1.35;
  }
@media (max-width: 767px) {
  .mirror-page .cr-home-places {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 12px 0 4px;
  }
  .mirror-page .cr-home-places a,
  .mirror-page .cr-place-more a {
    display: inline-flex;
    align-items: center;
    padding: 7px 12px;
    border: 1px solid #1aa6b8;
    border-radius: 999px;
    color: #127384;
    background: #fff;
    font-weight: 700;
    text-decoration: none;
  }
  .mirror-page .cr-place { color: #17191a; background: #fff; }
  .mirror-page .cr-place-hero {
    padding: 28px 20px 32px;
    background: #1aa6b8;
    color: #fff;
  }
  .mirror-page .cr-place-hero h1,
  .mirror-page .cr-place h2 { margin: 0 0 10px; color: inherit; font-weight: 700; }
  .mirror-page .cr-place-hero h1 { font-size: 34px; line-height: 1.15; }
  .mirror-page .cr-place-kicker { margin: 0 0 8px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
  .mirror-page .cr-place-hero p { max-width: 760px; margin: 0; font-size: 18px; line-height: 1.45; }
  .mirror-page .cr-place-facts,
  .mirror-page .cr-place-copy,
  .mirror-page .cr-place-fleet,
  .mirror-page .cr-place-prices,
  .mirror-page .cr-place-more { max-width: 980px; margin: 0 auto; padding: 22px 20px 0; }
  .mirror-page .cr-place-facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding-top: 22px; }
  .mirror-page .cr-place-facts article { padding: 14px; border-radius: 14px; background: #e7f6f8; }
  .mirror-page .cr-place-facts h2 { font-size: 18px; color: #127384; }
  .mirror-page .cr-place-facts p,
  .mirror-page .cr-place-copy p,
  .mirror-page .cr-place-prices p { margin: 0 0 12px; line-height: 1.5; }
  .mirror-page .cr-place-map a { color: #127384; font-weight: 700; }
  .mirror-page .cr-place-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .mirror-page .cr-place-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;
    border-radius: 14px;
    background: #127384;
    color: #fff;
    text-decoration: none;
  }
  .mirror-page .cr-place-card img { width: 100%; aspect-ratio: 1; object-fit: cover; }
  .mirror-page .cr-place-card strong,
  .mirror-page .cr-place-card span,
  .mirror-page .cr-place-card em { padding: 0 12px; color: #fff; font-style: normal; }
  .mirror-page .cr-place-card em { padding-bottom: 12px; font-weight: 700; }
  .mirror-page .cr-place-prices table { width: 100%; border-collapse: collapse; margin: 0 0 12px; }
  .mirror-page .cr-place-prices th,
  .mirror-page .cr-place-prices td { padding: 8px 6px; border-bottom: 1px solid #d7e6e8; text-align: left; }
  .mirror-page .cr-place-more { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding-bottom: 28px; }
  .mirror-page .cr-place-more h2 { width: 100%; }
  @media (max-width: 700px) {
    .mirror-page .cr-place-facts,
    .mirror-page .cr-place-cards { grid-template-columns: 1fr; }
    .mirror-page .cr-place-hero h1 { font-size: 28px; }
  }
  .mirror-page .cr-book {
    margin: 16px auto 8px;
    max-width: 920px;
    padding: 18px 16px 16px;
    background: #fff;
    color: #17191a;
    border-radius: 16px;
    box-shadow: 0 10px 28px rgba(0, 0, 0, .08);
  }
  .mirror-page .cr-book h2 {
    margin: 0 0 6px;
    font-size: 22px;
    line-height: 1.2;
  }
  .mirror-page .cr-book p { margin: 0 0 12px; color: #4d5558; }
  .mirror-page .cr-book .cr-van-name {
    margin: -4px 0 8px;
    color: #127384;
    font-weight: 700;
  }
  .mirror-page .cr-book form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .mirror-page .cr-book label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 13px;
    font-weight: 700;
  }
  .mirror-page .cr-phone {
    display: grid;
    grid-template-columns: 124px 1fr;
    gap: 8px;
  }
  .mirror-page .cr-dial {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 44px;
    padding: 0 8px;
    border: 1px solid #d5e4e7;
    border-radius: 10px;
    background: #fff;
    font-weight: 600;
  }
  .mirror-page .cr-dial input {
    width: 48px;
    height: 40px;
    padding: 0;
    border: 0;
    background: transparent;
  }
  .mirror-page .cr-done { padding: 36px 16px; }
  .mirror-page .cr-done,
  .mirror-page .cr-done p {
    text-align: center !important;
  }
  .mirror-page .cr-thanks {
    margin: 0 0 10px;
    color: #127384;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.2;
  }
  .mirror-page .cr-thanks-rest {
    margin: 0 auto;
    max-width: 460px;
    color: #4d5558;
    font-size: 18px;
    line-height: 1.4;
    text-align: center !important;
  }
  .mirror-page .cr-facts {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 18px;
    max-width: 980px;
    margin: 6px auto 26px;
    text-align: left;
  }
  .mirror-page .cr-facts section { min-width: 0; }
  .mirror-page .cr-facts h3 {
    margin: 0 0 6px;
    color: #127384;
    font-size: 15px;
    font-weight: 700;
  }
  .mirror-page .cr-facts p {
    margin: 0 0 6px;
    color: #17191a;
    font-size: 14px;
    line-height: 1.35;
    font-weight: 500;
  }
  @media (max-width: 900px) {
    .mirror-page .cr-facts { grid-template-columns: 1fr 1fr; gap: 14px 18px; }
  }
  @media (max-width: 560px) {
    .mirror-page .cr-facts { grid-template-columns: 1fr; }
  }
  .mirror-page .cr-book input::placeholder {
    color: rgba(23, 25, 26, .35);
  }
  .mirror-page .cr-book input,
  .mirror-page .cr-book select {
    height: 44px;
    width: 100%;
    padding: 0 10px;
    border: 1px solid #d5e4e7;
    border-radius: 10px;
    background: #fff;
    color: #17191a;
    font: 500 15px/1.2 "Fira Sans", sans-serif;
  }
  .mirror-page .cr-book .wide { grid-column: 1 / -1; }
  .mirror-page .cr-quote {
    padding: 12px;
    background: #f3fbfc;
    border-radius: 12px;
    font-weight: 600;
  }
  .mirror-page .cr-quote strong {
    display: block;
    margin-top: 6px;
    color: #127384;
    font-size: 22px;
  }
  .mirror-page .cr-book form > button {
    height: 48px;
    border: 0;
    border-radius: 999px;
    background: #1aa6b8;
    color: #fff;
    font: 700 16px/1 "Fira Sans", sans-serif;
    cursor: pointer;
  }
  .mirror-page .cr-cal-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
    font-weight: 700;
  }
  .mirror-page .cr-cal-head button {
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 999px;
    background: #e7f6f8;
    color: #127384;
    font-size: 20px;
    cursor: pointer;
  }
  .mirror-page .cr-cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    text-align: center;
    font-size: 13px;
  }
  .mirror-page .cr-cal-day {
    height: auto;
    min-height: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    line-height: 1;
    padding: 3px 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: #17191a;
    font: 600 13px/1 "Fira Sans", sans-serif;
    cursor: pointer;
  }
  .mirror-page .cr-cal-price {
    font-size: 9px;
    font-weight: 700;
    color: #127384;
  }
  .mirror-page .cr-cal-day.cr-cal-on .cr-cal-price { color: #fff; }
  .mirror-page .cr-cal-tap { margin: 0 0 8px; font-size: 13px; }
  .mirror-page .cr-cal-day.cr-cal-past {
    background: #b7bec2 !important;
    color: #fff !important;
    text-decoration: line-through;
    cursor: default;
  }
  .mirror-page .cr-cal-day.cr-cal-busy {
    background: #d94b3a !important;
    color: #fff !important;
    text-decoration: line-through;
  }
  .mirror-page .cr-cal-day.cr-cal-off { opacity: .45; cursor: not-allowed; }
  .mirror-page .cr-cal-day.cr-cal-range { background: #e7f6f8; }
  .mirror-page .cr-cal-day.cr-cal-on { background: #1aa6b8; color: #fff; }
  .mirror-page .cr-book-error { color: #a33b2b; }
  .mirror-page .cr-places {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  @media (max-width: 700px) {
    .mirror-page .cr-book form { grid-template-columns: 1fr; }
    .mirror-page .cr-places { grid-template-columns: 1fr 1fr; }
  }
  .mirror-page .cr-trustindex {
    min-height: 240px;
    margin: 8px auto 12px;
    max-width: 1100px;
  }
  .mirror-page .cr-review-cta { text-align: center; margin: 4px 0 28px; }
  .mirror-page .cr-review-cta a {
    display: inline-block;
    background: #fff;
    color: #127384;
    font-weight: 700;
    padding: 12px 22px;
    border-radius: 8px;
    text-decoration: none;
  }
}
`;

export function languageFromPath(pathname: string): Lang {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment === "en" || segment === "fr" || segment === "de" || segment === "ru" || segment === "ua") return segment;
  return "es";
}

export function mirrorHead(lang: Lang, slug = "") {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  const meta = placeMeta(clean, lang) ?? pageCopy[clean]?.[lang] ?? pageMeta[lang];
  const path = pagePath(lang, clean);
  const hrefLang: Record<Lang, string> = { es: "es", en: "en", fr: "fr", de: "de", ru: "ru", ua: "uk" };
  const canonical = `${siteOrigin}${path === "/" ? "/" : path}`;
  const business = !clean
    ? {
        "@context": "https://schema.org",
        "@type": "AutoRental",
        name: "Caravan Rent Alicante",
        url: `${siteOrigin}/`,
        image: `${siteOrigin}/og.jpg`,
        telephone: "+34607223726",
        email: "info@caravanrent-alicante.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Calle La Sagra 92, Las Fuentes II",
          addressLocality: "Torrevieja",
          postalCode: "03185",
          addressRegion: "Alicante",
          addressCountry: "ES",
        },
        areaServed: ["Alicante", "Torrevieja", "Elche"],
      }
    : null;
  const vehicleOg: Record<string, string> = {
    "ford-weinsberg": "/og/ford.jpg",
    "fiat-mclouis-mc4-379": "/og/fiat.jpg",
    "peugeot-chausson": "/og/peugeot.jpg",
  };
  const shareImage = vehicleOg[clean] ? `${siteOrigin}${vehicleOg[clean]}?v=4` : "";
  return {
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:url", content: canonical },
      { property: "og:locale", content: lang === "en" ? "en_GB" : lang === "ua" ? "uk_UA" : `${lang}_${lang.toUpperCase()}` },
      ...(shareImage ? [{ property: "og:image", content: shareImage }] : []),
    ],
    links: [
      { rel: "canonical", href: canonical },
      ...languages.map((code) => ({
        rel: "alternate",
        hrefLang: hrefLang[code],
        href: `${siteOrigin}${pagePath(code, clean) === "/" ? "/" : pagePath(code, clean)}`,
      })),
      { rel: "alternate", hrefLang: "x-default", href: `${siteOrigin}${clean ? `/${clean}` : "/"}` },
      { rel: "stylesheet", href: "https://use.fontawesome.com/releases/v5.8.1/css/all.css" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,600;1,700;1,900&display=swap",
      },
      { rel: "stylesheet", href: themeCss },
      ...(vehicleCss[clean] ? [{ rel: "stylesheet", href: vehicleCss[clean] }] : []),
    ],
    scripts: business
      ? [{ type: "application/ld+json", children: JSON.stringify(business) }]
      : [],
  };
}

function PeugeotPromo({ lang, slug }: { lang: Lang; slug: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (slug === "peugeot-chausson") return;
    try {
      if (sessionStorage.getItem("cr-peugeot-100")) return;
    } catch {
      /* ignore */
    }
    setOpen(true);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [slug]);
  if (!open) return null;
  const close = () => {
    try {
      sessionStorage.setItem("cr-peugeot-100", "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "";
    setOpen(false);
  };
  return (
    <div className="cr-promo" role="dialog" aria-modal="true">
      <button type="button" className="cr-promo-x" onClick={close} aria-label="Cerrar">
        ×
      </button>
      <a className="cr-promo-link" href={pagePath(lang, "peugeot-chausson")} onClick={close}>
        <img src="/promo/peugeot-100.png" alt="Peugeot Chausson desde 100 euros al día" />
      </a>
    </div>
  );
}

export function MirrorPage({ lang, slug = "" }: { lang: Lang; slug?: string }) {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  const source = placeHtml(clean, lang) ?? getPageHtml(slug);
  if (!source) throw notFound();
  const html = localizeHtml(source, lang, slug.replace(/^\/+|\/+$/g, ""));
  const vehicle = ["ford-weinsberg", "fiat-mclouis-mc4-379", "peugeot-chausson"].includes(slug);
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const [factsSlot, setFactsSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const stop = startMirrorBehaviors();
    setSlot(document.getElementById("cr-booking-slot"));
    setFactsSlot(document.getElementById("cr-rental-facts"));
    const box = document.getElementById("trustindex-reviews");
    if (box && !box.querySelector("script")) {
      box.innerHTML =
        '<div id="featurable-263dfd17-ad7e-4a70-8315-c35669f66a6f" data-featurable-async data-location-code="undefined"></div>';
      const script = document.createElement("script");
      script.src = "https://cdn.featurable.com/widget/v2/embed.js";
      script.defer = true;
      script.setAttribute("charset", "UTF-8");
      box.appendChild(script);
    }
    return () => {
      stop();
      setSlot(null);
      setFactsSlot(null);
    };
  }, [lang, slug]);

  return (
    <div className={vehicle ? "mirror-page vehicle-page" : "mirror-page"} lang={lang}>
      <style dangerouslySetInnerHTML={{ __html: extraCss + fixes }} />
      <PeugeotPromo lang={lang} slug={clean} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {slot ? createPortal(<BookingForm lang={lang} vehicle={vehicle ? slug : undefined} />, slot) : null}
      {factsSlot ? createPortal(<RentalFacts lang={lang} />, factsSlot) : null}
    </div>
  );
}
