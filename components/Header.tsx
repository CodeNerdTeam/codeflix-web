import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { SiHomebridge } from "react-icons/si";
import { MdOutlineSlideshow, MdMovieFilter } from "react-icons/md";
import { FaHotjar } from "react-icons/fa";
import { BiBookHeart } from "react-icons/bi";
import { MdAccountBox } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { Box, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { baseUrl } from "../constants/api";
import { FilmEntity } from "../models/FilmEntity";
import { UserEntity } from "../models/UserEntity";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);
  const [isOpenOptions, setIsOpenOptions] = useState(true);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [isShowLoading, setIsShowLoading] = useState(true);
  const router = useRouter();
  const [keywords, setKeywords] = useState("");
  const [dataFilms, setDataFilms] = useState<FilmEntity[]>([]);
  const [data, setData] = useState<UserEntity>();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const progressRef = useRef(() => {});

  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
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

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/start");
  };

  const handleKeyWordChange = (value: any) => {
    setKeywords(value);
  };

  const handleSearches = async (key: String) => {
    const jwtString = await sessionStorage.getItem("token");

    axios
      .get<FilmEntity[]>(`${baseUrl}/api/films/search?keyname=${key}`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setDataFilms(res.data);
        console.log(res.data);
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
        setData(res.data);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("avatar", res.data.avatar);
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
      <Box
        sx={{ width: "100%" }}
        className={`${isShowLoading ? "hidden" : "block"} top-0 left-0 right-0`}
      >
        <LinearProgress
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
          color="secondary"
        />
      </Box>

      {/* Header */}
      <header
        className={`${
          isScrolled && "bg-[#141414]"
        } border-b-[1px] border-solid border-gray-500 shadow-md`}
      >
        <div className="flex items-center space-x-2 md:space-x-10">
          <div
            className="p-2 rounded-full cursor-pointer hover:bg-gray-800 active:bg-gray-500 md:hidden"
            onClick={() => setIsOpenDrawer(!isOpenDrawer)}
          >
            <FiMenu className="text-3xl" />
          </div>
          <a title="Codeflix home" href="/home">
            <img
              src="/logo_codeflix.png"
              width={100}
              height={100}
              className="cursor-pointer object-contain"
            />
          </a>

          <ul className="hidden space-x-4 md:flex">
            <li className="headerLink">
              <div
                title="Home"
                onClick={() => {
                  router.push("/home");
                }}
              >
                Home
              </div>
            </li>
            <li className="headerLink">TV Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <li className="headerLink">My List</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 text-sm font-light">
          {/* <input
            type="text"
            className="md:w-96 w-40 focus:outline-none border-b-[1px] border-gray-400 h-10 gap-4 px-4 text-white font-semibold 
            bg-transparent"
            placeholder="Enter keyword to search"
            onChange={(e) => handleKeyWordChange(e.target.value)}
          />

          <div
            title="Search"
            className="p-2 rounded-full hover:bg-gray-800 active:bg-gray-500 cursor-pointer"
            onClick={() => handleSearches(keywords)}
          >
            <SearchIcon className="h-6 w-6 sm:inline" />
          </div> */}

          <img
            src={data?.avatar == "" ? "/icon.png" : data?.avatar}
            className="h-10 w-10 cursor-pointer rounded object-cover"
            onClick={() => {
              setIsOpenOptions(!isOpenOptions);
            }}
          />
        </div>
      </header>

      {/* Navigation Drawer */}
      <div
        className={`${
          isOpenDrawer ? "hidden" : "block"
        } flex flex-row w-full h-full fixed z-[666] top-0`}
      >
        <div
          className={`${
            isOpenDrawer ? "w-0 p-0" : "w-80 p-4"
          } fixed md:hidden z-[999] h-screen overflow-y-auto bg-white dark:bg-[#141414] top-0 border-r
        border-black`}
          tabIndex={-1}
        >
          <h5 className="text-base font-bold text-gray-500 uppercase dark:text-gray-400">
            Menu
          </h5>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
          rounded text-2xl p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setIsOpenDrawer(!isOpenDrawer)}
          >
            <IoCloseOutline />
          </button>

          <div className="py-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <div
                  title="Home"
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100
                dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    router.push("/home");
                  }}
                >
                  <SiHomebridge
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Home</span>
                </div>
              </li>

              <li>
                <a
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100
                dark:hover:bg-gray-700 cursor-pointer"
                >
                  <MdOutlineSlideshow
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">TV Shows</span>
                </a>
              </li>

              <li>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100
                dark:hover:bg-gray-700 cursor-pointer"
                >
                  <MdMovieFilter
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">Movies</span>
                </div>
              </li>

              <li>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100
                dark:hover:bg-gray-700 cursor-pointer"
                >
                  <FaHotjar
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">News & Popular</span>
                </div>
              </li>

              <li>
                <div
                  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100
                dark:hover:bg-gray-700 cursor-pointer"
                >
                  <BiBookHeart
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900
                dark:group-hover:text-white"
                  />
                  <span className="ml-3">My List</span>
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

      {/* options menu */}
      <div
        className={`${
          isOpenOptions ? "hidden" : "block"
        } z-[666] fixed bg-none h-[1px] right-[3%] top-[72px] md:top-[88px] `}
      >
        <div
          className="bg-[#151617] h-max w-max rounded-lg flex flex-col items-center text-white shadow-lg cursor-pointer
        border border-transparent"
        >
          <div
            className="flex flex-row items-center w-full py-3 px-7 mt-2 hover:bg-gray-500"
            onClick={() => {
              setIsShowLoading(!isShowLoading);
              router.push("./account/home");
            }}
          >
            <MdAccountBox className="text-2xl" />
            <span className="ml-4">Account settings</span>
          </div>
          <div
            className="flex flex-row items-center w-full py-3 px-7 mb-2 hover:bg-gray-500"
            onClick={() => handleLogout()}
          >
            <CiLogin className="text-2xl" />
            <span className="ml-4">Sign out</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
