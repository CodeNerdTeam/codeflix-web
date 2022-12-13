import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/api";
import { UserEntity } from "../../../models/UserEntity";
import { WalletEntity } from "../../../models/WalletEntity";

function Wallet() {
  const router = useRouter();
  const [data, setData] = useState<UserEntity>();
  const [money, setMoney] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/wallet");
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
        setData(res.data);
        //console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addFunds = async () => {
    const jwtString = await sessionStorage.getItem("token");

    if (money < 10000) {
      alert("The amount must be at least 10,000 ZEN!");
      setMoney(0);
    } else {
      axios
        .put<WalletEntity>(
          `${baseUrl}/api/users/wallets`,
          {
            money: money,
            status: true,
          },
          {
            headers: { Authorization: `Bearer ${jwtString}` },
          }
        )
        .then((res) => {
          alert("Recharge successfully!");
          getUser();
          setMoney(0);
          //console.log(data);
        })
        .catch((error) => {
          alert("Recharge fail!");
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="text-[#555] h-max mx-3 mt-16 max-w-[840px] p-2 lg:p-12 lg:max-w-[1120px] md:p-6 sm:p-4">
      <div className="lg:m-w-[840px]">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="pt-6" tabIndex={-1}>
              <h1 className="hidden p-0 text-center text-[rgb(32,33,36)] font-normal tracking-normal text-3xl lg:block mb-2">
                Codeflix wallet
              </h1>
              <div className="font-normal tracking-wide text-sm mx-auto text-center">
                The money in your Codeflix wallet can be used to buy memberships
                on Codeflix or something else available in the Codeflix's world.
              </div>
            </div>
          </div>
        </div>

        <div className="contain-style">
          <section className="md:flex md:flex-wrap md:-ml-3 md:pt-0 md:w-[calc(100%+24px)] sm:pt-2 pb-5 pt-4">
            <div className="md:w-full relative flex flex-col w-full">
              <div
                className="flex flex-grow flex-shrink bg-white rounded-lg border border-solid border-[rgb(218,220,224)] box-border overflow-hidden mt-2
                   md:mx-3 md:mt-6 sm:mt-4"
              >
                <div className="flex flex-col w-full">
                  <div className="min-h-[1px]">
                    <div
                      className="bg-none border-none non-text-decoration text-left w-full box-border text-[rgb(26,115,232)] pb-2 pt-4 px-4 h-auto
                         md:pt-6 md:px-6"
                    >
                      <div className="flex">
                        <div className="flex flex-col flex-1">
                          <h2
                            className="font-sans font-medium text-base tracking-wide text-[rgb(32,33,36)] flex-grow-0 flex-shrink-0 m-0 p-0
                              md:font-sans md:text-xl md:tracking-normal md:font-normal md:text-[rgb(32,33,36)]"
                          >
                            Wallet information
                          </h2>

                          <div className="font-sans text-sm text-[#555] font-normal tracking-wide flex-grow flex-shrink m-0 pt-2 px-0 pb-0">
                            This information can only be seen by you and is
                            secured by Codeflix's systems.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="min-h-[1px] hover:bg-gray-50">
                    <div className="pl-4 md:pl-6" role="presentation">
                      <div className="border-t-[1px] border-solid border-[rgb(218,220,224)]"></div>
                    </div>

                    <div className="relative outline-none overflow-hidden will-change">
                      <a
                        className="h-full block bg-none border-none non-text-decoration text-left w-full box-border text-[rgb(26,115,232)]
                        pt-[15px] pb-4 px-4 -outline-offset-4 md:px-6"
                      >
                        <div className="flex items-center" role="text">
                          <div className="flex-1">
                            <div className="-mt-1 sm:flex sm:items-stretch sm:flex-wrap">
                              <div className="flex items-center basis-[156px] mr-6 pt-1">
                                <div className="flex items-center pt-1">
                                  <h3 className="font-sans text-xs font-medium normal-case text-[rgb(95,99,104)] m-0 p-0 w-full">
                                    Money
                                  </h3>
                                </div>
                              </div>

                              <div className="flex-grow flex-shrink mr-6">
                                <div className="flex items-center pt-1">
                                  <div className="font-sans font-normal tracking-wide text-sm text-[rgb(32,33,36)] m-0 p-0 w-full">
                                    {data?.wallet.money.toLocaleString()} ZEN
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-full relative flex flex-col w-full">
              <div
                className="flex flex-grow flex-shrink bg-white rounded-lg border border-solid border-[rgb(218,220,224)] box-border overflow-hidden mt-2
                   md:mx-3 md:mt-6 sm:mt-4"
              >
                <div className="flex flex-col w-full">
                  <div className="min-h-[1px]">
                    <div
                      className="bg-none border-none non-text-decoration text-left w-full box-border text-[rgb(26,115,232)] pb-2 pt-4 px-4 h-auto
                         md:pt-6 md:px-6"
                    >
                      <div className="flex">
                        <div className="flex flex-col flex-1">
                          <h2
                            className="font-sans font-medium text-base tracking-wide text-[rgb(32,33,36)] flex-grow-0 flex-shrink-0 m-0 p-0
                              md:font-sans md:text-xl md:tracking-normal md:font-normal md:text-[rgb(32,33,36)]"
                          >
                            Add funds to your Codeflix wallet
                          </h2>

                          <div className="font-sans text-sm text-[#555] font-normal tracking-wide flex-grow flex-shrink m-0 pt-2 px-0 pb-0">
                            Recharge your wallet to enjoy the moments of using
                            Codeflix's services.
                          </div>
                          <div className="font-sans text-sm text-[#555] font-normal tracking-wide flex-grow flex-shrink m-0 pt-2 px-0 pb-0">
                            Minimum deposit amount to the wallet is{" "}
                            <span className="font-bold">10,000</span> ZEN.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="min-h-[1px]">
                    <div className="pl-4 md:pl-6" role="presentation">
                      <div className="border-t-[1px] border-solid border-[rgb(218,220,224)]"></div>
                    </div>

                    <div className="relative outline-none overflow-hidden will-change">
                      <a
                        className="h-full block bg-none border-none non-text-decoration text-left w-full box-border text-[rgb(26,115,232)]
                        pt-[15px] pb-4 px-4 -outline-offset-4 md:px-6"
                      >
                        <div className="flex items-center" role="text">
                          <div className="flex-1">
                            <div className="-mt-1 sm:flex sm:items-stretch sm:flex-wrap">
                              <div className="flex items-center basis-[156px] mr-6 pt-1">
                                <div className="flex items-center pt-1">
                                  <h3 className="font-sans text-xs font-medium normal-case text-[rgb(95,99,104)] m-0 p-0 w-full">
                                    Add funds
                                  </h3>
                                </div>
                              </div>

                              <div className="flex-grow flex-shrink mr-32">
                                <div className="flex items-center pt-1">
                                  <input
                                    className="font-sans font-normal text-sm text-[rgb(32,33,36)] w-full m-0 p-2 border-x border-b
                                    shadow focus:outline-none
                                    rounded"
                                    typeof="number"
                                    value={money}
                                    placeholder="Enter a number you want"
                                    onChange={(e: any) =>
                                      setMoney(e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div
                                className="flex items-center justify-center p-2 w-40 bg-sky-500 rounded-md cursor-pointer text-white
                              hover:bg-sky-400 test-sm"
                                onClick={addFunds}
                              >
                                Recharge
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-full relative flex mt-4 items-center justify-center">
              <div
                className="w-max hover:bg-slate-100 flex items-center justify-center py-2 px-4 rounded cursor-pointer"
                onClick={() => {
                  router.push("/account/wallet/transaction");
                }}
              >
                <span className="text-sky-600 text-base">
                  Management transaction
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
