import countryData from "@/data/country";
import { useTranslation } from "@/hooks/useTranslation";
import { AddressState, CheckoutErrors } from "@/src/types/shop";
import React from "react";

interface DeliveryProps {
  state: AddressState;
  setState: React.Dispatch<React.SetStateAction<AddressState>>;
  error: CheckoutErrors;
  setError: React.Dispatch<React.SetStateAction<CheckoutErrors>>;
  onBlur: (type: keyof CheckoutErrors) => void;
}

const Delivery = ({
  state,
  setState,
  error,
  onBlur,
  setError,
}: DeliveryProps) => {
  const { t, lang } = useTranslation();

  const handleChange = (name: keyof AddressState, value: string) => {
    setError((prev) => ({ ...prev, [name]: false }));
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="form_column">
        <div className="input_item">
          <input
            className={`${state.email.length && "hasValue"} ${error.email && "invalid"}`}
            type="email"
            onBlur={() => onBlur("email")}
            value={state.email}
            onChange={(e) => handleChange("email", e.target.value)}
            tabIndex={1}
          />
          <label>{t("formemail")}</label>
        </div>
        <div className="input_item">
          <input
            className={`${state.phone.length && "hasValue"} ${error.phone && "invalid"}`}
            type="text"
            value={state.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            tabIndex={2}
          />
          <label>{t("formphone")}</label>
        </div>
      </div>
      <div className="form_column">
        <div className="input_item">
          <input
            className={`${state.name.length && "hasValue"} ${error.name && "invalid"}`}
            type="text"
            value={state.name}
            onChange={(e) => handleChange("name", e.target.value)}
            tabIndex={3}
          />
          <label>{t("formname")}</label>
        </div>
        <div className="input_item">
          <input
            className={`${state.surname.length && "hasValue"} ${error.surname && "invalid"}`}
            type="text"
            value={state.surname}
            onChange={(e) => handleChange("surname", e.target.value)}
            tabIndex={4}
          />
          <label>{t("formsurname")}</label>
        </div>
      </div>
      <div className="form_column">
        <div className="select_item">
          <div uk-form-custom="target: > * > span:first-child">
            <select
              value={state.country}
              onChange={(e) => handleChange("country", e.target.value)}
            >
              {countryData[lang as keyof typeof countryData].map(
                (item: any, index: number) => (
                  <option key={index} value={item.name}>
                    {item.value}
                  </option>
                ),
              )}
            </select>
            <button
              className="uk-button uk-button-default"
              type="button"
              tabIndex={5}
            >
              <span></span>
              <span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="chevron-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="input_item">
          <input
            className={`${state.city.length && "hasValue"} ${error.city && "invalid"}`}
            type="text"
            value={state.city}
            onChange={(e) => handleChange("city", e.target.value)}
            tabIndex={6}
          />
          <label>{t("formcity")}</label>
        </div>
      </div>
      <div className="form_column">
        <div className="input_item">
          <input
            className={`${state.address.length && "hasValue"} ${error.address && "invalid"}`}
            type="text"
            value={state.address}
            onChange={(e) => handleChange("address", e.target.value)}
            tabIndex={7}
          />
          <label>{t("formstreet")}</label>
        </div>
        <div className="input_item">
          <input
            className={`${state.code.length && "hasValue"} ${error.code && "invalid"}`}
            type="text"
            value={state.code}
            onChange={(e) => handleChange("code", e.target.value)}
            tabIndex={8}
          />
          <label>{t("formzip")}</label>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
