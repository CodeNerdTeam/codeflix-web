import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Payment_Package from "../../../components/user/pages/Payment_Package";
import Sidebar from "../../../components/user/Sidebar";
import Topbar from "../../../components/user/Topbar";

function payment_package() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/payment/payment-package");
    } else {
      router.push("/start");
    }
  }, []);

  return (
    <div className="bg-white w-screen h-screen">
      <Head>
        <title>Codeflix - Payment and subscription package</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Topbar />
      <div className="flex bg-white">
        <Sidebar />
        <div className="flex4">
          <Payment_Package />
        </div>
      </div>
    </div>
  );
}

export default payment_package;
