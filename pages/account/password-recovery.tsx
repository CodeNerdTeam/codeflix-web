import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { baseUrl } from "../../constants/api";
import { UserEntity } from "../../models/UserEntity";

function password_recovery() {
  const router = useRouter();
  const [data, setData] = useState<UserEntity>();

  const getUser = async () => {
    const jwtString = sessionStorage.getItem("token");
    axios
      .get<UserEntity>(`${baseUrl}/api/users/profile`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setData(res.data);
        // localStorage.setItem("id", res.data.id);
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
    <>
      <Head>
        <title>Codeflix - Recover account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="box-inherit sm:flex sm:flex-col sm:min-h-[100vh] sm:relative sm:justify-center sm:items-center bg-white">
        <div
          className="min-h-[100vh] sm:min-h-0 sm:w-[450px] sm:rounded-lg sm:border sm:border-solid sm:border-[#dadce0] sm:flex-shrink-0
        sm:my-0 sm:mx-auto sm:block sm:duration-200 sm:transition bg-[#fff] flex max-w-full relative z-[2]"
        >
          <div
            className="sm:h-auto sm:min-h-[500px] sm:overflow-y-auto sm:duration-200 sm:transition pt-12 px-12 pb-9 flex-grow
        overflow-hidden"
          >
            <div className="box-inherit">
              <div className="flex h-6 justify-center">
                <div className="h-6 m-0 overflow-visible relative w-[75px]">
                  <img src="/logo_codeflix.png" alt="" />
                </div>
              </div>

              <div className="overflow-hidden px-10 my-auto -mx-10">
                <div className="text-center">
                  <h1 className="text-[#202124] pb-0 pt-4 font-sans text-2xl leading-[1.3333] font-medium my-0">
                    <span>Recover account</span>
                  </h1>

                  <div className="h-8 mt-2">
                    <div
                      className="pl-[5px] pr-[7px] rounded-2xl inline-flex items-center bg-[#fff] border border-solid
                    border-[#dadce0] cursor-pointer font-sans text-[15px] font-medium max-w-full relative tracking-wide"
                    >
                      <div className="rounded-[10px] h-5 mr-2">
                        <div className="rounded-[50%] text-[#5f6368] overflow-hidden">
                          <img
                            src={
                              data?.avatar == "" ? "/icon.png" : data?.avatar
                            }
                            className="text-[#3c4043] h-5 w-5 rounded-[50%] block"
                          />
                        </div>
                      </div>

                      <div className="leading-[30px] direction text-left overflow-hidden text-ellipsis whitespace-nowrap text-[#3c4043]">
                        {data?.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-auto -mx-10 whitespace-nowrap">
                  <div
                    className="text-[15px] pt-6 align-top whitespace-normal w-full border-x-[40px] border-solid flex-col
                border-transparent text-[#202124] font-medium tracking-wide h-full flex justify-center gap-1"
                  >
                    <span>
                      Are you sure that you really want to recover your
                      password?
                    </span>
                    <span>Be careful with your choice!</span>
                    <img
                      src="/gifs/Watch_out.gif"
                      alt=""
                      className="my-5 rounded-xl"
                    />
                    <div className="flex justify-end w-full gap-2 items-center">
                      <button
                        typeof="button"
                        className="h-12 max-w-full min-w-max p-4 bg-blue-300 flex items-center justify-center rounded-lg hover:bg-blue-200"
                        onClick={() => router.push("/account/home")}
                      >
                        <span className="text-white">Cancel</span>
                      </button>

                      <button
                        typeof="button"
                        className="h-12 max-w-full min-w-max p-4 bg-blue-500 flex items-center justify-center rounded-lg hover:bg-blue-400"
                      >
                        <span className="text-white">Continue</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* <div className="my-auto -mx-10 whitespace-nowrap">
                  <div
                    className="text-[15px] pt-6 align-top whitespace-normal w-full border-x-[40px] border-solid flex-col
                  border-transparent text-[#202124] font-medium tracking-wide h-full flex justify-center gap-1"
                  >
                    <span>Your new password has been sent to your email.</span>
                    <span>Please, check your mailbox.</span>
                    <img src="/gifs/InboxIconAnimation.gif" alt="" />
                    <button
                      typeof="button"
                      className="h-12 p-4 bg-blue-500 flex items-center justify-center rounded-lg hover:bg-blue-400"
                    >
                      <span className="text-white">Finish</span>
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default password_recovery;
