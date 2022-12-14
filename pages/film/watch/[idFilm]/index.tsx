import { Box, Rating } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Wallpaper from "../../../../assets/wallpp.png";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  BsShieldFillCheck,
  BsThreeDotsVertical,
  BsTrashFill,
} from "react-icons/bs";
import { FaMedal } from "react-icons/fa";
import {
  ControlBar,
  ForwardControl,
  PlaybackRateMenuButton,
  Player,
  PlayToggle,
  VolumeMenuButton,
} from "video-react";
import Header from "../../../../components/Header";
import { baseUrl } from "../../../../constants/api";
import { FilmEntity } from "../../../../models/FilmEntity";
import { UserEntity } from "../../../../models/UserEntity";
import { BiFemaleSign, BiMaleSign } from "react-icons/bi";

function index() {
  const router = useRouter();
  const [movie, setMovie] = useState<FilmEntity>();
  const [user, setUser] = useState<UserEntity>();
  const [rating, setRating] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");
  const [showCommentOptions, setShowCommentOptions] = useState(true);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    if (
      sessionStorage.getItem("token") != null ||
      sessionStorage.getItem("token")?.length === 0
    ) {
    } else {
      router.push("/start");
    }
  }, []);

  const getFilmById = async (id: string | null) => {
    const jwtString = await sessionStorage.getItem("token");
    axios
      .get<FilmEntity>(`${baseUrl}/api/films/f?id=${id}`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = async () => {
    const jwtString = await sessionStorage.getItem("token");
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
    getFilmById(localStorage.getItem("film"));
  }, []);

  const addComment = async () => {
    const jwtString = await sessionStorage.getItem("token");
    axios
      .post(
        `${baseUrl}/api/rating/create`,
        {
          filmId: movie?.id,
          point: rating,
          comment: comment,
        },
        {
          headers: { Authorization: `Bearer ${jwtString}` },
        }
      )
      .then(() => {
        getFilmById(movie!.id);
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeComment = async (id: String) => {
    const jwtString = await sessionStorage.getItem("token");
    axios
      .delete(`${baseUrl}/api/rating/remove/${id}`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then(() => {
        getFilmById(movie!.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeComment = (comment: any) => setComment(comment);

  const labels: { [index: string]: string } = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };

  return (
    <>
      <Head>
        <title>Codeflix - Watching {movie?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Image
        src={Wallpaper}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="fill"
      />

      <main
        className={` relative left-0 right-0 top-24 h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]`}
      >
        <div className="m-5">
          <div className="lg:px-28 md:ml-[5px] md:mt-2 text-2xl tracking-wide">
            <span className="uppercase text-yellow-300">
              Watching movie:{" "}
              <span className="text-blue-200">{movie?.name}</span>
            </span>
          </div>

          <div className="flex items-center justify-center mt-5">
            <Player
              playsInline
              poster="/favicon.ico"
              src={movie?.videoUrl}
              fluid={false}
              height={570}
              width={1300}
            >
              <ControlBar>
                <PlayToggle />
                <VolumeMenuButton vertical />
                <ForwardControl seconds={5} />
                <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1, 0.5, 0.25]} />
              </ControlBar>
            </Player>
          </div>

          <div className="lg:px-28 md:ml-[5px] md:mt-16 mt-5">
            <div className="w-full h-40 p-1 mb-6 border border-gray-600 rounded-lg flex gap-4">
              <img
                src={movie?.webUrl}
                alt={movie?.name}
                className="h-full w-1/5 rounded"
              />
              <div className="flex flex-col gap-4 p-2">
                <h1 className="text-lg text-blue-200">{movie?.name}</h1>
                <span className="text-sm text-gray-200 tracking-wide">
                  {movie?.describe}
                </span>
              </div>
            </div>

            <div className="w-full rounded-lg shadow-md shadow-blue-600/50 mb-6">
              <form action="" className="w-full p-4">
                <div className="flex flex-row items-center">
                  <label htmlFor="rating" className="text-lg text-gray-200">
                    Movie rating:
                  </label>

                  <Rating
                    name="rating"
                    value={rating}
                    className="font-semibold ml-2"
                    onChange={(event, newRating) => {
                      setRating(newRating);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />
                  {rating !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : rating]}
                    </Box>
                  )}
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="text-lg text-gray-200">
                    Add a comment
                  </label>
                  <textarea
                    name="comment"
                    className="w-full mt-1 h-20 p-2 border rounded focus:outline-gray-600 text-gray-200 bg-[#0f0f0f]"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => onChangeComment(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <div
                    className="w-max px-3 py-2 mr-2 text-sm text-blue-100 bg-blue-600 rounded hover:text-blue-50 hover:bg-blue-500
                    cursor-pointer"
                    onClick={() => {
                      if (comment == "") {
                        alert("Please enter a comment!");
                      } else {
                        addComment();
                      }
                    }}
                  >
                    Post
                  </div>

                  <div
                    className="w-max px-3 py-2 text-sm text-blue-600 border border-blue-500 rounded hover:opacity-80 cursor-pointer"
                    onClick={() => setComment("")}
                  >
                    Cancel
                  </div>
                </div>
              </form>
            </div>

            <div className="w-full text-2xl font-medium text-gray-200">
              {movie?.ratings.length} Comments
            </div>

            <div className="w-full flex flex-col justify-center relative pb-5">
              <>
                {movie?.ratings.map((value) => (
                  <div className="relative">
                    {value.userId == localStorage.getItem("userIdComment") &&
                    value.comment == localStorage.getItem("commentOfUser") ? (
                      <div
                        className={`${
                          showInfo ? "hidden" : "block"
                        } absolute bg-white h-[135px] w-[260px] max-w-[300px] left-[143px] shadow shadow-gray-400 z-20`}
                      >
                        <div className="relative w-full h-full left-0 top-0 z-20">
                          {/* <video
                            src="https://cdn.discordapp.com/attachments/1034369224543567936/1048899495854866522/Steam_Workshop--Viet_hoa_Khi_linh_Lang_U.webm"
                            className="absolute w-full h-full object-fill"
                            muted
                            loop
                            autoPlay
                          /> */}

                          {value.user.premium && value.user.role == "User" ? (
                            <>
                              <img
                                src="https://i.pinimg.com/originals/5f/cb/5b/5fcb5b7238144e58a3feb870298f600d.gif"
                                alt=""
                                className="absolute w-full h-full object-fill z-0"
                              />

                              <div className="bg-[rgba(0,0,0,0.4)] h-1/2 top-0 w-full z-10 absolute"></div>

                              <div className="absolute z-20 flex items-center gap-2 top-4 left-2">
                                <img
                                  src={
                                    value.user?.avatar == ""
                                      ? "/icon.png"
                                      : value.user?.avatar
                                  }
                                  alt=""
                                  className="h-20 w-20 rounded-[50%] border border-gray-600"
                                />

                                <span
                                  className="text-base text-[#57cbde] font-medium text-shadow-xl capitalize flex items-center
                                  justify-center"
                                >
                                  {value.user.name}
                                  {value.user.sex ? (
                                    <BiMaleSign className="ml-1" />
                                  ) : (
                                    <BiFemaleSign className="ml-1" />
                                  )}
                                </span>
                              </div>

                              <div className="bg-[rgba(0,0,0,0.8)] h-1/2 bottom-0 w-full z-10 absolute"></div>
                            </>
                          ) : (
                            <>
                              {value.user.premium == false &&
                              value.user.role == "User" ? (
                                <>
                                  {/* <img
                                    src="https://i.pinimg.com/originals/79/d1/df/79d1dfa43099914774f14b7423282813.gif"
                                    alt=""
                                    className="absolute w-full h-full object-fill z-0"
                                  /> */}

                                  <div className="h-full w-full absolute z-0 bg-gray-400"></div>

                                  <div className="bg-[rgba(0,0,0,0.4)] h-1/2 top-0 w-full z-10 absolute"></div>

                                  <div className="absolute z-20 flex items-center gap-2 top-4 left-2">
                                    <img
                                      src={
                                        value.user?.avatar == ""
                                          ? "/icon.png"
                                          : value.user?.avatar
                                      }
                                      alt=""
                                      className="h-20 w-20 rounded-[50%] border border-gray-600"
                                    />

                                    <span
                                      className="text-base text-[#57cbde] font-medium text-shadow-xl capitalize flex items-center
                                      justify-center"
                                    >
                                      {value.user.name}
                                      {value.user.sex ? (
                                        <BiMaleSign className="ml-1" />
                                      ) : (
                                        <BiFemaleSign className="ml-1" />
                                      )}
                                    </span>
                                  </div>

                                  <div className="bg-[rgba(0,0,0,0.8)] h-1/2 bottom-0 w-full z-10 absolute"></div>
                                </>
                              ) : (
                                <>
                                  <img
                                    src="https://i.pinimg.com/originals/6b/66/32/6b663216955e50134bba3c796a4fc747.gif"
                                    alt=""
                                    className="absolute w-full h-full object-fill z-0"
                                  />

                                  <div className="bg-[rgba(0,0,0,0.4)] h-1/2 top-0 w-full z-10 absolute"></div>

                                  <div className="absolute z-20 flex items-center gap-2 top-4 left-2">
                                    <img
                                      src={
                                        value.user?.avatar == ""
                                          ? "/icon.png"
                                          : value.user?.avatar
                                      }
                                      alt=""
                                      className="h-20 w-20 rounded-[50%] border border-gray-600"
                                    />

                                    <span
                                      className="text-base text-[#57cbde] font-medium text-shadow-xl capitalize flex items-center
                                      justify-center"
                                    >
                                      {value.user.name}
                                      {value.user.sex ? (
                                        <BiMaleSign className="ml-1" />
                                      ) : (
                                        <BiFemaleSign className="ml-1" />
                                      )}
                                    </span>
                                  </div>

                                  <div className="bg-[rgba(0,0,0,0.8)] h-1/2 bottom-0 w-full z-10 absolute"></div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="relative grid grid-cols-1 gap-4 p-4 mt-8 mb-2 border rounded-lg bg-[#0f0f0f] shadow-lg w-full">
                      <div className="relative flex gap-4 items-center">
                        <div className="flex items-center justify-center box-border relative shadow w-32">
                          {value.user.premium && value.user.role == "User" ? (
                            <img
                              src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/1061180/265ad42925714bdab585bf9d477d6c2f5a182a5e.png"
                              className="max-w-full absolute -mb-5 -top-[42.5px] h-[101px] z-10 cursor-pointer"
                              onClick={() => {
                                setShowInfo(!showInfo);
                                localStorage.setItem(
                                  "userIdComment",
                                  value.userId
                                );
                                localStorage.setItem(
                                  "commentOfUser",
                                  value.comment
                                );
                              }}
                            />
                          ) : (
                            ""
                          )}

                          {value.user.role != "User" ? (
                            <img
                              src="/framelaplanh.png"
                              className="max-w-full absolute -mb-5 -top-[42.5px] h-[101px] w-[101px] z-10 cursor-pointer"
                              onClick={() => {
                                setShowInfo(!showInfo);
                                localStorage.setItem(
                                  "userIdComment",
                                  value.userId
                                );
                                localStorage.setItem(
                                  "commentOfUser",
                                  value.comment
                                );
                              }}
                            />
                          ) : (
                            ""
                          )}

                          <img
                            src={
                              value.user?.avatar == ""
                                ? "/icon.png"
                                : value.user?.avatar
                            }
                            className="relative -top-8 -mb-4 bg-white h-20 w-20 rounded cursor-pointer"
                            loading="lazy"
                            onClick={() => {
                              setShowInfo(!showInfo);
                              localStorage.setItem(
                                "userIdComment",
                                value.userId
                              );
                              localStorage.setItem(
                                "commentOfUser",
                                value.comment
                              );
                            }}
                          />
                        </div>

                        <div className="flex flex-col w-full">
                          <div className="flex flex-row text-gray-200">
                            <p className="relative text-xl whitespace-nowrap truncate overflow-hidden capitalize">
                              {value.user?.name}
                            </p>

                            <div
                              title="Administrator"
                              className={`${
                                value.user.role != "User" ? "block" : "hidden"
                              } flex items-center justify-center ml-2`}
                            >
                              <BsShieldFillCheck className="text-xl text-red-600" />
                            </div>

                            <div
                              title="Member"
                              className={`${
                                value.user.premium ? "block" : "hidden"
                              } flex items-center justify-center ml-2`}
                            >
                              <FaMedal className="text-xl text-yellow-300" />
                            </div>
                          </div>

                          {value.user.role == "User" ? (
                            <Rating
                              name="rating"
                              value={value.point}
                              readOnly
                              className="font-semibold"
                            />
                          ) : (
                            ""
                          )}
                        </div>

                        <BsThreeDotsVertical
                          className={`${
                            value.userId == user?.id ? "block" : "hidden"
                          } text-2xl cursor-pointer active:bg-gray-700 h-10 w-10 p-2 rounded-full ml-2 relative left-0`}
                          onClick={() => {
                            setShowCommentOptions(!showCommentOptions);
                            localStorage.setItem(
                              "commentOfUser",
                              value.comment
                            );
                          }}
                        />
                      </div>
                      <p className="-mt-4 text-gray-300">{value.comment}</p>
                    </div>

                    {value.userId == user?.id &&
                    value.comment == localStorage.getItem("commentOfUser") ? (
                      <div
                        className={`${
                          showCommentOptions ? "hidden" : "block"
                        } bg-[#282828] h-max w-max py-2 text-gray-300 rounded-lg absolute right-4 top-[101px]`}
                      >
                        <div
                          className="py-2 cursor-pointer hover:bg-[#717171]"
                          onClick={() => removeComment(value.id)}
                        >
                          <div className="flex flex-row items-center justify-center pl-4 pr-3">
                            <BsTrashFill />
                            <span className="ml-2">Delete</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </>
            </div>
          </div>
        </div>
        <div className="h-2 sm:h-8"></div>
      </main>
    </>
  );
}

export default index;
