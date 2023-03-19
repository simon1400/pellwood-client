import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import sanityClient from "../lib/sanity.js";
import translate from "../data/staticTranslate";
import { DataStateContext } from "../context/dataStateContext";
import localize from "../data/localize";
import Canvas from "./Canvas";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { lang, currency } = localize(router.locale);

  const query = `*[_type == "archive" && !(_id == '3cc07543-ce81-4ad2-ace0-8bf754217065')] {
    "title": ${lang}.title,
    "slug": ${lang}.slug,
    "sort": ${lang}.sort
  } | order(sort asc)`;

  const { dataContextState, dataContextDispatch } =
    useContext(DataStateContext);
  const [menu, setMenu] = useState([]);
  const [basketCount, setBasketCount] = useState(0);
  const [hamburger, setHamburger] = useState(false);

  useEffect(() => {
    sanityClient.fetch(query).then((data) => setMenu(data));
  }, []);

  useEffect(() => {
    sanityClient.fetch(query).then((data) => setMenu(data));
  }, [router.locale]);

  useEffect(() => {
    setBasketCount(dataContextState["basketCount" + lang]);
  }, [dataContextState["basketCount" + lang]]);

  const changeLanguage = (e, url) => {
    dataContextDispatch({ state: [], type: "basket" + lang });
    dataContextDispatch({ state: 0, type: "basketCount" + lang });
  };

  return (
    <>
      <Canvas currency={currency} />
      <header>
        <div className="uk-container uk-container-expand uk-height-1-1">
          <div className="uk-flex uk-flex-between uk-flex-middle uk-height-1-1">
            <Link href="/">
              <a className="logo-wrap uk-width-auto">
                <img
                  src="/assets/logo.svg"
                  width="200"
                  height="100%"
                  alt="Pellwood"
                />
              </a>
            </Link>
            <div className="uk-text-right uk-width-expand uk-hidden@m">
              <button
                className={`hamburger hamburger--spin ${
                  hamburger ? "is-active" : ""
                }`}
                onClick={() => setHamburger(!hamburger)}
                type="button"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
            <div
              className={`top-nav uk-width-expand ${
                hamburger ? "menu-active" : ""
              }`}
            >
              <nav>
                <ul>
                  <li
                    className={
                      router.asPath.indexOf("/produkty") >= 0
                        ? "active-menu-top"
                        : ""
                    }
                  >
                    <Link href="/produkty?size=6&category=all">
                      <a>{translate.products[lang]}</a>
                    </Link>
                  </li>
                  {(menu || []).map((item, index) => (
                    <li
                      key={index}
                      className={
                        router.asPath.indexOf(item?.slug.current) >= 0
                          ? "active-menu-top"
                          : ""
                      }
                    >
                      <Link href={`/kategorie/${item.slug.current}`}>
                        <a>{item.title}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="lang-nav uk-hidden@m">
                <nav>
                  <ul>
                    <li className={lang === "cz" ? "menu_active" : undefined}>
                      <Link href="/" locale="cs">
                        <a>cs</a>
                      </Link>
                    </li>
                    <li className={lang === "en" ? "menu_active" : undefined}>
                      <Link href="/" locale="en">
                        <a>en</a>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="uk-flex function-button-wrap uk-width-auto">
              <div className="lang-nav uk-visible@m">
                <nav>
                  <ul>
                    <li
                      className={lang === "cz" ? "menu_active" : undefined}
                      onClick={(e) => changeLanguage(e, "/")}
                    >
                      <Link href="/" locale="cs">
                        <a>cs</a>
                      </Link>
                    </li>
                    <li
                      className={lang === "en" ? "menu_active" : undefined}
                      onClick={(e) => changeLanguage(e, "/en")}
                    >
                      <Link href="/en" locale="en">
                        <a>en</a>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="user-area">
                <div className="login">
                  <a
                    nohref=""
                    href="/"
                    className="basket_count"
                    uk-toggle="target: #offcanvas-flip"
                    aria-expanded={false}
                  >
                    {basketCount}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
