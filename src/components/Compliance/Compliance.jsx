import React, { useState, useRef, useEffect } from "react";
import NewUpload from "./NewUpload";
import CompResults from "./CompResults";
import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
const Compliance = ({
  token,
  setIsLoggedIn,
  handleLogout,
  setActiveTab,
  setIsCompResult,
}) => {
  const isCompResultRef = useRef(null); // Create a ref to store the result state
  const [apiResponseData, setApiResponseData] = useState({});
  const { activeFlag } = useContext(UserContext);

  setIsCompResult = (value) => {
    isCompResultRef.current = value; // Update the ref value
  };

  useEffect(() => {
    console.log("Outside Checking");
    console.log(activeFlag);
    if (activeFlag) {
      console.log("Inside Checking");
      setIsCompResult(true);
    }
  }, []);

  return (
    <div className="absolute w-[100%] h-[100%] flex justify-center">
      {!isCompResultRef.current && (
        <div
          className={`flex flex-col self-center w-[46%] max-h-[100%] rounded-[12px] mx-auto items-center rounded-b-2xl`}
        >
          <NewUpload
            setIsCompResult={setIsCompResult}
            setApiResponseData={setApiResponseData}
            token={token}
            setIsLoggedIn={setIsLoggedIn}
            handleLogout={handleLogout}
          />
        </div>
      )}

      {isCompResultRef.current && (
        <CompResults
          setIsCompResult={setIsCompResult}
          apiResponseData={apiResponseData}
          setActiveTab={setActiveTab}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
};

export default Compliance;
