import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import Wallpaper from "../assets/wall.jpg";
import Banner from "../components/Banner";
import Brands from "../components/Brands";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Row from "../components/Row";
import Slider from "../components/Slider";
import Thumbnail from "../components/Thumbnail";
import { baseUrl } from "../constants/api";
import { FilmEntity } from "../models/FilmEntity";
import { GenreFilmEntity } from "../models/GenreFilmEntity ";
import { PersonFilmEntity } from "../models/PersonFilmEntity ";
import { Movie } from "../typings";
import requests from "../utils/request";
import { FaPlay } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import {
  Player,
  ControlBar,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  ForwardControl,
  PlayToggle,
  ReplayControl,
} from "video-react";
import "node_modules/video-react/dist/video-react.css";
import { SearchIcon } from "@heroicons/react/solid";
import { render } from "react-dom";
import { Rating } from "@mui/material";
import { UserEntity } from "../models/UserEntity";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const [showModal, setShowModal] = useState(true);
  const [isModal, setIsModal] = useState(true);
  const [alert, setAlert] = useState(true);
  const [isOpenMovie, setIsOpenMovie] = useState(true);
  const [premium, setPremium] = useState(true);
  // const movie = useRecoilValue(movieState);
  const router = useRouter();
  const [data, setData] = useState<FilmEntity[]>([]);
  const [dataSearch, setDataSearch] = useState<FilmEntity[]>([]);
  const [movie, setMovie] = useState<FilmEntity>();
  const [keywords, setKeywords] = useState("");
  const [user, setUser] = useState<UserEntity>();
  const [genresFilm, setGenresFilm] = useState<GenreFilmEntity[]>([]);
  const [castFilm, setCastFilm] = useState<PersonFilmEntity[]>([]);

  movie?.genres.map((value) => {
    console.log(value.genre.name);
  });

  useEffect(() => {
    if (
      sessionStorage.getItem("token") != null ||
      sessionStorage.getItem("token")?.length === 0
    ) {
      router.push("/home");
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
        console.log(res.data.premium);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFilms = async () => {
    const jwtString = sessionStorage.getItem("token");
    axios
      .get<FilmEntity[]>(`${baseUrl}/api/films`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setData(res.data);
        //console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFilms();
    getUser();
  }, []);

  const getFilmById = async (id: string) => {
    const jwtString = await sessionStorage.getItem("token");
    axios
      .get<FilmEntity>(`${baseUrl}/api/films/f?id=${id}`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setMovie(res.data);
        localStorage.setItem("film", res.data.id);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        setDataSearch(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderFilms = () => {
    return (
      <>
        {data.map((movie) => (
          <div
            title={movie.name}
            className="w-full h-max bg-[#131313] shadow-md border border-black cursor-pointer relative"
            onClick={() => {
              getFilmById(movie.id);
              setIsModal(!isModal);
            }}
          >
            <>
              {movie.premium ? (
                <div className="status animate-pulse">
                  <span className="tracking-normal text-base font-mono">
                    Premium
                  </span>
                </div>
              ) : (
                ""
              )}

              <img
                src={movie.mobileUrl}
                key={movie.id}
                className="transition ease-in-out duration-150 w-full h-64 bg-transparent object-fill md:h-96 hover:object-cover 
                hover:opacity-75"
              />
            </>
            <div className="flex flex-col mx-3 my-2 w-full">
              <h3
                className="uppercase text-[#44e2ff] hover:text-yellow-400 w-[90%] whitespace-nowrap text-ellipsis 
            overflow-hidden"
              >
                {movie.name}
              </h3>
              <span className="text-sm text-white hover:text-yellow-400">
                View: {movie.views}
              </span>
              {/* <span
                title={`${movie.genres.map((value) => value.genre.name)}`}
                className="text-white w-[90%] whitespace-nowrap text-ellipsis overflow-hidden hover:text-yellow-400"
              >
                Genres: {movie.genres.map((value) => value.genre.name)}
              </span> */}
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderFilmsSearched = () => {
    return (
      <>
        {dataSearch.map((movie) => (
          <div
            title={movie.name}
            className="w-full h-max bg-[#131313] shadow-md border border-black cursor-pointer relative"
            onClick={() => {
              getFilmById(movie.id);
              setIsModal(!isModal);
            }}
          >
            <>
              {movie.premium ? (
                <div className="status animate-pulse">
                  <span className="tracking-normal text-base font-mono">
                    Premium
                  </span>
                </div>
              ) : (
                ""
              )}

              <img
                src={movie.mobileUrl}
                key={movie.id}
                className="transition ease-in-out duration-150 w-full h-64 bg-transparent object-fill md:h-96 hover:object-cover 
                hover:opacity-75"
              />
            </>

            <div className="flex flex-col mx-3 my-2 w-full">
              <h3
                className="uppercase text-[#44e2ff] hover:text-yellow-400 w-[90%] whitespace-nowrap text-ellipsis 
                overflow-hidden"
              >
                {movie.name}
              </h3>
              <span className="text-sm text-white hover:text-yellow-400">
                View: {movie.views}
              </span>
              {/* <span
                title={`${movie.genres.map((value) => value.genre.name)}`}
                className="text-white w-[90%] whitespace-nowrap text-ellipsis overflow-hidden hover:text-yellow-400"
              >
                Genres: {movie.genres.map((value) => value.genre.name)}
              </span> */}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Codeflix - {movie?.name || "Home"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <Image
        src={Wallpaper}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="fill"
      />

      <div
        className={`${
          isOpenMovie ? "block" : "hidden"
        } relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]`}
      >
        <main className="relative px-4 pb-5 lg:space-y-24 lg:px-16">
          {/* <Banner netflixOriginals={netflixOriginals} /> */}
          <div className="mb-[130px]"></div>
          <Slider />
          <Brands />

          <div className="z-[100] flex flex-col items-center justify-center space-x-4 mt-10 md:mt-0">
            <h1 className="text-4xl text-yellow-400 mb-2">Codeflix World</h1>
            <p className="text-2xl italic mb-[30px] !ml-0">
              "What keywords make you happy?
              <br />
              Which movie inspired you?"
            </p>

            <div className="flex flex-row text-sm font-light">
              <input
                type="text"
                className="md:w-[600px] w-[320px] focus:outline-yellow-400 border rounded border-yellow-300 h-10 gap-4 px-4 
              text-white font-semibold bg-transparent text-center mr-2"
                placeholder="Enter keyword to search"
                onChange={(e) => handleKeyWordChange(e.target.value)}
              />

              <div
                title="Search"
                className="hidden p-2 rounded-full hover:bg-gray-800 active:bg-gray-500 cursor-pointer md:block"
                onClick={() => handleSearches(keywords)}
              >
                <SearchIcon className="h-6 w-6 sm:inline" />
              </div>
            </div>

            <button
              title="Search"
              className="md:hidden p-4 rounded-xl bg-red-600 mt-4 hover:opacity-75"
              onClick={() => handleSearches(keywords)}
            >
              Search
            </button>
          </div>

          <section className="mt-10 lg:mt-0 md:space-y-24">
            <h1
              className="uppercase text-yellow-400 text-3xl tracking-widest ml-3 w-max border-b-2 border-yellow-600
            hover:border-yellow-200 mb-10 md:mb-0"
            >
              List movies
            </h1>
            {/* <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} /> */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {keywords.length > 0 ? renderFilmsSearched() : renderFilms()}
            </div>
            {/* My List */}
            {/* <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} /> */}
          </section>

          <Footer />
        </main>

        {/* {showModal && <Modal />} */}
      </div>

      {/* modal */}
      <div
        className={`${isModal ? "hidden" : "block"} ${
          isOpenMovie ? "block" : "hidden"
        } fixed top-0 left-0 right-0 z-[200] mx-auto w-full h-screen overflow-hidden
        overflow-y-scroll !scrollbar-hide shadow-lg bg-[rgba(0,0,0,0.4)] border-2 border-black`}
      >
        <div className="flex flex-row-reverse md:mt-24 md:mx-auto md:max-w-5xl rounded-md bg-[#121212]">
          <AiFillCloseCircle
            className="mr-4 mt-2 opacity-5 text-5xl left-0 hover:opacity-20 cursor-pointer"
            onClick={() => setIsModal(!isModal)}
          />
          <div className="flex flex-col my-10 mx-4 container md:mx-10 md:flex-row">
            <img
              src={movie?.mobileUrl}
              className="md:w-64 w-auto object-fill"
            />
            <div className="ml-5 flex flex-col">
              <h2 className="md:text-4xl md:mt-0 mt-5 text-xl font-semibold text-white">
                {movie?.name}
              </h2>

              <Rating
                name="rating"
                value={4}
                disabled
                className="mt-5 font-semibold"
              />

              <span className="mt-5 font-semibold">
                Intro:{" "}
                <span className="mt-5 text-gray-300 text-sm font-normal">
                  {movie?.describe}
                </span>
              </span>

              <span className="mt-5 font-semibold">
                Time:{" "}
                <span className="mt-5 text-gray-300 font-normal text-sm">
                  {movie?.length} minutes
                </span>
              </span>

              <span className="mt-5 font-semibold">
                Ages:{" "}
                <span className="mt-5 text-gray-300 font-normal text-sm">
                  {movie?.age}
                </span>
              </span>

              <>
                <span className="mt-5 font-semibold">Genres:</span>
                {movie?.genres.map((value) => {
                  <span className="mt-5 text-gray-300 font-normal text-sm">
                    {value.genre.name}
                  </span>;
                })}
              </>

              <>
                <span className="mt-5 font-semibold">Cast:</span>
                {movie?.persons.map((value, key) => {
                  <span
                    key={key}
                    className="mt-5 text-gray-300 font-normal text-sm"
                  >
                    {" "}
                    {value.person.name}
                  </span>;
                })}
              </>

              <>
                <span className="mt-5 font-semibold">
                  Producer:{" "}
                  <span className="mt-5 text-gray-300 text-sm font-normal">
                    {movie?.producer.name}
                  </span>
                </span>
              </>
              <div
                className="flex mt-5 bg-yellow-500 px-5 py-4 rounded-lg w-max cursor-pointer 
                justify-center items-center hover:opacity-80"
                onClick={() => {
                  if (movie?.premium == false) {
                    setIsOpenMovie(!isOpenMovie);
                  } else {
                    user?.premium
                      ? setIsOpenMovie(!isOpenMovie)
                      : setAlert(!alert);
                  }
                }}
              >
                <FaPlay />
                <p className="ml-2 font-semibold text-white">Play</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert */}
      <div
        className={`${
          alert ? "hidden" : "block"
        } fixed top-0 left-0 right-0 z-[200] mx-auto w-full h-screen overflow-hidden
      overflow-y-scroll !scrollbar-hide shadow-lg bg-[rgba(0,0,0,0.4)] border-2 border-black`}
      >
        <div className="flex flex-row-reverse md:mt-64 md:mx-auto md:max-w-2xl rounded-md bg-slate-100">
          <AiFillCloseCircle
            className="mr-4 mt-2 text-5xl left-0 hover:opacity-50 text-black opacity-60 cursor-pointer"
            onClick={() => setAlert(!alert)}
          />

          <div className="flex flex-col justify-center items-center my-10 mx-4 container md:mx-10 text-black">
            <h1 className="text-4xl font-medium">Notification</h1>
            <span className="text-base mt-4 font-normal">
              You do not have sufficient permissions to perform this function.
              <br />
              Please upgrade your account for unlimited service.
              <br />
              Become a member to use many of Codeflix's services by visiting the
              link:{" "}
              <a
                href="/account/upgrade"
                className="text-blue-700 hover:text-blue-500"
              >
                Click here
              </a>
            </span>
          </div>
        </div>
      </div>

      <main
        className={`${
          isOpenMovie ? "hidden" : "block"
        } relative left-0 right-0 top-24`}
      >
        <div className="lg:px-28 ml-5 md:ml-[5px] md:mt-2 text-2xl tracking-wide">
          <span className="uppercase text-yellow-300">
            Watching movie: <span className="text-blue-200">{movie?.name}</span>
          </span>
        </div>
        <div className="flex items-center justify-center m-5">
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
      </main>
    </>
  );
};

export default Home;

// export const getServerSideProps = async () => {
//   const [
//     netflixOriginals,
//     trendingNow,
//     topRated,
//     actionMovies,
//     comedyMovies,
//     horrorMovies,
//     romanceMovies,
//     documentaries,
//   ] = await Promise.all([
//     fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
//     fetch(requests.fetchTrending).then((res) => res.json()),
//     fetch(requests.fetchTopRated).then((res) => res.json()),
//     fetch(requests.fetchActionMovies).then((res) => res.json()),
//     fetch(requests.fetchComedyMovies).then((res) => res.json()),
//     fetch(requests.fetchHorrorMovies).then((res) => res.json()),
//     fetch(requests.fetchRomanceMovies).then((res) => res.json()),
//     fetch(requests.fetchDocumentaries).then((res) => res.json()),
//   ]);

//   return {
//     props: {
//       netflixOriginals: netflixOriginals.results,
//       trendingNow: trendingNow.results,
//       topRated: topRated.results,
//       actionMovies: actionMovies.results,
//       comedyMovies: comedyMovies.results,
//       horrorMovies: horrorMovies.results,
//       romanceMovies: romanceMovies.results,
//       documentaries: documentaries.results,
//     },
//   };
// };
