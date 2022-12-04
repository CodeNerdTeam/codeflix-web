import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { baseUrl } from "../../../constants/api";
import { UserEntity } from "../../../models/UserEntity";

function Profile() {
  const [data, setData] = useState<UserEntity>();

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="text-[#555] h-max mx-3 mt-16 max-w-[840px] p-2 lg:p-12 lg:max-w-[1120px] md:p-6 sm:p-4">
      <div className="lg:max-w-[840px]">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="pt-6" tabIndex={-1}>
              <h1 className="hidden p-0 text-center text-[rgb(32,33,36)] font-normal tracking-normal text-3xl lg:block mb-2">
                Personal information
              </h1>
              <div className="font-normal tracking-wide text-sm mx-auto text-center">
                Information about you and your preferences on Codeflix services
              </div>
            </div>

            <div className="contain-style">
              <section className="md:flex md:flex-wrap md:-ml-3 md:pt-0 md:w-[calc(100%+24px)] sm:pt-2 pb-5 pt-4">
                {/* Information  */}
                <div className="md:w-full relative flex flex-col w-full">
                  <div className="md:mx-12px md:mb-0 md:px-0 sm:mt-8 sm:mb-2 relative pt-8 pb-0 px-2 flex items-center flex-grow flex-shrink justify-between">
                    <div className="flex-grow flex-shrink">
                      <div className="flex items-center justify-between">
                        <h2
                          className="relative text-2xl tracking-normal font-normal text-[rgb(32,33,36)] my-0
                         md:text-3xl md:tracking-normal md:font-normal md:text-[rgb(32,33,36)] "
                        >
                          Information in your profile on Codeflix services
                        </h2>

                        <figure
                          className="flex items-center justify-center m-0 overflow-hidden p-0 w-16 h-16 flex-grow-0 flex-shrink-0 ml-4 md:hidden"
                          aria-hidden="false"
                        >
                          <img
                            src="/profile_spot.png"
                            alt=""
                            aria-hidden="true"
                            data-iml="8861704.5"
                            data-atf="false"
                            className="h-full w-auto"
                          />
                        </figure>
                      </div>

                      <p className="font-sans text-sm tracking-wide mt-3">
                        Personal information and options to help manage it. You
                        may allow others to see some of this information (such
                        as contact information) so that they can easily contact
                        you. You can also view summary information about your
                        profiles.
                      </p>
                    </div>

                    <figure
                      className="md:block hidden w-[360px] h-32 flex-grow-0 flex-shrink-0 ml-4 items-center justify-center m-0 overflow-hidden p-0"
                      aria-hidden="true"
                    >
                      <img
                        src="/profile_scene.png"
                        alt=""
                        aria-hidden="true"
                        data-alf="false"
                        data-iml="1355.5999999046326"
                        className="h-full w-auto"
                      />
                    </figure>
                  </div>
                </div>

                {/* Basic information */}
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
                                Basic information
                              </h2>

                              <div className="font-sans text-sm text-[#555] font-normal tracking-wide flex-grow flex-shrink m-0 pt-2 px-0 pb-0">
                                <div>
                                  Some information may be visible to others
                                  using Codeflix services.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="min-h-[1px] hover:bg-gray-50">
                        <button
                          typeof="button"
                          className="will-change relative outline-none overflow-hidden bg-none border-none text-[inherit] m-0 text-left
                           box-border block w-full"
                        >
                          <div className="h-full bg-none non-text-decoration text-left w-full box-border text-[rgb(26,115,232)] pt-[15px] pb-4 px-4 md:px-6">
                            <div className="flex items-center">
                              <div className="flex-1">
                                <div className="-mt-1 sm:flex sm:items-stretch ms:flex-wrap">
                                  <div className="flex items-center basis-[156px] mr-6 pt-1">
                                    <div className="flex items-center pt-1">
                                      <h3 className="font-sans text-xs font-normal tracking-wider normal-case text-[rgb(95,99,104)] m-0 p-0 w-full">
                                        Picture
                                      </h3>
                                    </div>
                                  </div>

                                  <div className="flex-grow flex-shrink mr-6 basis-[292px]">
                                    <div className="flex items-center pt-1">
                                      <div className="font-sans font-normal text-sm tracking-wide text-[rgb(95,99,104)] w-full">
                                        A photo to personalize your account
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex-grow-0 flex-shrink rounded-[50%] ml-4 overflow-hidden relative">
                                <figure
                                  className="flex items-center justify-center m-0 overflow-hidden p-0 w-[60px] h-[60px] rounded-[50%]"
                                  aria-hidden="true"
                                >
                                  <img
                                    src={
                                      data?.avatar == ""
                                        ? "/icon.png"
                                        : data?.avatar
                                    }
                                    className="h-full w-auto"
                                  />
                                </figure>
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>

                      <div className="min-h-[1px] hover:bg-gray-50">
                        <div className="pl-4 md:pl-6" role="presentation">
                          <div className="border-t-[1px] border-solid border-[rgb(218,220,224)]"></div>
                        </div>

                        <div className="relative outline-none overflow-hidden will-change">
                          <a
                            href="/account/profile/name"
                            className="h-full block bg-none border-none non-text-decoration text-left w-full box-border text-[rgb(26,115,232)]
                             pt-[15px] pb-4 px-4 -outline-offset-4 md:px-6"
                          >
                            <div className="flex items-center" role="text">
                              <div className="flex-1">
                                <div className="-mt-1 sm:flex sm:items-stretch sm:flex-wrap">
                                  <div className="flex items-center basis-[156px] mr-6 pt-1">
                                    <div className="flex items-center pt-1">
                                      <h3 className="font-sans text-xs font-medium normal-case text-[rgb(95,99,104)] m-0 p-0 w-full">
                                        Name
                                      </h3>
                                    </div>
                                  </div>

                                  <div className="flex-grow flex-shrink mr-6">
                                    <div className="flex items-center pt-1">
                                      <div className="font-sans font-normal tracking-wide text-sm text-[rgb(32,33,36)] m-0 p-0 w-full">
                                        {data?.name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex-grow-0 flex-shrink-0 ml-4">
                                <figure
                                  className="flex items-center justify-center h-6 m-0 p-0 w-6 left-0"
                                  aria-hidden="true"
                                >
                                  <MdOutlineArrowForwardIos
                                    className="text-[rgb(95,99,104)] text-[24px] font-normal"
                                    aria-hidden="true"
                                  />
                                </figure>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>

                      {/* <div className="min-h-[1px] hover:bg-gray-50">
                        <div className="pl-4 md:pl-6" role="presentation">
                          <div className="border-t-[1px] border-solid border-[rgb(218,220,224)]"></div>
                        </div>

                        <div className="relative outline-none overflow-hidden will-change">
                          <a
                            href=""
                            className="h-full block bg-none border-none non-text-decoration text-left w-full box-border text-[rgb(26,115,232)]
                             pt-[15px] pb-4 px-4 -outline-offset-4 md:px-6"
                          >
                            <div className="flex items-center" role="text">
                              <div className="flex-1">
                                <div className="-mt-1 sm:flex sm:items-stretch sm:flex-wrap">
                                  <div className="flex items-center basis-[156px] mr-6 pt-1">
                                    <div className="flex items-center pt-1">
                                      <h3 className="font-sans text-xs font-medium normal-case text-[rgb(95,99,104)] m-0 p-0 w-full">
                                        Date of birth
                                      </h3>
                                    </div>
                                  </div>

                                  <div className="flex-grow flex-shrink mr-6">
                                    <div className="flex items-center pt-1">
                                      <div className="font-sans font-normal tracking-wide text-sm text-[rgb(32,33,36)] m-0 p-0 w-full">
                                        01/01/2001
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex-grow-0 flex-shrink-0 ml-4">
                                <figure
                                  className="flex items-center justify-center h-6 m-0 p-0 w-6 left-0"
                                  aria-hidden="true"
                                >
                                  <MdOutlineArrowForwardIos
                                    className="text-[rgb(95,99,104)] text-[24px] font-normal"
                                    aria-hidden="true"
                                  />
                                </figure>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div> */}

                      <div className="min-h-[1px] hover:bg-gray-50">
                        <div className="pl-4 md:pl-6" role="presentation">
                          <div className="border-t-[1px] border-solid border-[rgb(218,220,224)]"></div>
                        </div>

                        <div className="relative outline-none overflow-hidden will-change">
                          <a
                            href="/account/profile/gender"
                            className="h-full block bg-none border-none non-text-decoration text-left w-full box-border text-[rgb(26,115,232)]
                             pt-[15px] pb-4 px-4 -outline-offset-4 md:px-6"
                          >
                            <div className="flex items-center" role="text">
                              <div className="flex-1">
                                <div className="-mt-1 sm:flex sm:items-stretch sm:flex-wrap">
                                  <div className="flex items-center basis-[156px] mr-6 pt-1">
                                    <div className="flex items-center pt-1">
                                      <h3 className="font-sans text-xs font-medium normal-case text-[rgb(95,99,104)] m-0 p-0 w-full">
                                        Sex
                                      </h3>
                                    </div>
                                  </div>

                                  <div className="flex-grow flex-shrink mr-6">
                                    <div className="flex items-center pt-1">
                                      <div className="font-sans font-normal tracking-wide text-sm text-[rgb(32,33,36)] m-0 p-0 w-full">
                                        {data?.sex ? "Male" : "Female"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex-grow-0 flex-shrink-0 ml-4">
                                <figure
                                  className="flex items-center justify-center h-6 m-0 p-0 w-6 left-0"
                                  aria-hidden="true"
                                >
                                  <MdOutlineArrowForwardIos
                                    className="text-[rgb(95,99,104)] text-[24px] font-normal"
                                    aria-hidden="true"
                                  />
                                </figure>
                              </div>
                            </div>
                          </a>
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
                                        Premium
                                      </h3>
                                    </div>
                                  </div>

                                  <div className="flex-grow flex-shrink mr-6">
                                    <div className="flex items-center pt-1">
                                      <div className="font-sans font-normal tracking-wide text-sm text-[rgb(32,33,36)] m-0 p-0 w-full">
                                        {data?.premium
                                          ? "Member"
                                          : "Not a member"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
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
                                        Join date
                                      </h3>
                                    </div>
                                  </div>

                                  <div className="flex-grow flex-shrink mr-6">
                                    <div className="flex items-center pt-1">
                                      <div className="font-sans font-normal tracking-wide text-sm text-[rgb(32,33,36)] m-0 p-0 w-full">
                                        {data?.created.toString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* <div className="flex-grow-0 flex-shrink-0 ml-4">
                                <figure
                                  className="flex items-center justify-center h-6 m-0 p-0 w-6 left-0"
                                  aria-hidden="true"
                                >
                                  <MdOutlineArrowForwardIos
                                    className="text-[rgb(95,99,104)] text-[24px] font-normal"
                                    aria-hidden="true"
                                  />
                                </figure>
                              </div> */}
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*  Contact info */}
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
                                Contact info
                              </h2>
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
                                        Email
                                      </h3>
                                    </div>
                                  </div>

                                  <div className="flex-grow flex-shrink mr-6">
                                    <div className="flex items-center pt-1">
                                      <div className="font-sans font-normal tracking-wide text-sm text-[rgb(32,33,36)] m-0 p-0 w-full">
                                        {data?.email}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* <div className="flex-grow-0 flex-shrink-0 ml-4">
                                <figure
                                  className="flex items-center justify-center h-6 m-0 p-0 w-6 left-0"
                                  aria-hidden="true"
                                >
                                  <MdOutlineArrowForwardIos
                                    className="text-[rgb(95,99,104)] text-[24px] font-normal"
                                    aria-hidden="true"
                                  />
                                </figure>
                              </div> */}
                            </div>
                          </a>
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
                                        Phone number
                                      </h3>
                                    </div>
                                  </div>

                                  <div className="flex-grow flex-shrink mr-6">
                                    <div className="flex items-center pt-1">
                                      <div className="font-sans font-normal tracking-wide text-sm text-[rgb(32,33,36)] m-0 p-0 w-full">
                                        {data?.phone}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* <div className="flex-grow-0 flex-shrink-0 ml-4">
                                <figure
                                  className="flex items-center justify-center h-6 m-0 p-0 w-6 left-0"
                                  aria-hidden="true"
                                >
                                  <MdOutlineArrowForwardIos
                                    className="text-[rgb(95,99,104)] text-[24px] font-normal"
                                    aria-hidden="true"
                                  />
                                </figure>
                              </div> */}
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
