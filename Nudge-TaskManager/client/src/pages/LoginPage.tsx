import "@mantine/core/styles.css"; // Import Mantine core styles
import NudgeLogo from "../assets/Group 1.svg"; // Import Nudge logo
import { Input, PasswordInput } from "@mantine/core"; // Mantine input components
import { Button } from "@mantine/core"; // Mantine button component
import GoogleLogo from "../assets/Vector.svg"; // Import Google logo for button
import "../index.css"; // Import custom styles
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const API_URL = "http://localhost:3000"; // Replace with your actual API URL

// interface User {
//   id: number;
//   email: string;
// } am just keeping this here just in case

// LoginPage Component
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState<string | null>(null);
  //const [users, setUsers] = useState<User[]>([]); // MARY CODE NOTE: just keep this syntax in mind
  const navigate = useNavigate(); //this one is for navigating through pages

  //this method is for logging in
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    console.log("Request payload:", user);

    axios
      .post(`${API_URL}/api/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("jwtToken", response.data.token); //this one stores the token in local storave
          navigate("/Dashboard"); //this one navigates the page to dashboard or something
        } else {
          alert("Invalid login credentials");
        }
      })
      .catch((error) => {
        //setError(error.message); // Display error message
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Left Section: Login Form */}
      <div className="flex border-red-600 w-[50%] h-full bg-[#151C21] items-center justify-center">
        <div className="flex flex-col border-white 2xl:w-[43%] 2xl:h-[55%] lg:w-[50%] lg:h-[60%]">
          {/* Login Form Header */}
          <div className="flex flex-col lg:h-max md:h-[30%] border-orange-600 lg:w-[100%]">
            <h1 className="text-[#B7CDDE] mb-[15px] 2xl:text-[20px] lg:text-[22px]">
              Welcome back to Nudge!
            </h1>

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
                      backgroundColor: "#4B5D6A", // Input background color
                      color: "white", // Input text color
                    },
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Input.Wrapper>
            </div>

            {/* Password Input */}
            <div className="">
              <Input.Label
                required
                className="text-[#6C899C] pb-[5px] text-[12px]"
              >
                Password
              </Input.Label>
              <Input.Wrapper>
                <PasswordInput
                  placeholder="Enter your password"
                  styles={{
                    input: {
                      backgroundColor: "#4B5D6A", // Input background color
                      color: "white", // Input text color
                    },
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Input.Wrapper>
            </div>
          </div>

          {/* !! INSERT ERROR MESSAGE HERE !! */}
          {/* !! INSERT ERROR MESSAGE HERE !! */}
          {/* !! INSERT ERROR MESSAGE HERE !! */}
          {/* !! INSERT ERROR MESSAGE HERE !! */}
          {/* !! INSERT ERROR MESSAGE HERE !! */}

          {/* Login Options */}
          <div className="flex h-full w-full items-center flex-col">
            <h1 className="text-[#8B8B8B] lg:text-[13px] xl:p-6">
              or login with
            </h1>
            <div className="flex lg:w-full flex-col lg:h-[65%]">
              {/* Google Login Button */}
              <div className="">
                <Button
                  fullWidth
                  size="sm"
                  className="rounded-[100px] border border-[#B7CDDD] bg-[#33424C] lg:mb-[30px] 2xl:h-[45px] 2xl:mb-[35px]"
                >
                  <div className="flex items-center ">
                    <img src={GoogleLogo} alt="" width={18} />
                    <h1 className="text-[16px] font-normal ml-[5px] text-[#B7CDDD]">
                      Google
                    </h1>
                  </div>
                </Button>
              </div>

              {/* Regular Login Button */}
              <div className="flex flex-col items-center">
                <Button
                  fullWidth
                  size="sm"
                  className="rounded-[100px] border border-[#698192] bg-[#698192] lg:mb-[30px] 2xl:h-[45px] 2xl:mb-[35px]"
                  onClick={handleLogin}
                >
                  <h1 className="text-[15px] font-normal text-[#33424C]">
                    Log in
                  </h1>
                </Button>
              </div>

              {/* Register Option */}
              <div className="flex lg:w-full justify-center items-center">
                <div className="flex 2xl:w-[49%] justify-between">
                  <h1 className="text-[#8B8B8B] lg:text-[12px] mr-[5px] 2xl:text-[14px]">
                    Don't have an account?
                  </h1>
                  <h1
                    className="text-[#4285F4] lg:text-[12px] 2xl:text-[14px] hover:underline hover:cursor-pointer"
                    onClick={() => navigate("/Registration")}
                  >
                    Register
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Nudge Logo */}
      <div className="flex border-blue-600 justify-center items-center w-[50%] h-full bg-[#33424C]">
        <img src={NudgeLogo} alt="#" className="w-[75%]" />
      </div>
    </div>
  );
}

export default LoginPage;
