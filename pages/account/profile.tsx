import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Profile from "../../components/user/pages/Profile";
import Sidebar from "../../components/user/Sidebar";
import Topbar from "../../components/user/Topbar";

function profile() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/profile");
    } else {
      router.push("/start");
    }
  }, []);

  return (
    <div className="bg-white w-screen h-screen">
      <Head>
        <title>Codeflix - Personal information</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar />
      <div className="flex bg-white">
        <Sidebar />
        <div className="flex4">
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default profile;
