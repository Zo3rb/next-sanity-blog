import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";

import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <Footer />
    </Fragment>
  );
}

export default MyApp;
