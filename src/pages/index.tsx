import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"/>
        <title>Cloning Machine</title>
        <meta
          name="description"
          content="Cloning Machine"
        />  
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
