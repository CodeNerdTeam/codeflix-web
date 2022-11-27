import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Wallpaper from "../assets/wallpaper.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { Box, LinearProgress } from "@mui/material";
import { baseUrl } from "../constants/api";

interface Inputs {
  email: string;
  password: string;
}

function login() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [isShowLoading, setIsShowLoading] = useState(true);
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ip, setIP] = useState("");
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, []);

  const getIP = useCallback(async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
    setCountryName(res.data.country_name);
  }, []);

  useEffect(() => {
    getIP();
  }, [getIP]);

  const handleEmailChange = (value: any) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: any) => {
    setPassword(value);
  };

  const handleLogin = () => {
    if (email.length !== 0 || password.length !== 0) {
      setIsShowLoading(!isShowLoading);
      const data = {
        Email: email,
        Password: password,
        Ip: ip,
        Country: countryName,
      };

      const url = `${baseUrl}/api/users/login`;

      axios
        .post(url, data)
        .then((result) => {
          //alert(result.data);
          sessionStorage.setItem("token", result.data);
          router.push("/home");
        })
        .catch(() => {
          alert("Login failed");
          setIsShowLoading(isShowLoading);
        });
    } else {
    }
  };

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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      //
    } else {
      //
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-screen bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Codeflix - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        sx={{ width: "100%" }}
        className={`${
          isShowLoading ? "hidden" : "block"
        } absolute top-0 left-0 right-0`}
      >
        <LinearProgress
          variant="buffer"
          value={progress}
          valueBuffer={buffer}
          color="secondary"
        />
      </Box>

      <Image
        src={Wallpaper}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="fill"
      />

      <img
        src="/logo_codeflix.png"
        className="absolute object-contain cu left-4 top-4 cursor-pointer md:left-10 md:top-6"
        width={150}
        height={150}
        onClick={() => {
          router.push("/start");
        }}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="w-full inline-block">
            <input
              type="email"
              placeholder="Email"
              className="input"
              required
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </label>
          <label className="w-full inline-block">
            <input
              type="password"
              placeholder="Password"
              className="input"
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
          </label>
        </div>

        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold hover:opacity-80"
          onClick={() => {
            handleLogin();
          }}
          type="submit"
        >
          Sign In
        </button>

        <div className="text-[gray]">
          New to Codeflix?{" "}
          <button
            className="text-white hover:underline"
            type="submit"
            onClick={() => {
              router.push("/register");
            }}
          >
            Sign Up Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default login;
