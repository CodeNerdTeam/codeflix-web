import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

function index() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/home");
    } else {
      router.push("/start");
    }
  }, []);

  return (
    <Head>
      <title>Codeflix</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default index;
