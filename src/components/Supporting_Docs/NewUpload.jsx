import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaTimes , FaInfoCircle } from "react-icons/fa";
const NewUpload = ({
  setIsCompResult,
  setApiResponseData,
  setToken,
  setIsLoggedIn,
  handleLogout,
  setDocuments,
  setFlag1,
  setActiveTab,
  activeTab,
}) => {
  const {
    token,
    setActiveFlag_1,
    setVerifyPage,
    Uplaod_Results,
    setUpload_Results,
    setDocuments_saver,
    documents_saver,
    flagsetter,
    setFlagsetter,
    setActiveFlag,
    setApiResonseData_Saver,
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
    setSkip,
    skip,
    setApiList,
    apiList,
    api_called,
    setApiCalled,
    files_saved,
    save_allinfo , setSave_allinfo , state_allinfo , setState_allinfo
  } = useContext(UserContext);
  console.log("token", token);
  console.log("Checking the Skip flag ", skip);
  console.log("Checking the Save all iNFO " , save_allinfo)
  console.log("Checking the Sates " , state_allinfo)
  const [isOpen, setIsOpen] = useState(false);
  // useEffect(() => {
  // setSkip(false)
  // setFlagsetter(false)
  // }, []);

  useEffect(() => {
      
      const fetchLcInfo = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8003/get_ALL_LC_INFO/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
            },
          });
        
  
          const data = await response.json(); 
          console.log("response from the all lc info api", data);
  
       
          if (data.ALL_LC_INFO === "\"\"") {
            console.log("Received empty ALL_LC_INFO, retrying...");
          } else {
          console.log("Trerminating the api" ,state_allinfo )
          setState_allinfo(true)
          setSave_allinfo(data);
          console.log("The respone that is saved in the body is" , save_allinfo)
          }
  
        } catch (error) {
          console.error('Error fetching LC info:', error);
        }
      };
  
  
      const intervalId = setInterval(() => {
        if (!state_allinfo) { 
          fetchLcInfo(); 
        }
      }, 300); 
  
  
      return () => clearInterval(intervalId);
    }, [state_allinfo]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("CHECKING THE GET ALL INFO API" , save_allinfo)
      console.log("checking");

      if (token === null) {
        console.log("Checking");
        setIsLoggedIn(false);
        handleLogout();
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flagsetter) {
      console.log("Get out");
    }
  }, [flagsetter]);

  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [processedDocuments, setProcessedDocuments] = useState(0);
  const [totalmatch, setTotalMatch] = useState();
  const [checking, setChecking] = useState(false);
  const [isOpen1,setIsOpen1] = useState(false);

  let count = 0;
  let counter_observe = 0;

  const fetchDocuments = async () => {
    if (!skip) {
      try {
        console.log("Entering the Skip Region");
        const response = await axios.post(
          "http://127.0.0.1:8003/GetRequiredDocumentsJson_Filed_46A/"
        );
        console.log("Response from the updated API 46A:", response);

        if (response.status === 200) {
          const data = response.data;
          if (data.points && data.points !== "" && data.points !== null) {
            setDocuments(data.points);
            setDocuments_saver(data.points);
            console.log("Documents with points:", data.points);
          } else {
            console.warn("No valid points found in response. Retrying...");
          }
        } else {
          console.error("API returned an unexpected status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 1 second before retrying
  };

  useEffect(() => {
    if (isLoaded) {
      setFlag(true);
      console.log("Setting the Flag");
    }
  }, [isLoaded]);

  useEffect(() => {
    console.log("calling the api");
    if (start_again) {
      setFlag_progress(false);
      setStart_again(false);
      uploadFiles();
    }
    if (!flag_progress) {
      uploadFiles();
    }
  }, []);

  const uploadFiles = async () => {
    setLoading(true);
    setUploading(true);

    try {
      const getUploadResults = async () => {
        try {
          let response;
          let data;
          let totalMatch;

          while (true) {
            console.log("Polling for verification results...");
            await new Promise((resolve) => setTimeout(resolve, 500));

            response = await fetch(
              "http://127.0.0.1:8003/RequiredDocumentsVerificationResult/",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            console.log(
              "Response form the  RequiredDocumentsVerificationResult:",
              response
            );
            count++;
            counter_observe++;

            if (!response.ok) {
              throw new Error(
                `Fetching upload results failed with status: ${response.status}`
              );
            }

            console.log("Count checker ", count);
            data = await response.json();
            console.log("Response data json", data);

            if (response.ok && !api_called) {
              console.log("Current Verification Response:", data);
              setSkip(true);
              setTotalDocuments(1);
              setProcessedDocuments(1);
              console.log("cHECKING THE SKIP again ", skip);
              setFlag_progress(false);
              await fetchDocuments();
              console.log("Final Upload Results:", data);
              setApiResponseData(data);
              setApiList(data);
              setUpload_Results(data);
              setLoading(false);
              setIsLoaded(true);
              setUploading(false);
              setUploadError("");
              setIsCompResult(true);
              setFlag1(true);
              setActiveFlag_1(true);

              break;
            }

            if (response.ok && data.message) {
              console.log("Current Verification Response:", data);
              setApiResponseData(data);
              setApiList(data);
              console.log("Verification data check ", data);

              const message = data.message;
              totalMatch = message.match(/Total Documents : (\d+)/);
              const processedMatch = message.match(/Processed : (\d+)/);

              if (counter_observe === 1 && totalMatch && processedMatch) {
                const total = parseInt(totalMatch[1], 10);
                const processed = parseInt(processedMatch[1], 10);

                setTotalDocuments(total);
                setProcessedDocuments(processed);
                if (processed >= total) {
                  console.log("In the counter observe");
                  console.log("No supporting documents");
                  console.log("All documents processed.");

                  setSkip(true);
                  console.log("cHECKING THE SKIP again ", skip);
                  setFlag_progress(false);
                  console.log("Message", data.message);
                  // setIsCompResult(true);
                  //  setChecking(true)

                  await new Promise((resolve) => setTimeout(resolve, 500));

                  // setTotalDocuments(1);
                  // setProcessedDocuments(1);
                  if (totalMatch) {
                    const total = parseInt(totalMatch[1], 10);
                    console.log("Documents Count:", total);
                    setProcessedDocuments(total);
                  }

                  console.log(
                    "Verification complete, waiting to show final results."
                  );
                  setFlag(true);
                  await fetchDocuments();

                  await new Promise((resolve) => setTimeout(resolve, 500));

                  console.log("Final Upload Results:", data);
                  setApiResponseData(data);
                  setApiList(data);
                  setUpload_Results(data);
                  setLoading(false);
                  setIsLoaded(true);
                  setUploading(false);
                  setUploadError("");
                  setIsCompResult(true);
                  setFlag1(true);
                  setActiveFlag_1(true);
                  // setFlag_progress(false)
                  break;
                }
              } else if (totalMatch && processedMatch) {
                const total = parseInt(totalMatch[1], 10);
                const processed = parseInt(processedMatch[1], 10);

                setTotalDocuments(total);
                setProcessedDocuments(processed);

                if (processed >= total) {
                  console.log("All documents processed.");
                  setFlag_progress(false);
                  console.log("Message", data.message);
                  // setIsCompResult(true);
                  //  setChecking(true)
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  // setTotalDocuments(1);
                  // setProcessedDocuments(1);
                  if (totalMatch) {
                    const total = parseInt(totalMatch[1], 10);
                    console.log("Documents Count:", total);
                    setProcessedDocuments(total);
                  }

                  console.log(
                    "Verification complete, waiting to show final results."
                  );
                  setFlag(true);
                  await fetchDocuments();

                  await new Promise((resolve) => setTimeout(resolve, 500));

                  console.log("Final Upload Results:", data);
                  setApiResponseData(data);
                  setApiList(data);
                  setUpload_Results(data);
                  setLoading(false);
                  setIsLoaded(true);
                  setUploading(false);
                  setUploadError("");
                  setIsCompResult(true);
                  setFlag1(true);
                  setActiveFlag_1(true);
                  // setFlag_progress(false)
                  break;
                  // break;
                }
              }
            } else if (!data.message) {
              console.log("Data message not", data.message);
              if (totalMatch) {
                const total = parseInt(totalMatch[1], 10);
                console.log("Documents Count:", total);
                setProcessedDocuments(total);
              }

              console.log(
                "Verification complete, waiting to show final results."
              );
              setFlag(true);
              await fetchDocuments();

              await new Promise((resolve) => setTimeout(resolve, 500));

              console.log("Final Upload Results:", data);
              setApiResponseData(data);
              setApiList(data);
              setUpload_Results(data);
              setLoading(false);
              setIsLoaded(true);
              setUploading(false);
              setUploadError("");
              setIsCompResult(true);
              setFlag1(true);
              setActiveFlag_1(true);
              // setFlag_progress(false)
              break;
            }
          }
        } catch (error) {
          console.error("Error fetching upload results:", error);
          setUploadError(error.message);
        }
      };

      await getUploadResults();
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadError(error.message);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  useEffect(() => {
    console.log("Skip updated:", skip);
  }, [skip]);

  const progress = totalDocuments
    ? (processedDocuments / totalDocuments) * 100
    : 0;

  return (
    <div className="w-screen h-screen">

<div className="w-[96%] flex flex-row justify-center items-center">
<div className="  flex flex-row justify-center items-center space-x-20 h-20 w-full Laptops:ml-11 4k:ml-24 Laptops_L:ml-16  border-b-[1px]   border-[#959191] "
     >
       {state_allinfo ? (
  <div className="">
  <div className="relative group">
    
  <div className={`flex flex-row items-center justify-center gap-2 font-bold ${files_saved.length !== 0 ? "" : "ml-8"}`}>
      INFO
    <button 
    onClick={() => {setIsOpen1(!isOpen1) ; setIsOpen(false)}}
   
    className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-600 transition duration-200"
  > 
    <FaInfoCircle size={22}  />
    
  </button>
      </div>
 


</div>

{isOpen1 && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">

    <div className="bg-white w-[90%] h-[90%] rounded-lg shadow-lg p-5 relative overflow-hidden">
      
    
     <button 
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        onClick={() => setIsOpen1(false)}
      >
        <FaTimes size={24} />
      </button>

 
      <div className="text-xl font-bold mb-4 text-center">LC INFO</div>

   
      <div className="overflow-auto h-[96%] border border-gray-300 rounded-lg">
        {save_allinfo.ALL_LC_INFO ? (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-[#2B333E] text-white">
              <tr>
                <th className="py-2 px-4 border-r border-b text-left">Key</th>
                <th className="py-2 px-4 border-b text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(save_allinfo.ALL_LC_INFO).map(([key, value], index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-r border-b">{key}</td>
                  <td className="py-2 px-4 border-b">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No information available</p>
        )}
      </div>
    </div>
  </div>
)}

  </div>
)
:
(
  <div>   <div className={`flex flex-row items-center justify-center gap-2 font-bold ${files_saved.length !== 0 ? "" : "ml-8"}`}>
  INFO
<button disabled

className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 transition duration-200 disabled "
> 
<FaInfoCircle size={22}  />

</button>
  </div></div>
)}

<div className="relative group">
{files_saved.length != 0 ? (
       <div className="flex flex-row items-center justify-center gap-2 font-bold">
        SAVED DOCS
          <button
            onClick={() => {setIsOpen(!isOpen) ; setIsOpen1(false)}}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-600 transition duration-200 "
          >
            <FaFileAlt size={22} />
          </button>


          {isOpen && (
            <div className=" absolute  top-1 ml-80 border border-gray-300 rounded-md bg-white shadow-md p-3 w-40 z-50 transform transition ease-linear delay-1000  duration-1000 ">
              <div className="flex justify-between items-center mb-2">
                <strong className="text-sm">Saved Files</strong>
                <FaTimes
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <ul className="list-none p-0 m-0 text-sm max-h-52 overflow-y-auto  ">
                {files_saved.map((file, index) => (
                  <li
                    key={index}
                    className="py-1 border-b last:border-b-0 text-gray-700"
                  >
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : null}
</div>

     </div>
    
     </div>
     
      {loading ? (
        <div
          className={`flex flex-col justify-center items-center w-[100%] h-[70%]  rounded-[12px] bg-white shadow-none  lg:mt-0`}
        >
          {!skip && (
            <div className="mb-5 h-4 overflow-hidden rounded-full bg-slate-300 w-96">
              <div
                className="h-4 animate-pulse rounded-full bg-gradient-to-r transition delay-700 duration-300 ease-in-out ... from-green-500 to-blue-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {flag && !skip ? (
            <div className="text-lime-500 font-bold">
              DOCUMENT ANALYZED SUCCESSFULLY
            </div>
          ) : (
            <div className="text-red-400 font-bold">
              INTELLIGENT DOCUMENT ANALYSIS FOR LC COMPLIANCE
            </div>
          )}
        </div>
      ) : null}

      {flagsetter ? (
        <div className="font-bold text-5xl ">NO SUPPORTING FILES FOUND</div>
      ) : null}
    </div>
  );
};

export default NewUpload;
