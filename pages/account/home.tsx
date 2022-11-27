import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Home from "../../components/user/pages/Home";
import Sidebar from "../../components/user/Sidebar";
import Topbar from "../../components/user/Topbar";

function home() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/home");
    } else {
      router.push("/start");
    }
  }, []);

  return (
    <div className="bg-white w-screen h-screen">
      <Head>
        <title>Codeflix - Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar />
      <div className="flex bg-white">
        <Sidebar />
        <div className="flex4">
          <Home />
        </div>
      </div>
    </div>
  );
}

export default home;
