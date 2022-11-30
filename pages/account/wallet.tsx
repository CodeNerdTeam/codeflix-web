import Head from "next/head";
import React from "react";
import Wallet from "../../components/user/pages/Wallet";
import Sidebar from "../../components/user/Sidebar";
import Topbar from "../../components/user/Topbar";

function wallet() {
  return (
    <div className="bg-white w-screen h-screen">
      <Head>
        <title>Codeflix - Wallet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar />
      <div className="flex bg-white">
        <Sidebar />
        <div className="flex4">
          <Wallet />
        </div>
      </div>
    </div>
  );
}

export default wallet;
