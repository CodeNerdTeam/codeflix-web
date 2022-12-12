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
    if (email.length !== 0 && password.length !== 0) {
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
          alert("Login failed!");
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
    <main className="overflow-hidden">
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

      <img
        src="/logo_codeflix.png"
        className="absolute object-contain cu left-4 top-4 cursor-pointer md:left-10 md:top-6"
        width={150}
        height={150}
        onClick={() => {
          router.push("/start");
        }}
      />

      <section className="section">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="relative">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="containerForm">
            <div className="form">
              <h2>Login</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inputBox">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => handleEmailChange(e.target.value)}
                  />
                </div>

                <div className="inputBox">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="inputBox hover:opacity-80 p-3 bg-[#e50914] text-white max-w-[100px] mb-5 font-semibold
                  flex justify-center items-center rounded-xl"
                  onClick={() => {
                    handleLogin();
                  }}
                >
                  Login
                </button>

                <p className="forget">
                  Forgot password?{" "}
                  <a
                    href="/signin/password-recovery"
                    className="hover:text-blue-500"
                  >
                    Click Here
                  </a>
                </p>
                <p className="forget">
                  New to Codeflix?{" "}
                  <a href="/register" className="hover:text-blue-500">
                    Sign Up Now
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default login;
