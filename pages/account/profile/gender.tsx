import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Topbar from "../../../components/user/Topbar";
import { baseUrl } from "../../../constants/api";
import { UserEntity } from "../../../models/UserEntity";

function gender() {
  const router = useRouter();
  const [user, setUser] = useState<UserEntity>();
  const [gender, setGender] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      router.push("/account/profile/gender");
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChangeGender = () => {
    const jwtString = sessionStorage.getItem("token");

    if (user?.sex == gender)
      return alert("Please choose a different gender from your current one!");
    axios
      .put(
        `${baseUrl}/api/users/user-change`,
        {
          Name: user?.name,
          Sex: gender,
        },
        {
          headers: { Authorization: `Bearer ${jwtString}` },
        }
      )
      .then((res) => {
        //console.log(result);
        alert("Your information is the most recent.");
        router.push("/account/profile");
      })
      .catch((err) => {
        alert("Update failed!");
        console.log(err);
      });
  };

  return (
    <div className="bg-white w-screen min-h-screen">
      <Head>
        <title>Codeflix - Gender</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Topbar />
        <div className="h-14"></div>
        <div className="bg-white h-14 flex fixed w-full z-[998] transition">
          <div className="items-center flex m-auto max-w-full min-w-0 w-[690px]">
            <div
              id="btnLeft"
              className="flex-shrink-0 mr-1 align-middle text-[rgba(0,0,0,.54)] fill-[rgba(0,0,0,.54)] border-0 rounded-[50%]
            cursor-pointer inline-block h-12 outline-none overflow-hidden relative text-center w-12 z-0"
            >
              <span className="relative top-1/2">
                <span className="-top-3 inline-block relative">
                  <span className="text-[#5f6368] text-2xl not-italic font-normal tracking-normal non-text-decoration inline-block direction">
                    <HiOutlineArrowLeft
                      onClick={() => {
                        router.push("/account/profile");
                      }}
                    />
                  </span>
                </span>
              </span>
            </div>

            <h1
              className="font-sans font-normal overflow-hidden text-2xl tracking-normal text-ellipsis whitespace-nowrap text-[#202124] 
              flex-grow m-0 p-0 transition-all align-middle lg:font-sans lg:text-3xl lg:font-normal lg:tracking-normal"
              tabIndex={-1}
            >
              Gender
            </h1>
          </div>

          <div className="-bottom-[10px] h-[10px] overflow-hidden absolute w-full lg:border-t-[1px] lg:border-solid lg:border-t-[#dadce0]">
            <div className="h-[10px] absolute -top-[10px] transition-shadow w-full"></div>
          </div>
        </div>
        <div className="h-14"></div>
      </div>

      <main>
        <div className="contain-style">
          <div className="m-auto max-w-[660px]">
            <div className="p-4 text-[rgba(0,0,0,.65)] md:py-6 md:px-0">
              <div className="leading-[22px]">
                The system may rely on gender to deliver a tailored experience
                to you across Google services, including how we address you.{" "}
                <a
                  href=""
                  rel="noreferrer noopener"
                  data-help-url="true"
                  className="text-[rgb(26,115,232)]"
                >
                  Looking for more information
                </a>
              </div>
            </div>

            <div
              className="md:max-w-[624px] sm:py-[7px] sm:px-0 sm:border-solid box-content mb-6 w-screen rounded-lg border-none
            bg-[#fff] sm:border sm:border-[#dadce0] shadow-none flex flex-col relative md:mx-0"
            >
              <div className="sm:py-4 pl-4 sm:px-0 flex flex-col justify-center relative">
                <h3
                  className="md:px-6 sm:px-4 font-sans text-xs font-medium tracking-wide normal-case hyphens-auto text-[rgb(95,99,104)]
                mt-0 mb-1 mx-0"
                >
                  Gender
                </h3>

                <div className="sm:flex-1">
                  <div className="md:px-6 sm:px-4 mt-6 text-[rgb(60,64,67)] text-sm">
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        defaultValue={user?.sex ? false : true}
                      >
                        <FormControlLabel
                          value={user?.sex == true}
                          onSelect={() => setGender(true)}
                          control={<Radio />}
                          label="Male"
                        />

                        <FormControlLabel
                          value={user?.sex == false}
                          onSelect={() => setGender(false)}
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  <div className="md:md:px-6 sm:px-4 mt-6">
                    <button
                      className="p-4 rounded h-9 border flex justify-center items-center hover:bg-cyan-50"
                      onClick={() => handleChangeGender()}
                    >
                      <span className="text-sm text-[#1a73e8] font-medium">
                        Confirm
                      </span>
                    </button>
                  </div>

                  <div className="md:md:px-6 sm:px-4 mt-6">
                    <div className="flex flex-col font-sans text-sm font-normal tracking-wide hyphens-auto text-[rgb(95,99,104)]">
                      This information is private. Only you can see this
                      information.
                      <a href="" className="relative text-[rgb(26,115,232)]">
                        Looking for more information
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <span
                className="opacity-0 w-full h-full top-0 left-0 bg-[#e8eaed] absolute rounded-[inherit] pointer-events-none
                    transition-[opacity_280ms_cubic-bezier(0.4,0,0.2,1)] after:absolute after:box-border after:w-full after:h-full
                    after:top-0 after:left-0 after:rounded-[inherit] after:content-[''] after:pointer-events-none"
              ></span>
            </div>

            <div className="h-16"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default gender;
