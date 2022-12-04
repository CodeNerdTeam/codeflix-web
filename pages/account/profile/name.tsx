import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Topbar from "../../../components/user/Topbar";
import { baseUrl } from "../../../constants/api";
import { UserEntity } from "../../../models/UserEntity";

function name() {
  const router = useRouter();
  const [user, setUser] = useState<UserEntity>();
  const [name, setName] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/profile/name");
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

  return (
    <div className="bg-white w-screen min-h-screen">
      <Head>
        <title>Codeflix - Name</title>
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
                        router.push("/account/profile");
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
              Name
            </h1>
          </div>

          <div className="-bottom-[10px] h-[10px] overflow-hidden absolute w-full lg:border-t-[1px] lg:border-solid lg:border-t-[#dadce0]">
            <div className="h-[10px] absolute -top-[10px] transition-shadow w-full"></div>
          </div>
        </div>
        <div className="h-14"></div>
      </div>

      <main>
        <div className="contain-style">
          <div className="m-auto max-w-[660px]">
            <div className="p-4 text-[rgba(0,0,0,.65)] md:py-6 md:px-0">
              <div
                className="rounded-md sm:border sm:border-solid sm:border-[#dadce0] bg-[#fff] shadow-none flex flex-col
              box-border relative"
              >
                <div className="sm:mt-6 py-0 px-6">
                  <div className="font-sans text-sm tracking-wide hyphens-auto mb-6 text-[rgb(95,99,104)]">
                    Changes to your name will be reflected on your Codeflix
                    Account.{" "}
                    <a href="" className="text-[rgb(26,115,232)]">
                      Looking for more information
                    </a>
                  </div>

                  <div className="text-[#3c4043] text-base flex flex-col">
                    <span className="mb-3">Name</span>
                    <input
                      type="text"
                      className="p-3 focus:outline-blue-500 border border-solid rounded border-gray-500 placeholder-gray-600"
                      value={name}
                      placeholder="Enter your name"
                      onChange={(e: any) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mt-6 w-full max-w-[400px]">
                    <div className="font-sans text-base font-medium tracking-wide w-full text-[rgb(32,33,36)] hyphens-auto">
                      People who can see your name
                    </div>

                    <div className="mt-2 flex font-sans text-sm tracking-wide hyphens-auto text-[rgb(95,99,104)] font-normal">
                      <span className="flex-shrink-0 h-5 mr-4 w-5">
                        <FaUserFriends className="text-xl" />
                      </span>

                      <div>
                        People can see this information when they contact you or
                        view content you create in Codeflix services.{" "}
                        <a href="" className="relative text-[rgb(26,115,232)]">
                          Looking for more information
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end my-6 px-0">
                    <div className="inline-flex">
                      <div className="inline-block">
                        <div className="inline">
                          <button
                            className="text-blue-400 py-2 px-3 hover:bg-sky-50 rounded"
                            onClick={() => {
                              router.push("/account/profile");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex ml-2">
                      <div className="inline-block">
                        <div className="inline">
                          <button className="text-white py-2 px-6 rounded bg-blue-500 hover:bg-blue-600">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <span
                  className="opacity-0 w-full h-full top-0 left-0 bg-[#e8eaed] absolute rounded-[inherit] pointer-events-none
                    transition-[opacity_280ms_cubic-bezier(0.4,0,0.2,1)] after:absolute after:box-border after:w-full after:h-full
                    after:top-0 after:left-0 after:rounded-[inherit] after:content-[''] after:pointer-events-none"
                ></span>
              </div>
            </div>

            <div className="h-16"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default name;
