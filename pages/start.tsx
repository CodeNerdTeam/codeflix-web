import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Wallpaper from "../assets/wallpaperflare.com_wallpaper.jpg";

function start() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/home");
    } else {
      router.push("/start");
    }
  }, []);

  return (
    <main>
      <div className="relative flex flex-col h-screen w-screen bg-black md:items-center md:justify-center md:bg-transparent">
        <Head>
          <title>Codeflix - Watch Movies Online</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <Image
          src={Wallpaper}
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        /> */}

        <div
          className="bg-[url('/toweroffantasymobile.jpg')] bg-cover pt-12 flex justify-center md:bg-[url('/toweroffantasy.jpg')]
          md:bg-cover md:justify-start md:pt-[3.7037rem] w-full h-full items-center flex-col flex-nowrap fixed
          left-0 bottom-0 top-auto box-border"
        >
          <div className="absolute left-0 top-0 w-full h-full">
            <video
              src="/videos/videoTOF.mp4"
              muted
              autoPlay
              loop
              className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full object-contain 
              after:absolute after:left-0 after:top-0 after:w-full after:h-full after:content-[''] after:bg-[url('/videoBlock2.png')] 
              after:bg-[100%,100%]"
            ></video>
          </div>
        </div>

        <img
          src="/logo_codeflix.png"
          className="absolute object-contain left-4 top-4 md:left-10 md:top-6"
          width={150}
          height={150}
        />

        <div className="absolute top-1/3 text-center mx-auto w-full space-y-5 md:space-y-7 text-shadow-md">
          <h2 className="text-4xl md:text-6xl max-w-2xl mx-auto font-semibold text-[#2beaf1] font-serif">
            Unlimited movies, TV shows, and more.
          </h2>
          <p
            className="text-lg md:text-2xl max-w-2xl mx-auto font-semibold text-transparent bg-clip-text 
          bg-gradient-to-br from-[#fff] to-[#ff9b9a]"
          >
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-sm md:text-lg">
            Ready to watch? Click sign up to create or restart your membership.
            <br />
            And you are ready, click sign in to watch your favorite movies!
          </p>

          <div>
            <button
              className="bg-[#e50914] w-40 h-10 rounded lg:w-52 lg:h-16 lg:text-2xl shadow-lg mx-4 hover:opacity-80"
              onClick={() => {
                router.push("/login");
              }}
            >
              Sign In
            </button>
            <button
              className="bg-[#e50914] w-40 h-10 rounded lg:w-52 lg:h-16 lg:text-2xl shadow-lg mx-4 hover:opacity-80"
              onClick={() => {
                router.push("/register");
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default start;
