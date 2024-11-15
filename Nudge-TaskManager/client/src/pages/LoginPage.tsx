import "@mantine/core/styles.css"; // Import Mantine core styles
import NudgeLogo from "../assets/Group 1.svg"; // Import Nudge logo
import { Input, PasswordInput } from "@mantine/core"; // Mantine input components
import { Button } from "@mantine/core"; // Mantine button component
import GoogleLogo from "../assets/Vector.svg"; // Import Google logo for button
import "../index.css"; // Import custom styles

// LoginPage Component
function LoginPage() {
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
                />
              </Input.Wrapper>
            </div>
          </div>

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
                  <h1 className="text-[#4285F4] lg:text-[12px] 2xl:text-[14px]">
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
