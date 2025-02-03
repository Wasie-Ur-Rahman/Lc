


import React, { useState , useEffect , useRef } from 'react'
import NewUpload from './NewUpload';
import VerifyResults from './VerifyResults';
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
const Verification = ({ token, setIsLoggedIn, handleLogout , setIsCompResult  , setActiveTab  , activeTab    }) => {
  console.log("Here")
  console.log("set active tab" , activeTab)
  const navigate  = useNavigate()
  const { activeFlag_1 , setFlagsetter ,  flagsetter} = useContext(UserContext);

  
  const isCompResultRef = useRef(null); 
  const [apiResponseData, setApiResponseData] = useState({});
  const [documentsi, setDocuments] = useState([]);
  const [flag1 , setFlag1] = useState(false);


  setIsCompResult = (value) => {
    isCompResultRef.current = value; 
  };


  useEffect(() => {
    console.log("Outside")

    if (flagsetter) {
      console.log("Inside ")
      
   
    }
   
  }, [flagsetter]);


  useEffect(() => {
    console.log("Outside Checking")
    
    console.log(activeFlag_1)
    if (activeFlag_1) {
      console.log("Inside Checking")
      setIsCompResult(true); 
    }
   
  }, []);



  return (
    <div className='absolute w-[100%] h-[100%] flex justify-center '>
        
        {!isCompResultRef.current &&  (
          <div className={` `}>
            <NewUpload setIsCompResult={setIsCompResult} setApiResponseData={setApiResponseData} token={token} setDocuments={setDocuments} setFlag1={setFlag1} setIsLoggedIn={setIsLoggedIn }  />
          </div>
        )}

        {isCompResultRef.current  && ( 
          <VerifyResults apiResponseData={apiResponseData}  documentsi={documentsi} flag1={flag1}  setIsLoggedIn={setIsLoggedIn } setActiveTab={setActiveTab}   />
        )}

      
    </div>
  )
}

export default Verification
