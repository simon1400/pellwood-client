import React, { useState, useEffect } from "react";
import { modal } from "uikit";
import { AxiosAPI } from "@/restClient";
import { useTranslation } from "@/hooks/useTranslation";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<{ loginEmail?: string; loginPassword?: string }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = () => {
    modal("#forgot-password").hide();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === "email") {
      setError(prev => ({ ...prev, loginEmail: undefined }));
      setEmail(e.target.value);
    }
  };

  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError({ loginEmail: "empty" });
      return;
    }

    // AxiosAPI already has the correct baseURL configured via restClient
    AxiosAPI.post("/send/reset-password", { email })
      .then((res) => {
        console.log(res);
        setDone(true);
      })
      .catch((err) => {
        console.log(err);
        // Map backend errors to state strings if necessary
        // For now, assuming general error logic:
        setError({ loginEmail: "notExist" });
      });
  };

  if (!mounted) return null;

  return (
    <div id="forgot-password" className="uk-flex-top" uk-modal="">
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <div className="tm-canvas-head" style={{ marginTop: 0 }}>
          <h2>{t("forgottenpassword")}</h2>
          <button
            className="tm-canvas-close uk-close-large"
            type="button"
            uk-close=""
            onClick={() => closeModal()}
          ></button>
        </div>

        {!done && (
          <div className="login_form">
            <form onSubmit={send}>
              {error.loginEmail === "notExist" && (
                <div className="uk-alert-danger" uk-alert="">
                  <p>{t("loginErrorWrong")}</p>
                </div>
              )}
              {error.loginEmail === "exist" && (
                <div className="uk-alert-danger" uk-alert="">
                  <p>{t("loginErrorExist")}</p>
                </div>
              )}
              {(error.loginEmail === "empty" ||
                error.loginPassword === "empty") && (
                <div className="uk-alert-danger" uk-alert="">
                  <p>{t("emptyFields")}</p>
                </div>
              )}

              <div className="uk-margin input_item">
                <input
                  className={`${email.length ? "hasValue" : ""} ${
                    error.loginEmail ? "invalid" : ""
                  }`}
                  type="email"
                  value={email}
                  onChange={(e) => handleInput(e, "email")}
                  tabIndex={1}
                />
                <label>{t("formemail")}</label>
              </div>

              <button
                type="submit"
                className="tm-button tm-black-button uk-width-1-1"
              >
                {t("sendResetPasswordButton")}
              </button>
            </form>
          </div>
        )}

        {done && (
          <div className="uk-alert-success" uk-alert="">
            <p>{t("resetLinkSent")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
