import React from "react";
import Topnav from "./Topnav";
import Compliance from "../Compliance/Compliance";
import Dashboard from "../Dashboard/Dashboard";
import Verification from "../Supporting_Docs/Verification";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";

const LoggedIn = ({
  activeTab,
  setActiveTab,
  token,
  setIsLoggedIn,
  handleLogout,
  userId,
  setIsAddNewUser,
}) => {
  const { verification, setVerification } = useContext(UserContext);

  // Function to determine if a tab should be disabled
  const isDisabled = (tab) => {
    if (tab === "verification") {
      return !verification; // Disable if verification is false
    }
    return false;
  };

  return (
    <div className="relative flex flex-col w-[100vw] h-[100vh]">
      <Topnav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (!isDisabled(tab)) {
            setActiveTab(tab);
          }
        }}
        handleLogout={handleLogout}
        userId={userId}
        setIsAddNewUser={setIsAddNewUser}
        isDisabled={isDisabled} // Pass the function to Topnav if needed
      />

      <div
        className="relative mb-[35px] flex self-center w-[100%] items-center"
        style={{ height: "calc(100% - 160px)" }}
      >
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "compliance" && (
          <Compliance
            token={token}
            setIsLoggedIn={setIsLoggedIn}
            handleLogout={handleLogout}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "verification" && (
          <Verification
            token={token}
            setIsLoggedIn={setIsLoggedIn}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default LoggedIn;
