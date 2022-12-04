import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GrGoogleWallet } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import { IoCloseOutline, IoDiamond } from "react-icons/io5";
import { MdOutlineLogout, MdPayment } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { baseUrl } from "../../constants/api";

export default function Topbar() {
  const router = useRouter();
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/start");
  };

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

  return (
    <>
      {/* header */}
      <div className="fixed z-[222] w-full h-[64px] bg-[rgba(255,255,255,0.96)] border-b-2 border-solid shadow-md p-2">
        <div className="flex h-full px-5 items-center justify-between flex-row-reverse md:flex-row">
          <div
            className="p-2 rounded-full text-black cursor-pointer hover:bg-gray-200 active:bg-gray-400 md:hidden"
            onClick={() => setIsOpenDrawer(!isOpenDrawer)}
          >
            <FiMenu className="text-3xl" />
          </div>

          <Link href="/account/home">
            <div
              title="Codeflix Account"
              className="flex text-center items-center cursor-pointer"
            >
              <img
                src="/logo_codeflix.png"
                alt="Codeflix account setup"
                width={150}
                height={150}
              />
              <p className="font-semibold text-2xl text-gray-600">Account</p>
            </div>
          </Link>

          <div
            title="Sign out"
            className="hidden md:flex items-center cursor-pointer hover:opacity-80"
            onClick={() => handleLogout()}
          >
            <div className="text-[#555] text-2xl right-0">
              <MdOutlineLogout />
            </div>
            <button className="w-full p-2 font-semibold text-[#555] text-lg">
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* nav drawer */}
      <div
        className={`${
          isOpenDrawer ? "hidden" : "block"
        } flex flex-row w-full h-full fixed z-[666] top-0`}
      >
        <div
          className={`${
            isOpenDrawer ? "w-0 p-0" : "w-80 p-4"
          } fixed md:hidden z-[999] h-screen overflow-y-auto bg-[#141414] dark:bg-gray-50 top-0 border-r
        border-gray-200`}
          tabIndex={-1}
        >
          <h5 className="text-base font-bold text-gray-500 uppercase dark:text-black">
            Menu
          </h5>

          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
            rounded text-2xl p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white"
            onClick={() => setIsOpenDrawer(!isOpenDrawer)}
          >
            <IoCloseOutline />
          </button>

          <div className="py-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <div
                  title="Home"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-100
                dark:hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    router.push("/account/home");
                  }}
                >
                  <FaUserCircle
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-600 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Home</span>
                </div>
              </li>

              <li>
                <div
                  title="Personal information"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-100
                dark:hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    router.push("/account/profile");
                  }}
                >
                  <ImProfile
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-600 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Personal information</span>
                </div>
              </li>

              <li>
                <a
                  title="Change password"
                  href="/account/change-password"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-100
                dark:hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    router.push("/account/change-password");
                  }}
                >
                  <Si1Password
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-600 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Change password</span>
                </a>
              </li>

              <li>
                <div
                  title="Payment and subscription package"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-100
                dark:hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    router.push("/account/wallet");
                  }}
                >
                  <GrGoogleWallet
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-600 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Codeflix wallet</span>
                </div>
              </li>

              <li>
                <div
                  title="Payment and subscription package"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-100
                dark:hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    router.push("/account/payment/payment-package");
                  }}
                >
                  <MdPayment
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-600 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Payment and subscription package</span>
                </div>
              </li>

              <li>
                <div
                  title="Buy package"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-100
                dark:hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    router.push("/account/upgrade");
                  }}
                >
                  <IoDiamond
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-600 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Buy package</span>
                </div>
              </li>

              <div className="border-t border-solid border-[rgb(218,220,224)] box-border h-2 mt-2"></div>

              <li>
                <div
                  title="Help"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-100
                dark:hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    router.push("/account/help");
                  }}
                >
                  <BiHelpCircle
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-600 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Help</span>
                </div>
              </li>

              <div className="border-t border-solid border-[rgb(218,220,224)] box-border h-2 mt-2"></div>

              <li>
                <div
                  title="Help"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-100
                dark:hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    router.push("/home");
                  }}
                >
                  <AiFillHome
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-600 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Back</span>
                </div>
              </li>

              <li>
                <div
                  title="Sign out"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-100
                dark:hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleLogout()}
                >
                  <MdOutlineLogout
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-600 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Sign out</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`${
            isOpenDrawer ? "hidden" : "block"
          } md:hidden w-full h-full z-[777] bg-[rgba(0,0,0,0.4)]`}
          onClick={() => setIsOpenDrawer(!isOpenDrawer)}
        ></div>
      </div>
    </>
  );
}
