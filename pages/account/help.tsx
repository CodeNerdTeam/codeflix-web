import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Help from "../../components/user/pages/Help";
import Sidebar from "../../components/user/Sidebar";
import Topbar from "../../components/user/Topbar";

function help() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/help");
    } else {
      router.push("/start");
    }
  }, []);

  return (
    <div className="bg-white w-screen h-screen">
      <Head>
        <title>Codeflix - Help</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar />
      <div className="flex bg-white">
        <Sidebar />
        <div className="flex4">
          <Help />
        </div>
      </div>
    </div>
  );
}

export default help;
