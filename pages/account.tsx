import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function account() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/home");
    } else {
      router.push("/start");
    }
  }, []);

  return (
    <Head>
      <title>Codeflix - Account</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default account;
