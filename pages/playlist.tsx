import Head from "next/head";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { TbMenu } from "react-icons/tb";
import { BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import axios from "axios";
import { baseUrl } from "../constants/api";
import { UserEntity } from "../models/UserEntity";
import { useRouter } from "next/router";
import { BiMenuAltLeft } from "react-icons/bi";

function playlist() {
  const router = useRouter();
  const [user, setUser] = useState<UserEntity>();
  const [showOptionsPlaylist, setShowOptionsPlaylist] = useState(true);

  useEffect(() => {
    if (
      sessionStorage.getItem("token") != null ||
      sessionStorage.getItem("token")?.length === 0
    ) {
      router.push("/playlist");
    } else {
      router.push("/start");
    }
  }, []);

  const getUser = async () => {
    const jwtString = sessionStorage.getItem("token");
    axios
      .get<UserEntity>(`${baseUrl}/api/users/profile`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const removeFromPlaylist = async (id: String) => {
    const jwtString = sessionStorage.getItem("token");
    axios
      .delete(`${baseUrl}/api/users/playlist/${id}`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then(() => {
        getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Codeflix - Playlist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
        <main className="relative px-4 lg:space-y-24 lg:px-16">
          <div className="mb-[130px]"></div>

          <div className="bg-transparent flex flex-1 items-start basis-[0.000000001px] relative overflow-hidden flex-col">
            <div className="mb-3 mr-6 box-border w-full">
              <div className="bg-[rgba(255,255,255,0.1)] flex py-2 pr-2 pl-6 justify-between">
                <div className="text-[#f1f1f1] self-center font-sans text-base font-normal p-2">
                  One or more videos have been removed from the playlist because
                  they were deleted from Codeflix.
                </div>
              </div>
            </div>

            <div className="flex flex-row mb-3 ml-9">
              <BiMenuAltLeft className="mr-2 text-3xl" />
              <span className="text-xl">
                List includes: {user?.playLists.length} movies
              </span>
            </div>

            <div
              className="w-full min-w-0 box-border m-0 min-h-[calc(100vh-56px)] flex flex-none flex-col-reverse justify-end
            md:flex md:flex-row md:justify-start"
            >
              <div className="md:flex-1 md:basis-[0.000000001px] max-w-full min-w-0">
                {user?.playLists.map((value) => (
                  <div className="relative">
                    <div className="flex flex-row cursor-pointer items-center hover:bg-[#272727d1] shadow-none rounded-xl mb-2">
                      <div className="flex flex-row items-center self-stretch pl-2 pr-1">
                        <div className="flex-none items-center px-0 py-[6px] justify-center relative align-middle">
                          <TbMenu className="w-full h-full pointer-events-none" />
                        </div>
                      </div>

                      <div
                        className="p-2 cursor-pointer min-w-0 flex flex-row flex-1 basis-[0.000000001px] flex-wrap justify-start"
                        onClick={() =>
                          router.push({
                            pathname: "/film/watch/[idFilm]",
                            query: { idFilm: value.filmId },
                          })
                        }
                      >
                        <div className="min-w-0 basis-[368px] flex-grow flex flex-row ">
                          <div className="mr-2 h-[92px] w-[120px] flex-none relative">
                            <a
                              className="absolute top-0 right-0 bottom-0 left-0 h-full mx-auto overflow-hidden block rounded-lg
                            non-text-decoration cursor-pointer"
                            >
                              {value.film.premium ? (
                                <div className="status animate-pulse ">
                                  <span className="tracking-normal text-base font-mono">
                                    P
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}

                              <img
                                src={value.film.webUrl}
                                className="bg-transparent object-cover w-full h-full visibility-inherit inline-block min-h-[1px] min-w-[1px]"
                              />
                            </a>
                          </div>

                          <div className="md:ml-2 min-w-0 flex-1 basis-[0.000000001px]">
                            <h3
                              title={value.film.name}
                              className="text-[#f1f1f1]"
                            >
                              <a
                                className="mb-2 font-sans text-lg font-medium max-h-[4.4rem] non-text-decoration cursor-pointer
                              overflow-hidden whitespace-normal text-ellipsis min-w-0 flex-1 flex flex-row basis-[0.000000001px]"
                              >
                                {value.film.name}
                              </a>
                            </h3>

                            <div className="flex flex-row flex-wrap">
                              <div
                                className="font-sans text-sm font-normal max-h-[1.8rem] overflow-hidden flex flex-wrap max-w-full
                              flex-row items-center"
                              >
                                <a className="text-[#aaa] cursor-pointer">
                                  {value.film.views} views
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="min-w-[40px] flex justify-center items-center min-h-[40px] rounded-full active:bg-gray-700"
                        onClick={() =>
                          setShowOptionsPlaylist(!showOptionsPlaylist)
                        }
                      >
                        <div className="relative box-border flex justify-center items-center">
                          <button className="align-middle bg-none m-0 border-none p-0 w-full h-full leading-[0] cursor-pointer">
                            <div className="inline-flex items-center justify-center relative align-middle">
                              <BsThreeDotsVertical className="block pointer-events-none w-full h-full" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`${
                        showOptionsPlaylist ? "hidden" : "block"
                      } bg-[#282828] min-h-[40px] min-w-[40px] text-gray-300 rounded-lg mr-1 flex justify-center
                        items-center absolute -right-1 top-[75px] py-2`}
                    >
                      <div
                        className="py-1 cursor-pointer hover:bg-[#717171]"
                        onClick={() => removeFromPlaylist(value.id)}
                      >
                        <div className="flex items-center justify-center px-4 py-1">
                          <BsTrashFill />
                          <span className="ml-4">Remove from playlist</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default playlist;
