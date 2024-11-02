import "@mantine/core/styles.css";
import NudgeLogo from "../assets/Group 1.svg";
import { Input, PasswordInput } from "@mantine/core";
import { Button } from "@mantine/core";
import GoogleLogo from "../assets/Vector.svg";
import "../index.css";

function LoginPage() {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex border-red-600 w-[50%] h-full bg-[#151C21] items-center justify-center">
        <div className="flex flex-col border-white lg:w-[43%] lg:h-[55%] md:w-[50%] md:h-[60%]">
          <div className="flex flex-col lg:h-max md:h-[30%] border-orange-600 lg:w-[100%]">
            <h1 className="text-[#B7CDDE] lg:mb-[15px] md:text-[20px] lg:text-[24px]">
              Welcome back to Nudge!
            </h1>
            <div className="lg:mb-[15px]">
              <Input.Label
                required
                className="text-[#6C899C] pb-[5px] text-[12px]"
              >
                Email Address
              </Input.Label>

              <Input 
                placeholder="Your Email" 
                size="md" 
              />
              
            </div>

            <div className="">
              <Input.Label
                required
                className="text-[#6C899C] pb-[5px] text-[12px]"
              >
                Password
              </Input.Label>
              <PasswordInput placeholder="Your Password" size="md" />
            </div>
          </div>
          <div className="flex lg:h-full lg:w-full items-center flex-col">
            <h1 className="text-[#8B8B8B] lg:p-6">or login with</h1>
            <div className="flex lg:w-full flex-col justify-around lg:h-[65%]">
              <div className="">
                <Button
                  fullWidth
                  size="lg"
                  className="rounded-[100px] border border-[#B7CDDD] bg-[#33424C]"
                >
                  <div className="flex items-center ">
                    <img src={GoogleLogo} alt="" width={18} />
                    <h1 className="text-[16px] font-normal ml-[5px] text-[#B7CDDD]">
                      Google
                    </h1>
                  </div>
                </Button>
              </div>
              <div className="flex flex-col items-center">
                <Button
                  fullWidth
                  size="lg"
                  className="rounded-[100px] border border-[#698192] bg-[#698192]"
                >
                  <h1 className="text-[15px] font-normal text-[#33424C]">
                    Log in
                  </h1>
                </Button>
              </div>
              <div className="flex lg:w-full justify-center">
                <div className="flex lg:w-[55%] justify-between">
                  <h1 className="text-[#8B8B8B]">Don't have an account?</h1>
                  <h1 className="text-[#4285F4]">Register</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-blue-600 justify-center items-center w-[50%] h-full bg-[#33424C]">
        <img src={NudgeLogo} alt="#" className="w-[85%]" />
      </div>
    </div>
  );
}

export default LoginPage;
