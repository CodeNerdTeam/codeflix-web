import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/api";
import { UserEntity } from "../../../models/UserEntity";

function ChangePassword() {
  const router = useRouter();
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handlePasswordOldChange = (value: any) => {
    setPasswordOld(value);
  };
  const handlePasswordNewChange = (value: any) => {
    setPasswordNew(value);
  };
  const handleConfirmPasswordChange = (value: any) => {
    setConfirmPassword(value);
  };

  const changePassword = () => {
    if (
      passwordOld.length !== 0 ||
      passwordNew.length !== 0 ||
      confirmPassword.length !== 0
    ) {
      const jwtString = sessionStorage.getItem("token");

      const data = {
        PasswordOld: passwordOld,
        PasswordNew: passwordNew,
        ConfirmPassword: confirmPassword,
      };

      axios
        .put(`${baseUrl}/api/users/pc`, data, {
          headers: { Authorization: `Bearer ${jwtString}` },
        })
        .then((res) => {
          if (res.data.statusCode == 401) {
            return alert("Change password failed!");
          }
          alert("Change password successfully!");
          router.push("/account/home");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  return (
    <div className="my-16 mx-3 p-2 box-border lg:max-w-[1120px] lg:p-12 sm:flex sm:flex-col sm:min-h-screen sm:relative">
      <div className="lg:max-w-[840px]">
        <div
          className="bg-white relative z-[2] flex flex-col max-w-full min-h-screen box-inherit sm:block sm:rounded-lg sm:border sm:border-solid sm:border-[#dadce0] sm:flex-shrink-0 
          sm:my-0 sm:mx-auto sm:transition-[.2s] sm:w-[450px] sm:min-h-0"
        >
          <div
            className="fixed box-inherit h-1 left-0 overflow-hidden top-0 w-full z-[5] sm:absolute"
            aria-hidden="true"
          >
            <div
              className="h-2 opacity-0 box-inherit overflow-hidden relative transition-linear w-full sm:rounded-t-lg sm:rounded-b-none"
              role="progressbar"
            >
              <div
                className="h-full absolute w-full bg-[length:20p_8px] box-inherit bg-repeat-x 
            bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20version%…271%27%20fill%3D%27%23e6e6e6%27%2F%3E%3C%2Fsvg%3E')] invisible"
              ></div>

              <div className="absolute bg-[#e0e0e0] box-inherit h-full w-full transition-ease"></div>
            </div>
          </div>

          <div
            className="box-inherit flex-grow overflow-hidden pt-6 px-6 pb-9 sm:h-auto sm:min-h-[500px] sm:overflow-y-auto 
        sm:transition-[.2s] sm:pt-12 sm:px-10 sm:pb-9"
            role="presentation"
          >
            <div className="box-inherit">
              <div className="box-inherit flex h-10 justify-center">
                <div className="box-inherit">
                  <div
                    className="box-inherit h-10 m-0 overflow-hidden relative w-[75px]"
                    title="Codeflix"
                  >
                    <div className="box-inherit">
                      <img
                        src="/logo_codeflix.png"
                        alt=""
                        aria-hidden="true"
                        className="block box-inherit w-[75px] h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="box-inherit">
                <div className="box-inherit overflow-hidden px-6 my-auto -mx-6 sm:px-10 sm:my-auto sm:-mx-10">
                  <div className="box-inherit">
                    <div className="box-inherit text-center">
                      <h1 className="box-inherit text-[#202124] pb-0 pt-4 font-sans font-normal text-2xl mb-0 mt-0 ">
                        <span className="box-inherit">{data?.name}</span>
                      </h1>

                      <div className="hidden box-inherit text-[#202124] text-base font-normal pb-0 pt-2 mb-0 mt-0"></div>

                      <div className="box-inherit h-8 mt-2">
                        <div
                          className="px-3 box-inherit rounded-full py-1 items-center bg-white 
                        border border-solid border-[#dadce0] text-[#3c4043] inline-flex font-sans text-[15px] 
                        font-medium tracking-wide max-w-full relative"
                        >
                          <div className="box-inherit rounded-[10px] h-[20px] mr-2">
                            <div className="box-inherit rounded-[50%] text-[#5f6368] overflow-hidden">
                              <img
                                src={
                                  data?.avatar == ""
                                    ? "/icon.png"
                                    : data?.avatar
                                }
                                className="rounded-[50%] block text-[#3c4043] h-[20px] w-[20px] box-inherit"
                              />
                            </div>
                          </div>

                          <div className="leading-[30px] box-inherit text-left overflow-hidden text-ellipsis whitespace-nowrap direction">
                            {data?.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="box-inherit text-[.1px] whitespace-nowrap my-auto -mx-6 sm:my-auto sm:-mx-10"
                    role="presentation"
                  >
                    <div
                      className="box-inherit inline-block text-[15px] pt-6 px-0 pb-0 align-top whitespace-normal w-full border-0 border-solid
                    border-transparent border-y-0 border-x-[24px] sm:border-l-[40px] sm:border-r-[40px]"
                    >
                      <div className="box-inherit">
                        <section
                          className="hidden bg-[#fef7e0] box-inherit rounded-lg p-4 my-4 mx-0 last:mb-0 first:mt-0 outline-none"
                          data-callout-type="2"
                          aria-live="assertive"
                          aria-atomic="true"
                        >
                          <div className="box-inherit">
                            <div className="first:mt-0 first:pt-0 last:mb-0 last:pb-0 box-inherit">
                              <h2
                                className="text-[#202124] box-inherit items-center flex font-sans
                                     text-base font-medium tracking-wide my-0 p-0"
                              >
                                <span
                                  className="text-[#ea8600] mt-0 box-inherit flex-shrink-0 h-[20px] mr-4 w-[20px]"
                                  aria-hidden="true"
                                >
                                  <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 24 24"
                                    xmlns="https://www.w3.org/2000/svg"
                                    className="h-full w-full box-inherit"
                                  >
                                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path>
                                  </svg>
                                </span>

                                <span className="box-inherit">
                                  Too many failed attempts
                                </span>
                              </h2>

                              <div
                                className="hidden box-inherit text-[#5f6368] text-base mt-2"
                                aria-hidden="true"
                              ></div>
                            </div>
                          </div>

                          <div
                            className="text-[#202124] box-inherit my-auto px-6 mb-4 mt-[10px] 
                            sm:my-auto sm:-mx-10 sm:px-10 sm:mt-[10px] sm:mb-4"
                          >
                            <div></div>
                          </div>
                        </section>

                        <div className="box-inherit">
                          <form action="" method="post">
                            <section className="first:mt-0 last:mb-0 box-inherit my-4 mx-0 outline-none">
                              <div
                                className="hidden box-inherit"
                                aria-hidden="true"
                              ></div>
                              <div className="mt-0 box-inherit sm:my-auto y-auto px-6 mb-4 sm:-mx-10 sm:px-10 sm:mt-[10px] sm:mb-4">
                                <div>
                                  <div className="box-inherit pb-[3px] text-[#555] font-normal">
                                    To change your password, please fill in the
                                    information
                                  </div>

                                  <div className="box-inherit">
                                    <div className="flex w-full">
                                      <div className="flex-grow min-w-0">
                                        <div className="box-content pb-0 pt-6 w-full inline-block">
                                          <div className="h-14 pt-0 box-inherit relative align-top">
                                            <div className="items-center static box-inherit flex top-[14px]">
                                              <div className="box-inherit flex flex-grow flex-shrink min-w-0 relative">
                                                <input
                                                  type="password"
                                                  spellCheck="false"
                                                  tabIndex={0}
                                                  name="password"
                                                  autoCapitalize="off"
                                                  data-initial-dir="ltr"
                                                  aria-label="Enter your password"
                                                  className=" text-left text-[#202124] rounded-[4px] text-[17px] 
                                                        h-7 m-[2px] py-3 px-[14px] z-[1] box-inherit flex-grow flex-shrink bg-transparent 
                                                        border border-solid block leading-6 min-w-0 outline-none"
                                                  placeholder="Enter your password"
                                                  required
                                                  onChange={(e) =>
                                                    handlePasswordOldChange(
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="box-inherit">
                                    <div className="box-inherit flex w-full">
                                      <div className="box-inherit flex-grow min-w-0">
                                        <div className="box-content pb-0 pt-6 w-full inline-block">
                                          <div className="h-14 pt-0 box-inherit relative align-top">
                                            <div className="items-center static box-inherit flex top-[14px]">
                                              <div className="box-inherit flex flex-grow flex-shrink min-w-0 relative">
                                                <input
                                                  type="password"
                                                  spellCheck="false"
                                                  tabIndex={0}
                                                  name="password"
                                                  autoCapitalize="off"
                                                  data-initial-dir="ltr"
                                                  aria-label="Enter your password"
                                                  className=" text-left text-[#202124] rounded-[4px] text-[17px] 
                                                        h-7 m-[2px] py-3 px-[14px] z-[1] box-inherit flex-grow flex-shrink bg-transparent 
                                                        border border-solid block leading-6 min-w-0 outline-none"
                                                  placeholder="Enter your new password"
                                                  required
                                                  onChange={(e) =>
                                                    handlePasswordNewChange(
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="box-inherit">
                                    <div className="box-inherit flex w-full">
                                      <div className="box-inherit flex-grow min-w-0">
                                        <div className="box-content pb-0 pt-6 w-full inline-block">
                                          <div className="h-14 pt-0 box-inherit relative align-top">
                                            <div className="items-center static box-inherit flex top-[14px]">
                                              <div className="box-inherit flex flex-grow flex-shrink min-w-0 relative">
                                                <input
                                                  type="password"
                                                  spellCheck="false"
                                                  tabIndex={0}
                                                  name="password"
                                                  autoCapitalize="off"
                                                  data-initial-dir="ltr"
                                                  aria-label="Enter your password"
                                                  className=" text-left text-[#202124] rounded-[4px] text-[17px] 
                                                        h-7 m-[2px] py-3 px-[14px] z-[1] box-inherit flex-grow flex-shrink bg-transparent 
                                                        border border-solid block leading-6 min-w-0 outline-none"
                                                  placeholder="Confirm your new password"
                                                  required
                                                  onChange={(e) =>
                                                    handleConfirmPasswordChange(
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </form>
                        </div>
                      </div>

                      <div className="flex items-start flex-grow-0 flex-wrap justify-between -ml-2 mt-[26px] min-h-[48px] pb-[20px]">
                        <div className="flex flex-wrap flex-row-reverse w-full">
                          <div className="text-right flex-grow">
                            {/* Button Change Password */}
                            <div className="inline-block">
                              <div
                                className="inline"
                                data-is-touch-wrapper="true"
                              >
                                <button
                                  typeof="button"
                                  className="text-white bg-[#1a73e8] py-0 px-6 font-sans text-sm font-semibold tracking-wide normal-case 
                                shadow-none transition h-9 rounded no-underline my-[6px] relative items-center justify-center min-w-[64px] 
                                border-none outline-none overflow-visible align-middle hover:bg-opacity-80"
                                  onClick={() => {
                                    changePassword();
                                  }}
                                >
                                  <span>Submit</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* Button Forgot Password */}
                          <div className="flex-grow">
                            <div className="inline-block">
                              <div
                                className="inline"
                                data-is-touch-wrapper="true"
                              >
                                <button
                                  typeof="button"
                                  className="font-sans tracking-wide font-medium h-9 rounded will-change no-underline py-0 px-2 my-[6px] 
                                  relative items-center justify-center border-none outline-none overflow-visible align-middle normal-case
                                  hover:bg-[#f2f6fa]"
                                  onClick={() =>
                                    router.push("/account/password-recovery")
                                  }
                                >
                                  <span className="text-[#1a73e8]">
                                    Forgot your password?
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
