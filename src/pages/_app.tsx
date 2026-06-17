import "@/scss/main.scss";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { DataProvider } from "@/context/dataStateContext";
import { Oswald, Raleway } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: ["200", "300", "400"], display: "swap" });
const raleway = Raleway({ subsets: ["latin"], weight: ["500"], display: "swap" });

// loads the Icon plugin
UIkit.use(Icons);

const App = ({ Component, pageProps }: any) => {
  return (
    <DataProvider>
      <style jsx global>{`
        :root {
          --font-oswald: ${oswald.style.fontFamily};
          --font-raleway: ${raleway.style.fontFamily};
        }
        body {
          font-family: ${raleway.style.fontFamily}, sans-serif;
        }
        h1, h2, h3, h4, h5, h6, .category_short_name, .basket-body-price, .tm-basket-body table thead tr th, .status span, .tm-remove-item a, .textarea_item textarea, .select_item button, .input_item label, .input_item input, .tm-payship .uk-grid label, .tm-payship .uk-grid .method-price, .copyright span {
          font-family: ${oswald.style.fontFamily}, sans-serif !important;
        }
      `}</style>
      <div className={`${oswald.className} ${raleway.className}`}>
        <Component {...pageProps} />
      </div>
    </DataProvider>
  );
};

export default App;
