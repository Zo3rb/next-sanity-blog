import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Fragment>
  );
}

export default MyApp;
