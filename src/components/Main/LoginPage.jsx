import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useState } from "react";

const LoginPage = ({
  setIsLoggedIn,
  setUserId,
  setToken,
  userId,
  activeTab,
  isAddNewUser,
  setIsAddNewUser,
  setIsCompResult,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCall = async () => {
    try {
      console.log("entered the init");
      const iscall = "http://127.0.0.1:8003/initLC/";

      const response = await fetch(`${iscall}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from the api", response);
    } catch (err) {
      setError(err);
    }
  };

  const isSignUp = location.pathname === "/signup";

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleSignInClick = () => {
    isCall();
    navigate("/signin");
  };

  return (
    <div className="h-[100%] w-[100%]">
      <div className="flex w-[100%] h-[8.5625%] bg-[#2B333E]">
        <div className="flex justify-center items-center">
          <img
            src="/logo lc 1.png"
            alt="logo"
            className="h-[70px] w-[auto] lg:h-[70px] Laptops:h-[55px]"
          />
          <div className="flex justify-center items-center mt-5">
            <p className="self-end font-roboto font-semibold text-white ">
              ComplyTrade
            </p>
          </div>
        </div>
      </div>

      <div className='relative w-[100%] h-[93.4375%] bg-[url("/login_bg.png")] bg-cover bg-center'>
        <div className="absolute inset-0 bg-[#2C333D] opacity-70"></div>
        <div className="relative h-[100%] z-10 shadow-[8px_10px_6.3px_0px_rgba(0,0,0,0.25)]">
          {/* Text and Sign-in/Sign-up */}
          <div className="absolute top-[15%] w-[100%] h-[55%] flex justify-around items-center">
            <div className="">
              <div className="font-inter font-extrabold text-[80px] leading-[50px] text-white">
                <p className="text-center">Revolutionize</p>
                <br />
                <span>Trade</span>
                <span className="bg-[#2A8BE9] px-1 ml-3">Compliance</span>
              </div>
            </div>

            {/* Conditional Rendering of SignIn/SignUp */}
            {isAddNewUser ? (
              <SignUp
                onSignInClick={handleSignInClick}
                activeTab={activeTab}
                userId={userId}
                setIsAddNewUser={setIsAddNewUser}
              />
            ) : (
              <SignIn
                onSignUpClick={handleSignUpClick}
                setIsLoggedIn={setIsLoggedIn}
                setUserId={setUserId}
                setToken={setToken}
              />
            )}
          </div>

          {/* Bottom Icons */}
          <div className="absolute bottom-[25px] flex w-[100%] h-[20%] items-center justify-evenly">
            <div className="flex flex-col">
              <img className="self-center" src="/trusted.png" alt="" />
              <p className="text-center font-inter text-[20px] text-[#FABF4B]">
                Trusted
              </p>
              <p className="text-center mt-[-6px] font-inter text-[20px] text-white">
                AI-Based Support
              </p>
            </div>

            <div className="flex flex-col">
              <img className="self-center" src="/cost-eff.png" alt="" />
              <p className="text-center font-inter text-[20px] text-[#FABF4B]">
                Cost Efficient
              </p>
            </div>

            <div className="flex flex-col">
              <img className="self-center" src="/focused.png" alt="" />
              <p className="text-center font-inter text-[20px] text-[#FABF4B]">
                Focused on
              </p>
              <p className="text-center mt-[-6px] font-inter text-[20px] text-white">
                Error Free Compliance
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex w-[100%] absolute bottom-0 h-[25px] gap-1 justify-end z-100">
            <p className="text-[13px] py-0.5 text-white font-semibold font-inter pr-3">
              © 2024 BE-IT Technologies. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
