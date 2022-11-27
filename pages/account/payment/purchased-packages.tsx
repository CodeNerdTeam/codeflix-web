import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Topbar from "../../../components/user/Topbar";

export default function purchased_packages() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/payment/purchased-packages");
    } else {
      router.push("/start");
    }
  }, []);

  return (
    <div className="bg-white w-screen h-screen">
      <Head>
        <title>Codeflix - Purchased packages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Topbar />
        <div className="h-14"></div>
        <div className="bg-white h-14 flex fixed w-full z-[998] transition">
          <div
            className="items-center flex m-auto max-w-full min-w-0 w-[690px]"
            role="navigation"
          >
            <div
              id="btnLeft"
              className="flex-shrink-0 mr-1 align-middle text-[rgba(0,0,0,.54)] fill-[rgba(0,0,0,.54)] border-0 rounded-[50%]
                cursor-pointer inline-block h-12 outline-none overflow-hidden relative text-center w-12 z-0"
              role="button"
              aria-disabled="false"
              tabIndex={0}
              aria-label="Back"
            >
              <span className="relative top-1/2">
                <span className="-top-3 inline-block relative">
                  <span className="text-[#5f6368] text-2xl not-italic font-normal tracking-normal non-text-decoration inline-block direction">
                    <HiOutlineArrowLeft
                      onClick={() => {
                        router.push("/account/payment/payment_package");
                      }}
                    />
                  </span>
                </span>
              </span>
            </div>

            <h1
              className="font-sans font-normal overflow-hidden text-2xl tracking-normal text-ellipsis whitespace-nowrap text-[#202124] 
          flex-grow m-0 p-0 transition-all align-middle lg:font-sans lg:text-3xl lg:font-normal lg:tracking-normal"
              tabIndex={-1}
            >
              Transaction
            </h1>
          </div>

          <div className="-bottom-[10px] h-[10px] overflow-hidden absolute w-full lg:border-t-[1px] lg:border-solid lg:border-t-[#dadce0]">
            <div className="h-[10px] absolute -top-[10px] transition-shadow w-full"></div>
          </div>
        </div>
        <div className="h-14"></div>
      </div>

      <main>
        <div className="contain-style" data-node-index="1;0" data-p="%.@.]">
          <div className="m-auto max-w-[660px]">
            <div className="text-[rgba(0,0,0,.65)] pt-4 px-0 pb-0 md:pt-6 md:pb-0 md:px-0"></div>
            <div className="text-[rgba(0,0,0,.65)]"></div>
            <div
              className="bg-[#fff] shadow-lg md:border md:shadow md:border-solid md:border-[rgb(218,220,224)] 
          md:overflow-hidden md:my-0 md:mx-auto"
            >
              <div className="md:p-6">
                <div className="py-28 px-4 text-center">
                  <div className="flex justify-center m-auto mb-3 max-w-[312px] w-full">
                    <img
                      src="/subscription_empty_subscriptions.png"
                      alt=""
                      width={258}
                      height={134}
                      role="presentation"
                      data-atf="true"
                      data-iml="945.0999999046326"
                    />
                  </div>
                  <div className="text-[rgb(95,99,104)] text-base font-normal tracking-wide">
                    You don't have any subscriptions
                  </div>
                </div>
              </div>
              <div className="hidden md:pb-6"></div>
            </div>
          </div>
          <div className="h-16"></div>
        </div>
      </main>
    </div>
  );
}
