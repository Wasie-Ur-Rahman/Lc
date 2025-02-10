import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoggedIn from "./components/Main/LoggedIn";
import LoginPage from "./components/Main/LoginPage";
import { UserProvider } from "./components/UserContext/UserContext";
import { useContext } from "react";
import { UserContext } from "./components/UserContext/UserContext";
const App = () => {
  const {
    setActiveFlag,
    setApiResonseData_Saver,
    setActiveFlag_1,
    setUpload_Results,
    setDocuments_saver,
    setFlagsetter,
    setPayload_saver,
    setFlag_progress,
    setPayload_carrier,
    setDocument_verification,
    setPayload_setter,
    setVerifyPage,
    setStart_again,
    setChecking,
    setCount,
    setMT700,
    setApiList,
    verification,
    setVerification,
    api_called,
    setApiCalled,
    files_saved,
    setFilesSaved,
    state_allinfo , 
    setState_allinfo,
     save_allinfo ,
        setSave_allinfo
    
  } = useContext(UserContext);

  const isDisabled = (tab) => activeTab !== tab;

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isLoggedIn")) || false;
  });
  const [userId, setUserId] = useState(() => {
    return sessionStorage.getItem("userId") || "";
  });
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token") || "";
  });
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem("activeTab") || "dashboard";
  });
  const [isAddNewUser, setIsAddNewUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("isAddNewUser")) || false;
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Persist state to sessionStorage whenever any state changes
  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("activeTab", activeTab);
    sessionStorage.setItem("isAddNewUser", JSON.stringify(isAddNewUser));
  }, [isLoggedIn, userId, token, activeTab, isAddNewUser]);

  // Handle logout and clear session
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveFlag(false);
    setApiResonseData_Saver({});
    setActiveFlag_1(false);
    setFilesSaved([]);
    setApiList({});
    setUserId("");
    setToken("");
    setActiveTab("dashboard");
    setIsAddNewUser(false);
    setFlagsetter(false);
    setApiCalled(false);
    setApiResonseData_Saver({});
    setUpload_Results({});
    setDocuments_saver([]);
    setVerifyPage(false);
    setFlagsetter(false);
    setPayload_saver({});
    setFlag_progress(false);
    setPayload_carrier({});
    setDocument_verification([]);
    setPayload_setter([]);
    setStart_again(false);
    setChecking(0);
    setVerification(false);
    setState_allinfo(false)
    setSave_allinfo({})
    setCount(0);
    setMT700(null);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("activeTab");
    sessionStorage.removeItem("isAddNewUser");
    navigate(`/`);
  };

  // Navigate based on login status and user role
  useEffect(() => {
    if (isLoggedIn && isAddNewUser) {
      navigate(`/signup`);
    } else if (isLoggedIn) {
      navigate(`/${userId}/${activeTab}`);
    }
  }, [isLoggedIn, userId, navigate, activeTab, isAddNewUser]);

  return (
    <div className="relative flex flex-col w-[100vw] h-[100vh]">
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn && (
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserId={setUserId}
                setToken={setToken}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAddNewUser && (
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserId={setUserId}
                setToken={setToken}
                activeTab={activeTab}
                userId={userId}
                isAddNewUser={isAddNewUser}
                setIsAddNewUser={setIsAddNewUser}
              />
            )
          }
        />
        <Route
          path="/signin"
          element={
            !isLoggedIn && (
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserId={setUserId}
                setToken={setToken}
                setIsAddNewUser={setIsAddNewUser}
              />
            )
          }
        />
        <Route
          path="/:userId/*"
          element={
            isLoggedIn && (
              <LoggedIn
                activeTab={activeTab}
                userId={userId}
                setActiveTab={setActiveTab}
                token={token}
                setIsLoggedIn={setIsLoggedIn}
                handleLogout={handleLogout}
                setIsAddNewUser={setIsAddNewUser}
              />
            )
          }
        />
      </Routes>

      {/* Footer */}
      {isLoggedIn && (
        <div className="flex w-[100%] absolute bottom-0 h-[25px] gap-1 bg-[#2B333E] justify-center z-100">
          <p className="text-[13px] py-0.5 text-white font-semibold font-inter pr-3">
            © 2024 BE-IT Technologies. All Rights Reserved
          </p>
        </div>
      )}
    </div>
  );
};

// Wrap App component inside Router
const AppWrapper = () => (
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
);

export default AppWrapper;
