import { useState, useEffect, useContext } from "react";
import Page from "@/layout/Page";
import { DataStateContext } from "@/context/dataStateContext";
import Head from "@/components/Head";
import Body from "@/components/Body";
import Total from "@/components/Total";
import ButtonsSubmit from "@/components/ButtonsSubmit";
import sumTotal from "@/functions/sumTotal";
import { useTranslation } from "@/hooks/useTranslation";

const Basket = () => {
  const { t, lang } = useTranslation();
  const { dataContextState } = useContext(DataStateContext) as any;
  const [sum, setSum] = useState<number | string>(0);
  const [sumBefore, setSumBefore] = useState<number | string>(0);
  const [sale, setSale] = useState<number | string>(0);
  const [basket, setBasket] = useState(dataContextState["basket" + lang]);

  useEffect(() => {
    if (!basket?.length) {
      window.location.href = "/";
    }
  }, [basket]);

  useEffect(() => {
    sumTotal(0, 0, basket, setSumBefore, setSale, setSum, lang as "cz" | "en");
  }, []);

  useEffect(() => {
    sumTotal(0, 0, basket, setSumBefore, setSale, setSum, lang as "cz" | "en");
  }, [sum]);

  return (
    <Page className="basket" title={t("basket")}>
      <div className="tm-basket-content-wrap">
        <div className="tm-basket-content">
          <Head />
          <Body
            setSum={setSum}
            sum={sum}
            basket={basket}
            setBasket={setBasket}
          />
        </div>
      </div>
      <div className="basket-right-panel">
        <div className="basket-right-content">
          <Total sum={sumBefore} sale={sale} />
          <div>
            <p>{t("infovat")}</p>
          </div>
          <div className="tm-basket-footer tm-footer-single total-end-footer">
            <ButtonsSubmit />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Basket;
