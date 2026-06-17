import React from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { BasketItem } from "@/src/types/shop";

interface TotalProps {
  sum: number | string;
  sale?: number | string;
  sumBefore?: number | string;
  basket?: BasketItem[];
  delivery?: string | number;
  payment?: string | number;
  isEnd?: boolean;
}

const Total = ({
  sum,
  sale = 0,
  sumBefore,
  basket,
  delivery,
  payment,
  isEnd,
}: TotalProps) => {
  const { t, lang, currency } = useTranslation();

  const parsedSumBefore = typeof sumBefore === 'string' ? parseFloat(sumBefore) || 0 : sumBefore || 0;
  const parsedSum = typeof sum === 'string' ? parseFloat(sum) || 0 : sum || 0;

  return (
    <div className={isEnd ? "tm-total-end" : "tm-basket-total"}>
      {isEnd && (
        <>
          <div className="tm-head-total">
            <h2>{t("ordersummary")}</h2>
            <Link href="/basket">{t("editItems")}</Link>
          </div>
          <div className="tm-canvas-basket-item-wrap">
            {(basket || []).map((item, index) => (
              <div key={item.id || index} className="tm-basket-item">
                <div
                  data-src={item.imgUrl}
                  className="tm-basket-img-wrap uk-background-contain"
                  uk-img=""
                ></div>
                <div className="tm-basket-item-info">
                  <h3 className="tm-basket-item-head">{item.nameProduct}</h3>
                  {item.variantName === item.nameProduct ? (
                    ""
                  ) : (
                    <span>{item.variantName}</span>
                  )}
                  <span>
                    {typeof item.variantPrice === "string"
                      ? item.variantPrice
                      : `${item.variantPrice} ${currency}`}
                  </span>
                  <span>
                    {item.countVariant} {t("pc")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={isEnd ? "tm-basket-total basket-total-end" : ""}>
        <table className="uk-table uk-table-divider">
          {!isEnd && (
            <thead>
              <tr>
                <th colSpan={2}>{t("ordersummary")}</th>
              </tr>
            </thead>
          )}
          <tbody>
            <tr>
              <td>{t("delivery")}</td>
              <td>
                {isEnd ? (
                  <span
                    className={
                      delivery === t("free") ||
                      (delivery &&
                        String(delivery).length > 0 &&
                        ((lang === "cz" && parsedSumBefore > 1500) ||
                          (lang === "en" && parsedSumBefore > 100)))
                        ? "tm-positive"
                        : ""
                    }
                  >
                    {delivery &&
                      String(delivery).length > 0 &&
                      ((lang === "cz" && parsedSumBefore <= 1500) ||
                        (lang === "en" && parsedSumBefore <= 100)) &&
                      delivery}
                    {delivery &&
                      String(delivery).length > 0 &&
                      ((lang === "cz" && parsedSumBefore > 1500) ||
                        (lang === "en" && parsedSumBefore > 100)) &&
                      t("free")}
                    {(!delivery || String(delivery).length === 0) && t("notSelected")}
                  </span>
                ) : (
                  <span
                    className={`${(lang === "en" && parsedSum > 100) || (lang === "cz" && parsedSum > 1500) ? "tm-positive" : ""}`}
                  >
                    {lang === "cz" && parsedSum <= 1500 && "od 150 Kč"}
                    {lang === "en" && parsedSum <= 100 && "10 €"}
                    {lang === "en" && parsedSum > 100 && t("free")}
                    {lang === "cz" && parsedSum > 1500 && t("free")}
                  </span>
                )}
              </td>
            </tr>
            {isEnd && (
              <tr>
                <td>{t("payment")}</td>
                <td>
                  <span className={payment === t("free") ? "tm-positive" : ""}>
                    {payment && String(payment).length > 0 ? payment : t("notSelected")}
                  </span>
                </td>
              </tr>
            )}
            {Number(sale) > 0 && (
              <tr>
                <td>{t("sale")}</td>
                <td>
                  -{sale} {currency}
                </td>
              </tr>
            )}
            <tr>
              <td>{t("totalprice")}</td>
              <td>
                {sum} {currency}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Total;
