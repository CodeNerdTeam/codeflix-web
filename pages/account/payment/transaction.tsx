import Topbar from "../../../components/user/Topbar";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { UserEntity } from "../../../models/UserEntity";
import axios from "axios";
import { baseUrl } from "../../../constants/api";

function transaction() {
  const router = useRouter();
  const [user, setUser] = useState<UserEntity>();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/payment/transaction");
    } else {
      router.push("/start");
    }
  }, []);

  const getUser = async () => {
    const jwtString = await sessionStorage.getItem("token");
    axios
      .get<UserEntity>(`${baseUrl}/api/users/profile`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setUser(res.data);
        //console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const renderTransaction = () => {
    return (
      <>
        {user?.wallet.transactions.map((value) => (
          <div className="m-auto max-w-[660px]">
            <div className="text-[rgba(0,0,0,.65)] pt-4 px-0 pb-0 md:pt-6 md:pb-0 md:px-0"></div>
            <div
              className="bg-[#fff] shadow-lg md:border md:shadow md:border-solid md:border-[rgb(218,220,224)] 
          md:overflow-hidden md:my-0 md:mx-auto"
            >
              <div className="md:p-6">
                <div className="flex flex-col text-[rgb(95,99,104)] text-base font-normal tracking-wide">
                  <span>Name: {value.packageName}</span>
                  <span>Price: {value.price} ZEN</span>
                  <span>Time: {value.time} days</span>
                  <span>Purchase date: {value.created.toString()}</span>
                  <span>Package expiry date: {user.dateUse.toString()}</span>
                </div>
              </div>
              <div className="hidden md:pb-6"></div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="bg-white w-screen min-h-screen">
      <Head>
        <title>Codeflix - Transaction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Topbar />
        <div className="h-14"></div>
        <div className="bg-white h-14 flex fixed w-full z-[998] transition">
          <div className="items-center flex m-auto max-w-full min-w-0 w-[690px]">
            <div
              id="btnLeft"
              className="flex-shrink-0 mr-1 align-middle text-[rgba(0,0,0,.54)] fill-[rgba(0,0,0,.54)] border-0 rounded-[50%]
            cursor-pointer inline-block h-12 outline-none overflow-hidden relative text-center w-12 z-0"
            >
              <span className="relative top-1/2">
                <span className="-top-3 inline-block relative">
                  <span className="text-[#5f6368] text-2xl not-italic font-normal tracking-normal non-text-decoration inline-block direction">
                    <HiOutlineArrowLeft
                      onClick={() => {
                        router.push("/account/payment/payment-package");
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
            <div className="p-4 text-[rgba(0,0,0,.65)] md:py-6 md:px-0">
              <div className="leading-[22px]">
                Your purchases that you make through Codeflix and the Assistant.{" "}
                <a
                  href=""
                  rel="noreferrer noopener"
                  data-help-url="true"
                  className="text-[rgb(26,115,232)]"
                >
                  Read more
                </a>
              </div>

              <div className="text-[rgb(32,33,36)] leading-[22px] mt-4 p-0 md:py-4 md:px-6">
                <div className="flex flex-row">
                  <div className="flex-grow-0 flex-shrink-0 rounded-[50%] block mr-4">
                    <div className="h-9 w-9">
                      <img src="/order_shield_lock_icon.png" />
                    </div>
                  </div>

                  <div className="flex items-center min-h-[40px] flex-grow flex-shrink m-w-0">
                    <div className="w-full">
                      Only you can view this data. Codeflix protects your
                      privacy and safety.
                      <br />
                      <a href="" className="text-[rgb(26,115,232)]">
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {user?.wallet.transactions.length ? (
              renderTransaction()
            ) : (
              <div className="m-auto max-w-[660px]">
                <div className="text-[rgba(0,0,0,.65)] pt-4 px-0 pb-0 md:pt-6 md:pb-0 md:px-0"></div>
                <div
                  className="bg-[#fff] shadow-lg md:border md:shadow md:border-solid md:border-[rgb(218,220,224)] 
                  md:overflow-hidden md:my-0 md:mx-auto"
                >
                  <div className="md:p-6">
                    <div className="py-28 px-4 text-center">
                      <div className="flex justify-center m-auto mb-3 max-w-[312px] w-full">
                        <img
                          src="/order_empty_purchases.png"
                          width={258}
                          height={134}
                        />
                      </div>
                      <div className="text-[rgb(95,99,104)] text-base font-normal tracking-wide">
                        You don't have any transactions yet
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:pb-6"></div>
                </div>
              </div>
            )}

            <div className="h-16"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default transaction;
