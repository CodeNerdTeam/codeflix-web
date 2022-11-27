import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ChangePassword from "../../components/user/pages/ChangePassword";
import Sidebar from "../../components/user/Sidebar";
import Topbar from "../../components/user/Topbar";

function change_password() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/change-password");
    } else {
      router.push("/start");
    }
  }, []);

  return (
    <div className="bg-white w-screen h-screen">
      <Head>
        <title>Codeflix - Change password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar />
      <div className="flex bg-white">
        <Sidebar />
        <div className="flex4">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}

export default change_password;
