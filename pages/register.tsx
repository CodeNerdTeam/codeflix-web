import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Wallpaper from "../assets/wallpaper.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { baseUrl } from "../constants/api";
import { Box, LinearProgress } from "@mui/material";

interface Inputs {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirm_password: string;
}

function register() {
  const [login, setLogin] = useState(false);
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [isShowLoading, setIsShowLoading] = useState(true);
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      router.push("/register");
    } else {
      router.push("/home");
    }
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

  const handleEmailChange = (value: any) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: any) => {
    setPassword(value);
  };

  const handleNameChange = (value: any) => {
    setNameUser(value);
  };

  const handlePhoneChange = (value: any) => {
    setPhoneNumber(value);
  };

  const handleConfirmPasswordChange = (value: any) => {
    setConfirmPassword(value);
  };

  const handleRegister = () => {
    if (
      nameUser.length == 0 ||
      phoneNumber.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0
    ) {
    } else {
      setIsShowLoading(!isShowLoading);
      const data = {
        Name: nameUser,
        Email: email,
        Phone: phoneNumber,
        Password: password,
        ConfirmPassword: confirmPassword,
        Avatar: "",
        Premium: false,
        Sex: false,
        Role: "User",
      };

      const url = `${baseUrl}/api/users/register`;

      axios
        .post(url, data)
        .then((result) => {
          //console.log(result);
          alert("Register Success!\nMerry Christmas🎄🎅");
          router.push("/login");
        })
        .catch(() => {
          alert("Register failed!");
          setIsShowLoading(isShowLoading);
        });
    }
  };

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
        <title>Codeflix - Register</title>
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
              <h2>Create Account</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="inputBox">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                </div>

                <div className="inputBox">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    onChange={(e) => handlePhoneChange(e.target.value)}
                  />
                </div>

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

                <div className="inputBox">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    required
                    onChange={(e) =>
                      handleConfirmPasswordChange(e.target.value)
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="inputBox hover:opacity-80 p-3 bg-[#e50914] text-white max-w-[100px] cursor-pointer mb-5 font-semibold
                  flex justify-center items-center rounded-xl"
                  onClick={() => {
                    handleRegister();
                  }}
                >
                  Sign Up
                </button>

                <p className="forget">
                  Already an account?{" "}
                  <a href="/login" className="hover:text-blue-500">
                    Sign In Now
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

export default register;
