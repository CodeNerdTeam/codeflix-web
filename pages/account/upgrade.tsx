import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Topbar from "../../components/user/Topbar";
import { baseUrl } from "../../constants/api";
import { PackageEntity } from "../../models/PackageEntity";
import { UserEntity } from "../../models/UserEntity";

function upgrade() {
  const router = useRouter();
  const [data, setData] = useState<PackageEntity[]>([]);
  const [goi, setGoi] = useState<PackageEntity>();
  const [user, setUser] = useState<UserEntity>();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/upgrade");
    } else {
      router.push("/start");
    }
  }, []);

  const refreshToken = async () => {
    const jwtString = await sessionStorage.getItem("token");

    axios
      .get(`${baseUrl}/api/users/getNewToken`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      refreshToken();
    }, 600000);
  });

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

  const getPackages = async () => {
    const jwtString = await sessionStorage.getItem("token");
    axios
      .get<PackageEntity[]>(`${baseUrl}/api/packages`, {
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

  useEffect(() => {
    getUser();
    getPackages();
  }, []);

  const getPackageById = async (id: string) => {
    const jwtString = await sessionStorage.getItem("token");
    axios
      .get<PackageEntity>(`${baseUrl}/api/packages/${id}`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setGoi(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Codeflix - Buy package</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar />

      <div className="min-h-[139px]">
        <div className="bg-white">
          <div className="pt-6 w-full px-[15px] mx-auto xl:max-w-[1180px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px]">
            <h3 className="font-sans text-left text-2xl font-extrabold mb-6 text-black">
              Payment
            </h3>

            <div className="flex flex-wrap -mx-[15px]">
              <div className="flex-[0_0_100%] max-w-full relative w-full px-[15px] lg:flex-[0_0_58.33333333%] lg:max-w-[58.33333333%]">
                {/* Packages */}
                <div className="bg-[#fcfbfb] rounded-xl shadow-[0px_4px_4px_rgb(0_0_0_/_25%)] py-5 px-7 mb-6">
                  <h4 className="text-lg font-extrabold mb-2 font-sans text-black text-left">
                    Packages
                  </h4>

                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <>
                        {data.map((value) => {
                          return (
                            <div className="mb-4 bg-[#f4eeee] relative rounded-xl p-2">
                              <div className="flex-grow pl-10 md:pr-[435.33px] text-base font-medium font-sans text-left text-black">
                                <FormControlLabel
                                  value={value.id}
                                  control={<Radio />}
                                  label=""
                                  onClick={() => {
                                    getPackageById(value.id);
                                  }}
                                />
                                {value.name}
                              </div>

                              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                                <span className="text-center ml-auto text-base font-medium font-sans text-black">
                                  {value.price} VND
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </>

                      {/* <div className="mb-4 bg-[#f4eeee] relative rounded-xl p-2">
                        <div className="flex-grow pl-10 text-base font-medium font-sans text-left text-black">
                          <FormControlLabel
                            value="6Months"
                            control={<Radio />}
                            label=""
                          />
                          6 Months
                        </div>

                        <div className="absolute right-5 top-1/2 -translate-y-1/2">
                          <span className="text-center ml-auto text-base font-medium font-sans text-black">
                            396.000 VND
                          </span>
                        </div>
                      </div>

                      <div className="mb-4 bg-[#f4eeee] relative rounded-xl p-2">
                        <div className="flex-grow pl-10 text-base font-medium font-sans text-left text-black">
                          <FormControlLabel
                            value="12Months"
                            control={<Radio />}
                            label=""
                          />
                          12 Months
                          <span
                            className="bg-yellow-400 text-black text-[12px] w-max leading-[11px] rounded-[6px] 
                              py-[5px] px-[7px] ml-4 inline-block align-middle text-center"
                          >
                            1 month free
                          </span>
                        </div>

                        <div className="absolute right-5 top-1/2 -translate-y-1/2">
                          <span className="text-center ml-auto text-base font-medium font-sans text-black">
                            792.000 VND
                          </span>
                        </div>
                      </div> */}
                    </RadioGroup>
                  </FormControl>
                </div>

                {/* Forms of payment */}
                <div className="bg-[#fcfbfb] rounded-xl shadow-[0px_4px_4px_rgb(0_0_0_/_25%)] py-5 px-7 mb-6">
                  <h4 className="text-lg font-extrabold mb-2 font-sans text-black text-left">
                    Choose a form of payment
                  </h4>

                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="visa"
                      name="radio-buttons-group"
                    >
                      {/* Visa */}
                      <div className="bg-[#f4eeee] relative block rounded-xl mb-4">
                        <div className="w-[50px] h-[50px] rounded-[10px] overflow-hidden absolute left-[11px] top-[11px]">
                          <img
                            src="/visa.png"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-h-[70px] flex items-center">
                          <div className="py-[11px] pr-[62px] pl-[72px] w-full">
                            <h5 className="text-black text-sm font-medium mb-0 font-sans text-left">
                              Credit Card
                            </h5>

                            <p className="text-xs text-black font-normal font-sans text-left mt-[6px] tracking-wider m-0">
                              Discount 100.000 VND when buying MAX/VIP package
                              for 6 months and a 40.000 VND discount when buying
                              a package with a Vietcombank International card.
                              Apply to the first 300 accounts.
                            </p>
                          </div>
                        </div>

                        <div className="absolute right-0 top-[40%] -translate-y-[35%]">
                          <FormControlLabel
                            value="visa"
                            control={<Radio />}
                            label=""
                          />
                        </div>
                      </div>

                      {/* ZaloPay */}
                      <div className="bg-[#f4eeee] relative block rounded-xl mb-4">
                        <div className="w-[50px] h-[50px] rounded-[10px] overflow-hidden absolute left-[11px] top-[11px]">
                          <img
                            src="/zalopay.png"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-h-[70px] flex items-center">
                          <div className="py-[11px] pr-[62px] pl-[72px] w-full">
                            <h5 className="text-black text-sm font-medium mb-0 font-sans text-left">
                              ZaloPay Wallet
                            </h5>

                            <p className="text-xs text-black font-normal font-sans text-left mt-[6px] tracking-wider m-0">
                              50.000 VND refund (single from 66.000 VND) for
                              ZaloPay account for the first time linking payment
                              to buy service packages on Codeflix.
                            </p>
                          </div>
                        </div>

                        <div className="absolute right-0 top-[40%] -translate-y-[35%]">
                          <FormControlLabel
                            value="zaloPay"
                            control={<Radio />}
                            label=""
                          />
                        </div>
                      </div>

                      {/* ShopeePay */}
                      <div className="bg-[#f4eeee] relative block rounded-xl mb-4">
                        <div className="w-[50px] h-[50px] rounded-[10px] overflow-hidden absolute left-[11px] top-[11px]">
                          <img
                            src="/shopeepay.png"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-h-[70px] flex items-center">
                          <div className="py-[11px] pr-[62px] pl-[72px] w-full">
                            <h5 className="text-black text-sm font-medium mb-0 font-sans text-left">
                              ShopeePay Wallet
                            </h5>
                          </div>
                        </div>

                        <div className="absolute right-0 top-[40%] -translate-y-[35%]">
                          <FormControlLabel
                            value="shopeePay"
                            control={<Radio />}
                            label=""
                          />
                        </div>
                      </div>

                      {/* Momo */}
                      <div className="bg-[#f4eeee] relative block rounded-xl mb-4">
                        <div className="w-[50px] h-[50px] rounded-[10px] overflow-hidden absolute left-[11px] top-[11px]">
                          <img
                            src="/momo.png"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-h-[70px] flex items-center">
                          <div className="py-[11px] pr-[62px] pl-[72px] w-full">
                            <h5 className="text-black text-sm font-medium mb-0 font-sans text-left">
                              Momo Wallet
                            </h5>
                          </div>
                        </div>

                        <div className="absolute right-0 top-[40%] -translate-y-[35%]">
                          <FormControlLabel
                            value="momo"
                            control={<Radio />}
                            label=""
                          />
                        </div>
                      </div>

                      {/* Moca */}
                      <div className="bg-[#f4eeee] relative block rounded-xl mb-4">
                        <div className="w-[50px] h-[50px] rounded-[10px] overflow-hidden absolute left-[11px] top-[11px]">
                          <img
                            src="/moca.png"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-h-[70px] flex items-center">
                          <div className="py-[11px] pr-[62px] pl-[72px] w-full">
                            <h5 className="text-black text-sm font-medium mb-0 font-sans text-left">
                              Moca Wallet
                            </h5>
                          </div>
                        </div>

                        <div className="absolute right-0 top-[40%] -translate-y-[35%]">
                          <FormControlLabel
                            value="moca"
                            control={<Radio />}
                            label=""
                          />
                        </div>
                      </div>

                      {/* Viettel Pay */}
                      <div className="bg-[#f4eeee] relative block rounded-xl">
                        <div className="w-[50px] h-[50px] rounded-[10px] overflow-hidden absolute left-[11px] top-[11px]">
                          <img
                            src="/viettelpay.png"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="min-h-[70px] flex items-center">
                          <div className="py-[11px] pr-[62px] pl-[72px] w-full">
                            <h5 className="text-black text-sm font-medium mb-0 font-sans text-left">
                              Viettel Pay
                            </h5>
                          </div>
                        </div>

                        <div className="absolute right-0 top-[40%] -translate-y-[35%]">
                          <FormControlLabel
                            value="viettelPay"
                            control={<Radio />}
                            label=""
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>

              <div className="flex-[0_0_100%] max-w-full relative w-full px-[15px] lg:flex-[0_0_41.66666667%] lg:max-w-[41.66666667%]">
                {/* Billing information */}
                <div className="bg-[#fcfbfb] rounded-xl shadow-[0px_4px_4px_rgb(0_0_0_/_25%)] py-5 px-7 mb-6">
                  <h4 className="text-lg font-extrabold mb-2 font-sans text-black text-left">
                    Billing information
                  </h4>

                  {/* <div className="flex items-center w-full">
                      <div className="whitespace-nowrap flex-grow mr-4 text-sm font-medium font-sans text-left text-black">
                        Select package:
                      </div>

                      <div className="PaySelect__Input w-full relative">
                        <select
                          name=""
                          id=""
                          className="w-full py-[10px] pr-[42px] pl-[25px] bg-[#f4eeee] text-sm border-2 border-solid border-transparent 
                          rounded-[15px] inline-block appearance-none cursor-pointer outline-none text-[#555] font-medium"
                        >
                          <option value="0">Package MAX</option>
                          <option value="1">Package VIP</option>
                          <option value="2">Package SUPER VIP</option>
                        </select>
                      </div>
                    </div> */}

                  <div>
                    <table className="w-full mt-4">
                      <tbody>
                        <tr>
                          {/* Account */}
                          <td className="pb-4 text-sm text-[#555] font-medium font-sans text-left">
                            Account:
                          </td>
                          <td className="text-right text-black pb-4 font-medium font-sans text-sm">
                            {user?.email}
                          </td>
                        </tr>
                        {/* Service */}
                        <tr>
                          <td className="pb-4 text-sm text-[#555] font-medium font-sans text-left">
                            Service:
                          </td>
                          <td className="text-right text-black pb-4 font-medium font-sans text-sm">
                            Codeflix service pack
                          </td>
                        </tr>
                        {/* Purchase service package */}
                        <tr>
                          <td className="pb-4 text-sm text-[#555] font-medium font-sans text-left">
                            Purchase service package:
                          </td>
                          <td className="text-right text-black pb-4 font-medium font-sans text-sm">
                            {goi?.name}
                          </td>
                        </tr>
                        {/* Package price */}
                        <tr>
                          <td className="pb-4 text-sm text-[#555] font-medium font-sans text-left">
                            Package price:
                          </td>
                          <td className="text-right text-black pb-4 font-medium font-sans text-sm">
                            {goi?.price} VND
                          </td>
                        </tr>
                        {/* Service pack type */}
                        <tr>
                          <td className="pb-4 text-sm text-[#555] font-medium font-sans text-left">
                            Service pack type:
                          </td>
                          <td className="text-right text-black pb-4 font-medium font-sans text-sm">
                            {goi?.time}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-[#585858] w-full my-4 h-[1px]"></div>

                  <div>
                    <table className="w-full mt-4">
                      <tbody>
                        <tr>
                          <td className="text-sm text-[#555] font-medium font-sans text-left">
                            Amount to be paid:
                          </td>
                          <td className="text-right text-black font-medium font-sans text-sm">
                            <span className="text-[#ff6500]">
                              {goi?.price} VND
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Promo code */}
                <div className="bg-[#fcfbfb] rounded-xl shadow-[0px_4px_4px_rgb(0_0_0_/_25%)] py-5 px-7 mb-6">
                  <h4 className="text-lg font-extrabold mb-2 font-sans text-black text-left">
                    Enter promo code
                  </h4>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full border-2 border-solid border-t-sky-100 outline-none bg-[#fff] rounded-[15px]
                        p-[10px] pr-[130px] text-[15px] leading-[22px] text-[#555] transition font-sans font-normal focus:border-[#ff6500]"
                    />

                    <button
                      typeof="submit"
                      className="py-2 px-[30px] border-none font-semibold bg-[#393939] rounded-[15px] absolute right-[3px] 
                        text-base top-1/2 -translate-y-1/2 transition text-[#fff] inline-block text-center align-middle select-none
                        hover:bg-[#ff6500]"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="my-8">
                    <p className="text-sm tracking-normal font-sans text-black">
                      By accepting payment, you agree to Codeflix's Terms of
                      Service, and the right to allow Codeflix to automatically
                      renew at the end of the term.
                    </p>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      typeof="button"
                      className="text-[#fff] text-base font-sans font-semibold rounded-3xl px-12 py-2 border-[#ff6500] bg-[#ff6500]
                        transition-none inline-block text-center align-middle select-none border-1 border-solid hover:opacity-80"
                    >
                      Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default upgrade;
