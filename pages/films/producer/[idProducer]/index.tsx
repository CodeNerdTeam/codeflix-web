import { Rating } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { MdBookmarkAdd } from "react-icons/md";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import { baseUrl } from "../../../../constants/api";
import { FilmEntity } from "../../../../models/FilmEntity";
import { ProducerEntity } from "../../../../models/ProducerEntity ";
import { UserEntity } from "../../../../models/UserEntity";

function index() {
  const router = useRouter();
  const [isModal, setIsModal] = useState(true);
  const [notice, setNotice] = useState(true);
  const [reviews, setReviews] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [dataMovie, setDataMovie] = useState<ProducerEntity>();
  const [movie, setMovie] = useState<FilmEntity>();
  const [user, setUser] = useState<UserEntity>();

  useEffect(() => {
    if (
      sessionStorage.getItem("token") != null ||
      sessionStorage.getItem("token")?.length === 0
    ) {
    } else {
      router.push("/start");
    }
  }, []);

  useEffect(() => {
    getUser();
    getFilmsOfProducer(localStorage.getItem("idProducer"));
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

  const getFilmsOfProducer = async (id: string | null) => {
    const jwtString = sessionStorage.getItem("token");
    axios
      .get<ProducerEntity>(`${baseUrl}/api/producers/${id}`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setDataMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFilmById = async (id: string) => {
    const jwtString = sessionStorage.getItem("token");
    axios
      .get<FilmEntity>(`${baseUrl}/api/films/f?id=${id}`, {
        headers: { Authorization: `Bearer ${jwtString}` },
      })
      .then((res) => {
        setMovie(res.data);
        localStorage.setItem("idProducer", res.data.producerId);
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

  const addPlaylist = async () => {
    console.log("a");
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
        alert("Ok");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Codeflix - Watch movies freely, don't worry about time</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <div className="relative h-max bg-gradient-to-b from-gray-900/10 to-[#010511]">
        <main className="relative px-4 lg:space-y-24 lg:px-16">
          <div className="mb-[130px]"></div>

          <section className="mt-10 lg:mt-0 md:space-y-24">
            <h1
              className="uppercase text-yellow-400 text-3xl tracking-widest ml-3 w-max border-b-2 border-yellow-600
            hover:border-yellow-200 mb-10 md:mb-0"
            >
              List movies of {dataMovie?.name}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              <>
                {dataMovie?.films.map((data) => (
                  <div
                    title={data.name}
                    className="w-full h-max bg-[#131313] shadow-md border border-black cursor-pointer relative"
                    onClick={() => {
                      getFilmById(data.id);
                      setIsModal(!isModal);
                    }}
                  >
                    <>
                      {data.premium ? (
                        <div className="status animate-pulse">
                          <span className="tracking-normal text-base font-mono">
                            Premium
                          </span>
                        </div>
                      ) : (
                        ""
                      )}

                      <img
                        src={data.mobileUrl}
                        key={data.id}
                        className="transition ease-in-out duration-150 w-full h-64 bg-transparent object-fill md:h-96 hover:object-cover 
                        hover:opacity-75"
                      />
                    </>
                    <div className="flex flex-col mx-3 my-2 w-full">
                      <h3
                        className="uppercase text-[#44e2ff] hover:text-yellow-400 w-[90%] whitespace-nowrap text-ellipsis 
                        overflow-hidden"
                      >
                        {data.name}
                      </h3>
                      <span className="text-sm text-white hover:text-yellow-400">
                        View: {data.views}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            </div>
          </section>
        </main>
      </div>
      <Footer />

      {/* modal */}
      <div
        className={`${isModal ? "hidden" : "block"}
        fixed top-0 left-0 right-0 z-[200] mx-auto w-full h-screen overflow-hidden
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
                          router.push({
                            pathname: "/films/genre/[idGenre]",
                            query: { idGenre: value.genreId },
                          });
                        }}
                      >
                        <>
                          {value.genre.name}
                          {localStorage.setItem("idGenre", value.genreId)}
                        </>
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
                          router.push({
                            pathname: "/films/person/[idPerson]",
                            query: { idPerson: value.personId },
                          });
                        }}
                      >
                        <>
                          {value.person.name}
                          {localStorage.setItem("idPerson", value.personId)}
                        </>
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
                    if (movie?.premium != false && user?.premium == true) {
                      //setIsOpenMovie(!isOpenMovie);
                      router.push({
                        pathname: "/film/watch/[idFilm]",
                        query: { idFilm: movie?.id },
                      });
                    } else if (
                      movie?.premium != false &&
                      user?.premium != true
                    ) {
                      setNotice(!notice);
                    } else {
                      //setIsOpenMovie(!isOpenMovie);
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
                    if (movie?.premium != false && user?.premium == true) {
                      addPlaylist();
                    } else if (
                      movie?.premium == false &&
                      user?.premium == true
                    ) {
                      addPlaylist();
                    } else if (
                      movie?.premium != false &&
                      user?.premium != true
                    ) {
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
}

export default index;
