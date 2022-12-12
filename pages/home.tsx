import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import Wallpaper from "../assets/wallpapper_noel.jpg";
import Banner from "../components/Banner";
import Brands from "../components/Brands";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Slider from "../components/Slider";
import Thumbnail from "../components/Thumbnail";
import { baseUrl } from "../constants/api";
import { FilmEntity } from "../models/FilmEntity";
import { GenreFilmEntity } from "../models/GenreFilmEntity ";
import { PersonFilmEntity } from "../models/PersonFilmEntity ";
import { Movie } from "../typings";
import requests from "../utils/request";
import { FaMedal, FaPlay } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  BsFillEmojiSmileFill,
  BsInfoCircleFill,
  BsShieldFillCheck,
  BsThreeDotsVertical,
  BsTrashFill,
} from "react-icons/bs";
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
import { Box, Rating } from "@mui/material";
import { UserEntity } from "../models/UserEntity";
import { MdBookmarkAdd, MdBookmarkRemove } from "react-icons/md";

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
  const [isModal, setIsModal] = useState(true);
  const [notice, setNotice] = useState(true);
  const [isOpenMovie, setIsOpenMovie] = useState(true);
  // const movie = useRecoilValue(movieState);
  const router = useRouter();
  const [data, setData] = useState<FilmEntity[]>([]);
  const [dataSearch, setDataSearch] = useState<FilmEntity[]>([]);
  const [movie, setMovie] = useState<FilmEntity>();
  const [keywords, setKeywords] = useState("");
  const [comment, setComment] = useState("");
  const [showCommentOptions, setShowCommentOptions] = useState(true);
  const [avgRating, setAvgRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [user, setUser] = useState<UserEntity>();
  const [rating, setRating] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);

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
        localStorage.setItem("idProducer", res.data.producerId);
        //console.log(res.data);
        let sum = 0;
        let totalComment = 0;
        for (const a of res.data.ratings) {
          if (a.user.role == "User") {
            sum += a.point;
            totalComment = totalComment + 1;
          }
        }
        const avg = sum / totalComment;
        setReviews(totalComment);
        setAvgRating(avg);
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
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const addPlaylist = async () => {
    const jwtString = await sessionStorage.getItem("token");
    axios
      .post(
        `${baseUrl}/api/users/playlist`,
        {
          filmId: movie?.id,
        },
        {
          headers: { Authorization: `Bearer ${jwtString} ` },
        }
      )
      .then(() => {
        alert("Ok! (❁´◡`❁)");
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
            className="w-full h-max bg-[#131313] shadow shadow-yellow-100 cursor-pointer relative"
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
            className="w-full h-max bg-[#131313] shadow shadow-yellow-100 cursor-pointer relative"
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

      <div className="snowflake">❅</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>

      <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
        <main className="relative px-4 lg:space-y-24 lg:px-16">
          {/* <Banner netflixOriginals={netflixOriginals} /> */}
          <div className="mb-[130px]"></div>
          <Slider />
          <Brands />

          <div className="z-[100] flex flex-col items-center justify-center space-x-4 mt-10 md:mt-0">
            <h1 className="text-4xl text-yellow-400 mb-2">Codeflix World</h1>
            <div className="text-2xl italic mb-[30px] !ml-0 flex flex-col items-center">
              <p>"What keywords make you happy?</p>
              <p>Which movie inspired you?"</p>
            </div>
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
              className="md:hidden p-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 mt-4 hover:opacity-75"
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
        overflow-y-scroll !scrollbar-hide bg-[rgba(0,0,0,0.4)] border-2 border-black`}
      >
        <div className="flex flex-row-reverse md:mt-24 md:mx-auto md:max-w-5xl rounded-md bg-[#121212] shadow shadow-slate-300">
          <AiFillCloseCircle
            className="mr-4 mt-2 opacity-5 text-5xl left-0 hover:opacity-20 cursor-pointer"
            onClick={() => setIsModal(!isModal)}
          />
          <div className="flex flex-col my-10 mx-4 container md:mx-10 md:flex-row">
            <img
              src={movie?.mobileUrl}
              className="md:w-64 w-auto h-96 object-fill"
            />
            <div className="ml-5 flex flex-col">
              <h2 className="md:text-4xl md:mt-0 mt-5 text-xl font-semibold text-white">
                {movie?.name}
              </h2>

              <div className="flex items-center">
                <Rating
                  name="rating"
                  value={avgRating}
                  readOnly
                  className="mt-5 font-semibold mr-2"
                />
                <span className="mt-5 text-gray-300 font-normal">
                  {reviews} Reviews
                </span>
              </div>

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
                <span className="mt-5 font-semibold">
                  Genres:{" "}
                  {movie?.genres.map((value) => (
                    <span className="mt-5 text-gray-300 font-normal text-sm">
                      <a
                        title={value.genre.name}
                        className="hover:text-yellow-300 cursor-pointer"
                        onClick={() => {
                          localStorage.setItem("idGenre", value.genreId);
                          router.push({
                            pathname: "/films/genre/[idGenre]",
                            query: { idGenre: value.genreId },
                          });
                        }}
                      >
                        {value.genre.name}
                      </a>{" "}
                    </span>
                  ))}
                </span>
              </>

              <>
                <span className="mt-5 font-semibold">
                  Cast:{" "}
                  {movie?.persons.map((value, key) => (
                    <span
                      key={key}
                      className="mt-5 text-gray-300 font-normal text-sm"
                    >
                      <a
                        title={value.person.name}
                        className="hover:text-yellow-300 cursor-pointer"
                        onClick={() => {
                          localStorage.setItem("idPerson", value.personId);
                          router.push({
                            pathname: "/films/person/[idPerson]",
                            query: { idPerson: value.personId },
                          });
                        }}
                      >
                        {value.person.name}
                      </a>{" "}
                    </span>
                  ))}
                </span>
              </>

              <>
                <span className="mt-5 font-semibold">
                  Producer:{" "}
                  <span className="mt-5 text-gray-300 text-sm font-normal">
                    <a
                      title={movie?.producer.name}
                      className="hover:text-yellow-300 cursor-pointer"
                      onClick={() => {
                        router.push({
                          pathname: "/films/producer/[idProducer]",
                          query: { idProducer: movie?.producerId },
                        });
                      }}
                    >
                      {movie?.producer.name}
                    </a>{" "}
                  </span>
                </span>
              </>

              <div className="flex gap-5">
                <div
                  title="Watch now"
                  className="flex mt-5 bg-[#25867d] px-6 py-4 rounded-md w-max cursor-pointer 
                justify-center items-center hover:opacity-80"
                  onClick={() => {
                    if (user?.premium) {
                      router.push({
                        pathname: "/film/watch/[idFilm]",
                        query: { idFilm: movie?.id },
                      });
                    } else if (movie?.premium && user?.premium == false) {
                      setNotice(!notice);
                    } else if (
                      movie?.premium == false &&
                      user?.premium == false
                    ) {
                      router.push({
                        pathname: "/film/watch/[idFilm]",
                        query: { idFilm: movie?.id },
                      });
                    }
                  }}
                >
                  <FaPlay />
                </div>

                <div
                  title="Add to playlist"
                  className="flex mt-5 bg-[#25867d] px-6 py-4 rounded-md w-max cursor-pointer 
                  justify-center items-center hover:opacity-80"
                  onClick={() => {
                    if (user?.premium) {
                      addPlaylist();
                    } else {
                      setNotice(!notice);
                    }
                  }}
                >
                  <MdBookmarkAdd className="text-xl" />
                </div>

                {/* <div
                  title="Unfollow this movie"
                  className="flex mt-5 bg-[rgb(125,72,72)] px-6 py-4 rounded-md w-max cursor-pointer 
                  justify-center items-center hover:opacity-80"
                  onClick={() => {}}
                >
                  <MdBookmarkRemove className="text-xl" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div
        className={`${
          notice ? "hidden" : "block"
        } fixed top-0 left-0 right-0 z-[200] mx-auto w-full h-screen overflow-hidden
      overflow-y-scroll !scrollbar-hide shadow-lg bg-[rgba(0,0,0,0.4)] border-2 border-black`}
      >
        <div
          className="flex flex-row-reverse translate-y-1/2 mx-4 md:translate-y-0 md:mt-64 md:mx-auto md:max-w-2xl rounded-md
          bg-[url('/warning.png')] bg-center"
        >
          <AiFillCloseCircle
            className="mr-4 mt-2 text-5xl left-0 hover:opacity-50 text-white md:text-black opacity-60 cursor-pointer"
            onClick={() => setNotice(!notice)}
          />

          <div className="flex flex-col justify-center items-center my-10 mx-4 container md:mx-10 text-shadow-sm">
            <h1 className="text-4xl font-medium text-black bg-white p-2 border">
              Notice
            </h1>
            <span className="text-base mt-4 font-normal text-black bg-white p-2 border">
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
