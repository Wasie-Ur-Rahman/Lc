import React, { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [ save_allinfo , setSave_allinfo] = useState({})
  const [state_allinfo , setState_allinfo] = useState(false)
  const [token, setToken1] = useState(null);
  const [userId, setUserId1] = useState(null);
  const [isLoggedIn, setIsLoggedIn1] = useState(false);
  const [api_called, setApiCalled] = useState(false);
  const [activeFlag, setActiveFlag] = useState(false);
  const [activeFlag_1, setActiveFlag_1] = useState(false);
  const [apiResonseData_Saver, setApiResonseData_Saver] = useState({});
  const [Uplaod_Results, setUpload_Results] = useState({});
  const [documents_saver, setDocuments_saver] = useState([]);
  const [verify_page, setVerifyPage] = useState(false);
  const [flagsetter, setFlagsetter] = useState(false);
  const [payload_saver, setPayload_saver] = useState({});
  const [flag_progress, setFlag_progress] = useState(false);
  const [payload_carrier, setPayload_carrier] = useState({});
  const [document_verification, setDocument_verification] = useState([]);
  const [payload_setter, setPayload_setter] = useState([]);
  const [start_again, setStart_again] = useState(false);
  const [checking, setChecking] = useState(0);
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(false);
  const [apiList, setApiList] = useState({});
  const [verification, setVerification] = useState(false);
  const [files_saved, setFilesSaved] = useState([]);
  const [mt700, setMT700] = useState({
    mt701Field: null,
    mt701FieldNames: null,
    mt701MandField: null,
  });
  // const [] = useState({});

  const handleLogout = () => {
    setToken1(null);
    setVerification(false);
    setS
    setApiList({});
    setSkip(false);
    setUserId1(null);
    setApiCalled(false);
    setIsLoggedIn1(false);
    setActiveFlag(false);
    setActiveFlag_1(false);
    setSave_allinfo({})
    setState_allinfo(false)
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
    setMT700(null);
    setCount(0);
    setFilesSaved([]);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        setToken1,
        userId,
        setUserId1,
        isLoggedIn,
        setIsLoggedIn1,
        handleLogout,
        activeFlag,
        setActiveFlag,
        apiResonseData_Saver,
        setApiResonseData_Saver,
        setActiveFlag_1,
        activeFlag_1,
        setUpload_Results,
        Uplaod_Results,
        setDocuments_saver,
        documents_saver,
        verify_page,
        setVerifyPage,
        flagsetter,
        setFlagsetter,
        payload_saver,
        setPayload_saver,
        flag_progress,
        setFlag_progress,
        payload_carrier,
        setPayload_carrier,
        document_verification,
        setDocument_verification,
        payload_setter,
        setPayload_setter,
        start_again,
        setStart_again,
        checking,
        setChecking,
        count,
        setCount,
        setMT700,
        mt700,
        skip,
        setSkip,
        setApiList,
        apiList,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
