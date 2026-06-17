import { useEffect, useContext } from "react";
import { DataStateContext } from "@/context/dataStateContext";
import Page from "@/layout/Page";
import Link from "next/link";
import gtag from "@/functions/gtag";
import { AxiosAPI } from "@/restClient";
import localize from "@/data/localize";
import { useTranslation } from "@/hooks/useTranslation";

export async function getServerSideProps({ query, locale }: any) {
  const { lang } = localize(locale);
  if (!query.refId) {
    return {
      redirect: {
        destination: "/not-found",
        permanent: false,
      },
    };
  }

  const res = await AxiosAPI.get(`/payment/status/${query.refId}`);

  const order = res.data?.data?.[0];

  if (!order) {
    return {
      redirect: {
        destination: "/not-found",
        permanent: false,
      },
    };
  }

  // Отправляем email без ожидания ответа (fire and forget)
  // Это не блокирует загрузку страницы
  AxiosAPI.post(`/send/orderInfo`, order).catch((err) => {
    console.error("Failed to send order email:", err.message);
  });

  var status = "",
    dataGtag: any = undefined;

  if (order.payOnline) {
    status = order.status || "";
    if (status !== "PENDING" && status !== "CANCELLED") {
      dataGtag = gtag(order);
    }
  } else {
    status = "dobirka";
    dataGtag = gtag(order);
  }

  return {
    props: {
      status,
      dataGtag: dataGtag || null,
    },
  };
}

interface ThankYouProps {
  status: string;
  dataGtag?: any;
}

const ThankYou = ({ status, dataGtag }: ThankYouProps) => {
  const { dataContextDispatch } = useContext(DataStateContext) as any;
  const { t, lang } = useTranslation();

  useEffect(() => {
    dataContextDispatch({ state: [], type: "basket" + lang });
    dataContextDispatch({ state: 0, type: "basketCount" + lang });
  }, [status, lang, dataContextDispatch]);

  return (
    <Page className="thank-you-page base-page" purchase={dataGtag}>
      <h1>{t("thankOrder")}</h1>
      <p>{t("thankInfo")}</p>
      {!!status.length && status === "PENDING" && (
        <div className="uk-text-warning">{t("PayStatusWait")}</div>
      )}
      {!!status.length && status === "CANCELLED" && (
        <div className="uk-text-danger">{t("PayStatusError")}</div>
      )}
      {!!status.length && status === "PAID" && (
        <div className="uk-text-success">{t("PayStatusOk")}</div>
      )}
      {!!status.length && status === "dobirka" && (
        <div className="uk-text-success">{t("PayStatusCash")}</div>
      )}

      <Link href="/" className="tm-button tm-black-button">
        {t("backtohp")}
      </Link>
    </Page>
  );
};

export default ThankYou;
