import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import AddPaymentMethod from "../../../components/user/pages/AddPaymentMethod";

import Topbar from "../../../components/user/Topbar";

function payment_method() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/payment/payment-method");
    } else {
      router.push("/start");
    }
  }, []);

  return (
    <div className="bg-white w-screen min-h-screen max-h-max">
      <Head>
        <title>Codeflix - Payment method</title>
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
              Payment Methods
            </h1>
          </div>

          <div className="-bottom-[10px] h-[10px] overflow-hidden absolute w-full lg:border-t-[1px] lg:border-solid lg:border-t-[#dadce0]">
            <div className="h-[10px] absolute -top-[10px] transition-shadow w-full"></div>
          </div>
        </div>
        <div className="h-14"></div>
      </div>

      <main>
        {/* Payment Methods */}
        <div className={`${isOpen ? "block" : "hidden"}`}>
          <div className="h-auto visible mx-auto mt-6 mb-3 max-w-[1032px] py-0 px-6 relative align-baseline text-[100%] border-0 outline-0">
            <span
              className="text-[#202124] font-sans tracking-normal font-normal text-lg align-middle outline-none inline-block 
          overflow-hidden relative"
            >
              Your payment methods are already linked to Codeflix. You can add
              or remove your payment method here.
            </span>
          </div>

          <div className="mb-14 mt-6 mx-auto border-0 outline-0 text-[100%] align-baseline py-0 px-6 max-w[1032px]">
            <div className="my-0 mx-auto max-w-[1032px]">
              <div
                className="ml-0 rounded-lg mt-0 max-w-none mr-0 w-full mb-6 border border-solid border-[#e8eaed] box-border bg-white 
              flex-auto inline-block align-top md:max-w-[calc(50%-12px)] md:w-[calc(50%-12px)] md:mr-3 "
              >
                <div>
                  <div className="flex">
                    <div className="my-6 mr-6 relative flex-auto order-2">
                      <div className="font-sans text-lg font-normal tracking-normal w-full text-[#202124] mr-6">
                        MoMo e-wallet: •••• 6789
                      </div>
                    </div>

                    <div className="h-[60px] m-6 w-[100px] flex-[0_0_100px] order-1">
                      <img
                        src="/momo.png"
                        alt=""
                        aria-hidden="true"
                        className="max-h-full max-w-full"
                      />
                    </div>
                  </div>

                  <div className="border-t border-solid border-[#f1f3f4] py-[10px] pr-0 pl-6 min-h-[36px] overflow-auto">
                    <div className="inline-block float-right">
                      <div
                        className="h-9 leading-9 inline-block"
                        data-action-type="2"
                        data-ui-reference="3042"
                      >
                        <a
                          href=""
                          data-target-type="1"
                          data-ui-reference="7111"
                          tabIndex={0}
                          role="button"
                          className="font-sans rounded text-sm font-medium h-9 tracking-normal leading-9 mr-6 px-6 non-text-decoration
                        align-top text-[#1a73e8] bg-transparent outline-none inline-block overflow-hidden relative hover:bg-slate-50"
                        >
                          <div className="mt-0">
                            <span>Delete</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                data-target-type="2"
                data-place-name="41"
                data-ui-reference="11207"
                tabIndex={0}
                role="button"
                className="Payment-method-add mr-0 border-2 border-dashed border-[#e8eaed] h-[167px] leading-[167px] rounded mt-0 mb-6 
              non-text-decoration flex-auto box-border p-0 relative text-center font-medium text-sm tracking-normal align-top text-[#1a73e8] 
              bg-transparent outline-none inline-block ml-0 max-w-none w-full overflow-hidden 
              md:max-w-[calc(50%-12px)] md:w-[calc(50%-12px)] md:ml-3 hover:bg-slate-50"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="inline-block mt-0">
                  <span>Add a payment method</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Add a payment method */}
        <div className={`${isOpen ? "hidden" : "block"}`}>
          <AddPaymentMethod />
        </div>
      </main>
    </div>
  );
}

export default payment_method;
