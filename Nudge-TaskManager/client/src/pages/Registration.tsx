import "@mantine/core/styles.css"; // Import Mantine core styles
import NudgeLogo from "../assets/Group 1.svg"; // Import Nudge logo
import { Input, PasswordInput } from "@mantine/core"; // Mantine input components
import { Button } from "@mantine/core"; // Mantine button component
import "../index.css"; // Import custom styles

//=> MARY IMPORTS <=//
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [regData, setRegData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const updateUserState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const validateDetails = () => {
    const { email, username, password, confirmPassword } = regData;

    if (!email || !username || !password || !confirmPassword) {
      alert("Something's missing so yeah, re-do.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("The email aint valid cuh.");
      return false;
    }

    if (password.length < 8) {
      alert("The password aint long enough enough cuh.");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Bro you're trippin, passwords ain't the same cuh.");
      return false;
    }

    return true;
  };

  const submitDetails = async () => {
    if (validateDetails()) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/create",
          regData
        );
        alert(response.data.message || "Registration successful!");
        navigate("/");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(
            error.response?.data?.message || "Uh oh! Something went wrong..."
          );
        } else {
          alert("An unknown error occurred.");
        }
      }
    }
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Left Section: Registration Form */}
      <div className="flex max-lg:w-full lg:w-[50%] h-full bg-[#151C21] items-center justify-center">
        <div className="flex flex-col justify-center max-sm:w-[75%] max-lg:w-[60%] 2xl:w-[43%] 2xl:h-[55%] lg:w-[50%] lg:h-[70%]">
          {/* Registration Header */}
          <div className="flex flex-col max-lg:w-[100%] lg:h-max md:h-[30%]">
            <div className="text-[#B7CDDE] mb-[15px] flex max-sm:justify-center items-center 2xl:text-[20px] lg:text-[22px]">
              <h1 className="max-sm:hidden">Welcome to Nudge!</h1>
              <img
                src={NudgeLogo}
                alt="Nudge Logo"
                className="sm:hidden w-[75%] max-sm:w-[70%]"
              />
            </div>

            {/* Email Input */}
            <div className="lg:mb-[15px]">
              <Input.Label
                required
                className="text-[#6C899C] pb-[5px] text-[12px]"
              >
                Email Address
              </Input.Label>
              <Input.Wrapper>
                <Input
                  placeholder="Your Email"
                  styles={{
                    input: {
                      backgroundColor: "#4B5D6A",
                      color: "white",
                    },
                  }}
                  name="email"
                  value={regData.email}
                  onChange={updateUserState}
                />
              </Input.Wrapper>
            </div>

            {/* Username Input */}
            <div className="lg:mb-[15px]">
              <Input.Label
                required
                className="text-[#6C899C] pb-[5px] text-[12px]"
              >
                Username
              </Input.Label>
              <Input.Wrapper>
                <Input
                  placeholder="Your Username"
                  styles={{
                    input: {
                      backgroundColor: "#4B5D6A",
                      color: "white",
                    },
                  }}
                  name="username"
                  value={regData.username}
                  onChange={updateUserState}
                />
              </Input.Wrapper>
            </div>

            {/* Password Input */}
            <div className="lg:mb-[15px]">
              <Input.Label
                required
                className="text-[#6C899C] pb-[5px] text-[12px]"
              >
                Password
              </Input.Label>
              <Input.Wrapper>
                <PasswordInput
                  placeholder="Password"
                  styles={{
                    input: {
                      backgroundColor: "#4B5D6A",
                      color: "white",
                    },
                  }}
                  name="password"
                  value={regData.password}
                  onChange={updateUserState}
                />
              </Input.Wrapper>
            </div>

            {/* Confirm Password */}
            <div className="lg:mb-[15px]">
              <Input.Label
                required
                className="text-[#6C899C] pb-[5px] text-[12px]"
              >
                Retype Password
              </Input.Label>
              <Input.Wrapper>
                <PasswordInput
                  placeholder="Confirm Password"
                  styles={{
                    input: {
                      backgroundColor: "#4B5D6A",
                      color: "white",
                    },
                  }}
                  name="confirmPassword"
                  value={regData.confirmPassword}
                  onChange={updateUserState}
                />
              </Input.Wrapper>
            </div>
          </div>

          {/* Register Button */}
          <div className="flex w-full items-center flex-col">
            <Button
              fullWidth
              size="sm"
              className="rounded-[100px] border border-[#698192] bg-[#698192] lg:mb-[30px] 2xl:h-[45px] mt-[32px] max-lg:h-[40px]"
              onClick={submitDetails}
            >
              <h1 className="text-[15px] font-normal text-[#33424C]">
                Sign Up
              </h1>
            </Button>

            {/* Login Redirect */}
            <div className="flex lg:w-full justify-center items-center">
              <div className="flex 2xl:w-[43%] justify-between max-sm:mt-[16px]">
                <h1 className="text-[#8B8B8B] lg:text-[12px] mr-[5px]">
                  Already have an account?
                </h1>
                <h1
                  className="text-[#4285F4] lg:text-[12px] hover:underline hover:cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Log in
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Nudge Logo */}
      <div className="max-lg:hidden flex justify-center items-center w-[50%] h-full bg-[#33424C]">
        <img src={NudgeLogo} alt="Nudge Logo" className="w-[75%]" />
      </div>
    </div>
  );
};

export default Registration;
