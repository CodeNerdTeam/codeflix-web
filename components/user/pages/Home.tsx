import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineGroup } from "react-icons/md";
import { RiPencilLine } from "react-icons/ri";
import { baseUrl } from "../../../constants/api";
import { UserEntity } from "../../../models/UserEntity";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../hook/firebase";
import { deleteObjectFirebase } from "../../../hook/deleteFirebase";

function Home() {
  const [data, setData] = useState<UserEntity>();
  const [openAvatar, setOpenAvatar] = useState(true);
  const [avatar, setAvatar] = useState(null);

  const getUser = async () => {
    const jwtString = await sessionStorage.getItem("token");
    axios
      .get<UserEntity>(`${baseUrl}/api/users/profile`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setData(res.data);
        //localStorage.setItem("id", res.data.id);
        //localStorage.setItem("avatar", res.data.avatar);
        //console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const selectAvatar = (e: any) => {
    let selected = e.target.files[0];
    if (!selected) return;
    setAvatar(selected);
    console.log(selected);
  };

  //const id = sessionStorage.getItem("id");

  const changeAvatar = async (id: string) => {
    const jwtString = await sessionStorage.getItem("token");
    if (avatar == null) {
      return;
    } else {
      const avatarRef = ref(storage, `avatars/${v4()}`);
      uploadBytes(avatarRef, avatar).then(() => {
        getDownloadURL(avatarRef).then((url) => {
          deleteObjectFirebase(data?.avatar);
          axios
            .put(
              `${baseUrl}/api/users/avt/${id}`,
              { avatar: url },
              {
                headers: { Authorization: `Bearer ${jwtString}` },
              }
            )
            .then(() => {
              alert("Change avatar successfully!");
              // window.location.reload();
              getUser();
            })
            .catch((error) => {
              alert("Change avatar failed!");
              console.log(error);
            });
        });
      });
    }
  };

  return (
    <>
      <div className="text-[#555] mx-3 mt-16 max-w-[840px] p-2 lg:p-12 lg:max-w-[1120px] lg:mt-11 md:p-6 sm:p-4">
        <div className="lg:max-w-[840px]">
          <div className="pt-6">
            <div className="flex items-center justify-center">
              <div className="relative">
                <button
                  typeof="button"
                  className="block flex-grow-0 flex-shrink-0 rounded-[50%] border border-solid border-gray-300 cursor-default
                  box-border overflow-hidden relative w-auto p-0 bg-none"
                  onClick={() => setOpenAvatar(!openAvatar)}
                >
                  <figure className="flex items-center justify-center overflow-hidden m-0 p-0 w-24 h-24 rounded-[50%] relative">
                    {data?.premium ? (
                      <img
                        src="/circle7mau.png"
                        className="max-w-full align-middle absolute"
                      />
                    ) : (
                      ""
                    )}
                    <img
                      src={data?.avatar == "" ? "/icon.png" : data?.avatar}
                      className="h-full w-auto border-none"
                    />
                  </figure>

                  <div
                    className="transition-opacity duration-200 ease-in-out bg-[rgba(32,33,36,.6)] bottom-0 h-[33%] left-0 opacity-0
                    absolute right-0 hover:opacity-100"
                  >
                    <div className="avt-camera"></div>
                  </div>
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-normal text-[#202124] text-center my-5">
              Hello {data?.name}
            </h1>

            <div className="text-sm tracking-wide mt-4 text-center font-normal">
              Manage your information, plan upgrade services and payment history
              for you.
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${
          openAvatar ? "hidden" : "block"
        } overflow-hidden overscroll-contain h-full z-0`}
      >
        <div
          className="z-[1000] fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.4)]"
          onClick={() => setOpenAvatar(!openAvatar)}
        ></div>

        <div className="z-[2001] flex fixed top-[57px] right-1/2 left-1/2 items-center justify-center box-border">
          <div className="transform-none opacity-[1] flex flex-row items-center justify-around box-border h-full pointer-events-none">
            <div
              className="dark:bg-[rgb(32,33,36)] flex overflow-hidden max-h-full max-w-full rounded-lg shadow border-x-0 min-w-[280px]
            relative flex-col flex-grow-0 flex-shrink-0 box-border pointer-events-auto sm:max-w-[560px] before:absolute before:box-border
            before:w-full before:h-full before:top-0 before:left-0 before:border-2 before:border-solid before:border-transparent border-inherit
            before:content-[''] before:pointer-events-none"
              aria-modal="false"
            >
              <span
                className="opacity-0 w-full h-full top-0 left-0 bg-[#e8eaed] absolute border-inherit pointer-events-none transition-opacity
              duration-300 ease-in-out"
              ></span>
              <div className="flex overflow-hidden p-0 font-sans text-sm tracking-wide font-normal text-[#5f6368] flex-grow box-border m-0">
                <div className="flex h-full overflow-auto">
                  <div
                    className="flex flex-col sm:max-w-[540px] sm:rounded-lg sm:max-h-[calc(100vh-0px)] dark:bg-[rgb(32,33,36)]
                  dark:text-[rgb(232,234,237)] box-border overflow-hidden text-[rgb(60,64,67)] relative z-[1] contain-style"
                  >
                    <div className="flex items-center h-14 min-h-[56px] w-full z-[2]">
                      <button
                        className="dark:z-0 inline-block relative box-border border-none outline-none bg-transparent fill-current
                        non-text-decoration cursor-pointer overflow-visible text-2xl w-12 h-12 p-3 rounded-full text-inherit 
                        hover:bg-[rgb(82,93,102)]"
                        onClick={() => setOpenAvatar(!openAvatar)}
                      >
                        <IoCloseOutline className="fill-current flex-shrink-0 z-10 w-6 h-6" />
                      </button>

                      <h1 className="dark:rgb(232,234,237) font-sans text-[22px] leading-[22px] font-normal text-center w-full px-12">
                        <span className="inline-block h-6 w-max align-middle">
                          Codeflix Account
                        </span>
                      </h1>

                      <div
                        className="dark:text-[rgb(154,160,166)] text-[rgb(95,99,104)] ml-auto mr-1 text-2xl  rounded-full
                      hover:bg-[rgb(82,93,102)] p-3 cursor-pointer"
                      >
                        <BsThreeDotsVertical className="w-6 h-6" />
                      </div>
                    </div>

                    <main
                      className="sm:max-w-[400px] sm:w-[400px] sm:pt-1 sm:px-6 sm:pb-[18px] flex flex-col box-border flex-grow h-full
                    overflow-y-auto"
                    >
                      <div className="flex flex-col h-full max-w-inherit overflow-x-hidden overflow-y-auto">
                        <div className="flex flex-col overflow-y-auto">
                          <div className="flex flex-col text-left">
                            <div className="dark:text-[rgb(232,234,237)] font-sans text-lg tracking-normal font-normal text-[rgb(32,33,36)]">
                              Profile picture
                            </div>
                            <div
                              className="sm:mx-0 sm:mt-3 mt-1 dark:text-[rgb(154,160,166)] font-serif text-sm tracking-wide font-normal
                            text-[rgb(95,99,104)] "
                            >
                              Your profile picture helps others recognize you
                              and also lets you know that you're logged into
                              your account
                            </div>
                            <div
                              className="sm:mt-4 sm:mx-0 sm:mb-0 dark:text-[rgb(154,160,166)] text-[rgb(95,99,104)] items-center
                              flex justify-content-inherit"
                            >
                              <MdOutlineGroup className="sm:mr-2 h-[18px] w-6 fill-current flex-shrink-0 text-lg" />
                              <div className="dark:rgb(154,160,166)">
                                Appears in Codeflix services.{" "}
                                <a
                                  href=""
                                  className="dark:text-[rgb(138,180,248)]"
                                >
                                  More information
                                </a>
                              </div>
                            </div>
                          </div>

                          <hr
                            className="dark:border dark:border-solid dark:border-[rgb(60,64,67)] border border-solid border-[#ececec]
                            mb-6 sm:mt-6"
                          />
                        </div>

                        <div
                          className="flex h-[min(100vw-38px,288px)] top-0 justify-center m-auto min-h-[96px] min-w-[96px] w-[min(100vw-38px,288px)]
                          relative"
                        >
                          {data?.premium ? (
                            <img
                              src="/circle7mau.png"
                              className="w-full h-full align-middle absolute"
                            />
                          ) : (
                            ""
                          )}
                          <img
                            src={
                              data?.avatar == "" ? "/icon.png" : data?.avatar
                            }
                            className="rounded-[50%] h-[95%] mt-2 max-w-[266px] w-auto object-cover"
                          />
                        </div>

                        <div className="gap-x-2 flex-wrap mt-6">
                          <div className="flex-grow">
                            <div className="inline">
                              <input
                                type="file"
                                name="image"
                                accept="image/*"
                                multiple
                                className="w-full py-3 pr-[15px] pl-[11px]"
                                onChange={selectAvatar}
                              />

                              <button
                                className="py-3 pr-[15px] pl-[11px] border-gray-500 rounded border w-full dark:font-sans dark:text-sm
                              dark:tracking-wide dark:font-medium dark:normal-case dark:transition dark:duration-300 dark:ease-in-out
                              dark:shadow-none text-[#1a73e8] hover:bg-slate-800"
                                onClick={() => changeAvatar(data!.id)}
                              >
                                <RiPencilLine
                                  className="text-lg h-[18px] ml-0 mr-2 inline-block relative align-top font-sans
                                font-normal tracking-normal normal-case whitespace-nowrap direction"
                                />
                                <span className="relative">Change</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
