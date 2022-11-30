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
      nameUser.length !== 0 ||
      phoneNumber.length !== 0 ||
      email.length !== 0 ||
      password.length !== 0 ||
      confirmPassword.length !== 0
    ) {
      setIsShowLoading(!isShowLoading);
      const data = {
        Name: nameUser,
        Email: email,
        Phone: phoneNumber,
        Password: password,
        ConfirmPassword: confirmPassword,
        PasswordOld: "",
        Avatar: "",
        Premium: false,
        Sex: false,
        Current: "",
        Role: "User",
      };

      const url = `${baseUrl}/api/users/register`;

      axios
        .post(url, data)
        .then((result) => {
          //console.log(result);
          alert("Register Success!");
          router.push("/login");
        })
        .catch(() => {
          alert("Register failed!");
          setIsShowLoading(isShowLoading);
        });
    } else {
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
    <div className="relative flex flex-col h-screen w-screen bg-black md:items-center md:justify-center md:bg-transparent">
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

      <Image
        src={Wallpaper}
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="fill"
      />

      <img
        src="/logo_codeflix.png"
        className="absolute object-contain left-4 top-4 cursor-pointer md:left-10 md:top-6"
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
        <h1 className="text-4xl font-semibold">Create Account</h1>
        <div className="space-y-4">
          <label className="w-full inline-block">
            <input
              type="text"
              placeholder="Name"
              className="input"
              required
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </label>

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
              type="tel"
              placeholder="Phone number"
              className="input"
              required
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
          </label>

          <label className="w-full inline-block">
            <input
              type="password"
              placeholder="Password"
              className="input"
              required
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
          </label>

          <label className="w-full inline-block">
            <input
              type="password"
              placeholder="Confirm password"
              className="input"
              required
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            />
          </label>
        </div>

        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold hover:opacity-80"
          onClick={() => handleRegister()}
        >
          Sign Up
        </button>

        <div className="text-[gray]">
          Already an account?{" "}
          <button
            className="text-white hover:underline"
            onClick={() => {
              router.push("/login");
            }}
          >
            Sign In Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default register;
