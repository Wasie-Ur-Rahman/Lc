
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";

const Topnav = ({
  activeTab,
  setActiveTab,
  handleLogout,
  userId,
  setIsAddNewUser,
}) => {
  console.log("In set active tab", activeTab);
  const { token, setActiveFlag, setApiResonseData_Saver } =
    useContext(UserContext);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const userIconRef = useRef(null);
  const navigate = useNavigate();
  console.log("user id", userId);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      userIconRef.current &&
      !userIconRef.current.contains(event.target)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col h-[22%]   ">
      <div className="flex justify-between w-[100vw] h-[43.75%]  bg-[#2B333E]">
        <div className="flex relative w-56 h-full ">
          <div className="flex justify-center items-center">
            <img
              src="/logo lc 1.png"
              alt="logo"
              className="h-[70px] w-[auto] lg:h-[60px]  "
            />
            <div className="flex justify-center items-center mt-5">
              <p className="self-end font-roboto font-semibold text-white ">
                ComplyTrade
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end pr-3 items-center">
          <div
            className="relative"
            ref={userIconRef}
            onClick={toggleDropdown}
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() =>
              !isDropdownVisible && setIsDropdownVisible(false)
            }
          >
            <img src="/user1.png" alt="user" className="h-[50px] w-[50px]" />
            {isDropdownVisible && (
              <div
                className="absolute right-0 top-[60px] text-black rounded w-[110px]"
                ref={dropdownRef}
              >
                {userId === "admin" ? (
                  <>
                    <a
                      href="#"
                      className="block text-center font-roboto font-semibold text-[14px] px-2 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setIsAddNewUser(true);
                        console.log("Add New User Clicked");
                      }}
                    >
                      Add New User
                    </a>
                    <a
                      href="#"
                      className="block text-center font-roboto font-semibold text-[14px] px-2 py-2 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </>
                ) : (
                  <a
                    href="#"
                    className="block text-center font-roboto font-semibold text-[14px] px-2 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex self-center justify-center gap-12 items-center w-[92%] border-b-[1px] border-[#959191] h-[56.25%]">
        <a
          href="#"
          className={`font-poppins font-semibold text-[18px] ${
            activeTab === "dashboard"
              ? "text-[#2B333E] underline underline-offset-8"
              : "text-[#6F7884] "
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          DASHBOARD
        </a>

        <a
          href="#"
          className={`font-poppins font-semibold text-[18px] ${
            activeTab === "compliance"
              ? "text-[#2B333E] underline underline-offset-8"
              : "text-[#6F7884] "
          }`}
          onClick={() => setActiveTab("compliance")}
        >
          COMPLIANCE
        </a>

        <a
          href="#"
          className={`font-poppins font-semibold text-[18px] ${
            activeTab === "verification"
              ? "text-[#2B333E] underline underline-offset-8"
              : "text-[#6F7884]"
          }`}
          onClick={() => setActiveTab("verification")}
        >
          VERIFICATION
        </a>
      </div>
    </div>
  );
};

export default Topnav;
