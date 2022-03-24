import type { NextPage } from "next";
import Head from "next/head";

import Header from "../components/Header";
import Jumbotron from "../components/Jumbotron";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Snippets | Code-Blog</title>
        <meta
          name="description"
          content="Generated by create next app and might be a great something later"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Jumbotron />
    </div>
  );
};

export default Home;
