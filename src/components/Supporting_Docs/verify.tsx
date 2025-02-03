import React, { useState , useEffect , useRef } from 'react'
import NewUpload from './NewUpload';
import VerifyResults from './VerifyResults';
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';
import { act } from 'react';
const Verification = ({token, setIsLoggedIn, handleLogout , setIsCompResult}) => {
  const { activeFlag_1 } = useContext(UserContext);

  const isCompResultRef = useRef(null); 
  const [apiResponseData, setApiResponseData] = useState({});
  const [documentsi, setDocuments] = useState([]);
  const [flag1 , setFlag1] = useState(false);


  setIsCompResult = (value) => {
    isCompResultRef.current = value; 
  };


  useEffect(() => {
    console.log("Outside Checking")
    console.log(activeFlag_1)
    if (activeFlag_1) {
      console.log("Inside Checking")
      setIsCompResult(true); 
    }
   
  }, []);



  return (
    <div className='absolute w-[100%] h-[100%] flex justify-center'>
        
        {!isCompResultRef.current &&  (
          <div className={` flex flex-col self-center w-[46%] max-h-[100%]  rounded-[12px] mx-auto items-center rounded-b-2xl`}>
            <NewUpload setIsCompResult={setIsCompResult} setApiResponseData={setApiResponseData} token={token} setDocuments={setDocuments} setFlag1={setFlag1} setIsLoggedIn={setIsLoggedIn }/>
          </div>
        )}

        {isCompResultRef.current  && ( 
          <VerifyResults apiResponseData={apiResponseData}  documentsi={documentsi} flag1={flag1}  setIsLoggedIn={setIsLoggedIn }   />
        )}

    </div>
  )
}

export default Verification