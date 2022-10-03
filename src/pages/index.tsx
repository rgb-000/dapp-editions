import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>The Cloning Machine</title>
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
