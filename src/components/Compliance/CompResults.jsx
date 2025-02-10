import React, { useEffect, useState, useRef } from "react";
import CompResStats from "./CompResStats";
import MTResults from "./MTResults";
import CompStatus from "./CompStatus";
import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import { FaFileAlt, FaTimes , FaFolder , FaInfoCircle } from "react-icons/fa";
const CompResults = ({
  apiResponseData,
  setActiveTab,
  handleLogout,
  setIsLoggedIn,
  setIsCompResult,
  activeTab,
}) => {
  const [isEmptyResponse, setIsEmptyResponse] = useState(false);
  const [isMandatoryAndOptionalEmpty, setIsMandatoryAndOptionalEmpty] =
    useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const {
    token,
    apiResonseData_Saver,
    setActiveFlag,
    setApiResonseData_Saver,
    setActiveFlag_1,
    setDocuments_saver,
    setVerifyPage,
    setFlagsetter,
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
    setChecking,
    setCount,
    count,
    setMT700,
    setSkip,
    skip,
    setApiList,
    verification,
    setVerification,
    api_called,
    setApiCalled,
    files_saved,
    setFilesSaved,
    save_allinfo , setSave_allinfo , state_allinfo , setState_allinfo 
  } = useContext(UserContext);

  console.log("api Data saver", apiResponseData);

  console.log("checking", apiResonseData_Saver);
  console.log("Files saved ", files_saved);
 console.log("State ALL INFO" , state_allinfo);
 console.log("SAVE ALL INFO" ,save_allinfo)
 
  const checkMandatoryAndOptionalEmpty = (data) => {
    if (data?.mandatory700 && data?.optional700) {
      const isMandatoryEmpty = Object.keys(data.mandatory700).length === 0;
      const isOptionalEmpty = Object.keys(data.optional700).length === 0;
      return isMandatoryEmpty && isOptionalEmpty;
    }
    return false;
  };

  useEffect(() => {
    
    const fetchLcInfo = async () => {
      try {
        const response = await fetch('https://192.168.18.251:8003/get_ALL_LC_INFO/', {
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
    }, 3000); 


    return () => clearInterval(intervalId);
  }, [state_allinfo]);



  useEffect(() => {
    console.log("Checking inside the API response data saver");

    if (apiResonseData_Saver) {
      const flag = checkMandatoryAndOptionalEmpty(apiResonseData_Saver);
      console.log("Checking inside the API response data saver", flag);

      if (flag) {
        console.log("Both `mandatory700` and `optional700` are empty.");
        setIsMandatoryAndOptionalEmpty(true);
        console.log("Setting the flag ", isMandatoryAndOptionalEmpty);
      } else {
        console.log("Both `mandatory700` and `optional700` have data.");
        setIsMandatoryAndOptionalEmpty(false);
      }

      const allEmpty = Object.values(apiResonseData_Saver).every(
        (value) => Object.keys(value).length === 0
      );
      console.log("allEmpty:", allEmpty);

      if (allEmpty) {
        setIsEmptyResponse(true);
      } else {
        setIsEmptyResponse(false);
      }
    }
  }, [apiResonseData_Saver]);

  useEffect(() => {
    console.log(
      "the isMandatoryAndOptionalEmpty is updated :",
      isMandatoryAndOptionalEmpty
    );
  }, [isMandatoryAndOptionalEmpty]);

  useEffect(() => {
    console.log("isEmptyResponse has been updated:", isEmptyResponse);
  }, [isEmptyResponse]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("checking");

      if (token === null) {
        console.log("Checking");
        setIsLoggedIn(false);
        handleLogout();
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const isCall = async () => {
    try {
      console.log("entered the init");
      const iscall = "https://192.168.18.251:8003/initLC/";

      const response = await fetch(`${iscall}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Response from API LCINIT:", data);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsChecking(false);
    } catch (err) {
      setError(err);
    }
  };

  const [isComplete, setIsComplete] = useState(false);
  console.log("setActiveTab:", setActiveTab);
  console.log("ActiveTab:", activeTab);
  const [showOverlay, setShowOverlay] = useState(false);
  const handleComplete = (complete) => {
    setIsComplete(complete);

    if (complete) {
      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  };

  const Check = async () => {
    const url = "https://192.168.18.251:8003/initalizedCheck/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response Data for the Check :", data);
    } catch (error) {
      console.error("There was an error with the fetch operation:", error);
    }
  };

  const StartAgain = async () => {
    setIsChecking(true);
    await isCall();
    await Check();
    setStart_again(true);
    setApiList({});
    setApiCalled(false);
    setActiveFlag(false);
    setIsCompResult(false);
    setActiveFlag_1(false);
    setVerification(false);
    setFilesSaved([]);
    setApiResonseData_Saver({});
    setUpload_Results({});
    setDocuments_saver([]);
    setVerifyPage(false);
    setFlagsetter(false);
    setPayload_saver({});
    setFlag_progress(false);
    setPayload_carrier({});
    setDocument_verification([]);
    setSave_allinfo({})
    setState_allinfo(false)
    setUpload_Results({});
    setPayload_setter([]);
    setCount(0);
    setSkip(false);
    setMT700(null);
    console.log("cHECKER");
    setChecking(0);
  };

  const handleProceed = () => {
    // Switch to the verification tab
    console.log("setActiveTab:", setActiveTab);
    setActiveTab("verification");
    setShowOverlay(false);
    setVerification(true); // Hide the overlay
  };
  const NoOfMT707Amnds = apiResonseData_Saver.mt707.length;

  const [showmt701, setShowmt701] = useState(false);
  const [showmt707, setShowmt707] = useState(false);

  const [visibleDivsMT700, setVisibleDivsMT700] = useState(0);
  const [visibleDivsMT701, setVisibleDivsMT701] = useState(0);
  const [visibleDivsMT707, setVisibleDivsMT707] = useState(
    Array(NoOfMT707Amnds).fill(0)
  );

  const mt700MandField = apiResonseData_Saver.mandatory700.MandatoryField;
  const mt700MandFieldStatus =
    apiResonseData_Saver.mandatory700.MandatoryFieldStatus;
  const mt700MandFieldNames =
    apiResonseData_Saver.mandatory700.MandatoryFieldNames;

  const mt700OptField = apiResonseData_Saver.optional700.OptionalField;
  const mt700OptFieldStatus =
    apiResonseData_Saver.optional700.OptionalFieldStatus;
  const mt700OptFieldNames =
    apiResonseData_Saver.optional700.OptionalFieldNames;

  const mt701Field = apiResonseData_Saver.mt701.Field;
  const mt701FieldStatus = apiResonseData_Saver.mt701.FieldStatus;
  const mt701FieldNames = apiResonseData_Saver.mt701.FieldNames;
  const mt701MandField = apiResonseData_Saver.mt701.MFields;

  const NoOfMandFields = mt700MandFieldStatus?.length || 0;
  const NoOfOptFields = mt700OptFieldStatus?.length || 0;
  const totalFields = NoOfMandFields + NoOfOptFields;
  const NoOfMT701Fields = mt701FieldStatus?.length || 0;
  // const NoOfMT707Fields = apiResonseData_Saver.mt707[0].FieldNames.length;
  const NoOfMT707Fields = Array.isArray(apiResonseData_Saver.mt707)
    ? apiResonseData_Saver.mt707.map((item) => item.FieldStatus?.length || 0)
    : [0];

  // useEffect(() => {

  //     console.log(NoOfMT707Fields, visibleDivsMT707)
  // })

  let combinedStatus;
  let combinedFields;
  let combinedNames;

  if (NoOfMandFields > 0 && NoOfOptFields > 0) {
    combinedStatus = [...mt700MandFieldStatus, ...mt700OptFieldStatus];
    combinedFields = [...mt700MandField, ...mt700OptField];
    combinedNames = [...mt700MandFieldNames, ...mt700OptFieldNames];
  } else if (NoOfMandFields > 0 && !NoOfOptFields > 0) {
    combinedStatus = mt700MandFieldStatus;
    combinedFields = mt700MandField;
    combinedNames = mt700MandFieldNames;
  } else if (!NoOfMandFields > 0 && NoOfOptFields > 0) {
    combinedStatus = mt700OptFieldStatus;
    combinedFields = mt700OptField;
    combinedNames = mt700OptFieldNames;
  } else {
    combinedStatus = undefined;
    combinedFields = undefined;
    combinedNames = undefined;
  }

  const countMandErrors =
    mt700MandFieldStatus?.filter((status) => status !== "True")?.length || 0;
  const countOptErrors =
    mt700OptFieldStatus?.filter((status) => status !== "True")?.length || 0;
  const countMT701Errors =
    mt701FieldStatus?.filter((status) => status !== "True")?.length || 0;
  const countMT700Errors =
    combinedStatus?.filter((status) => status !== "True")?.length || 0;

  const MT707Statuses = Array.isArray(apiResonseData_Saver.mt707)
    ? apiResonseData_Saver.mt707.map((item) => item.FieldStatus)
    : [];

  const countMT707Errors = Array.isArray(MT707Statuses)
    ? MT707Statuses.map((statusArray) =>
        Array.isArray(statusArray)
          ? statusArray.filter((status) => status !== "True").length
          : 0
      )
    : [];

  useEffect(() => {
    if (!verification) {
      const interval = setInterval(() => {
        setVisibleDivsMT700((prev) => {
          if (prev < totalFields) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setShowmt701(true);
            return prev;
          }
        });
      }, 200);

      return () => clearInterval(interval);
    } else if (verification) {
      const interval = setInterval(() => {
        setVisibleDivsMT700((prev) => {
          if (prev < totalFields) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setShowmt701(true);
            return prev;
          }
        });
      });

      return () => clearInterval(interval);
    }
  }, [totalFields]);

  useEffect(() => {
    if (!verification) {
      const intervalMT701 = setInterval(() => {
        if (showmt701) {
          setVisibleDivsMT701((prev) => {
            if (prev < NoOfMT701Fields) {
              return prev + 1;
            } else {
              clearInterval(intervalMT701);
              setShowmt707(true);
              return prev;
            }
          });
        }
      }, 200);
      return () => clearInterval(intervalMT701);
    } else if (verification) {
      const intervalMT701 = setInterval(() => {
        if (showmt701) {
          setVisibleDivsMT701((prev) => {
            if (prev < NoOfMT701Fields) {
              return prev + 1;
            } else {
              clearInterval(intervalMT701);
              setShowmt707(true);
              return prev;
            }
          });
        }
      });
      return () => clearInterval(intervalMT701);
    }
  }, [NoOfMT701Fields, showmt701]);

  const [showmt707res, setShowmt707res] = useState(
    Array(NoOfMT707Fields.length + 1).fill(false)
  ); // Initialize showmt707res array

  const currentFieldIndexRef = useRef(0); // Use ref to track the current field index
  const [showLastMT707Amnd, setShowLastMT707Amnd] = useState(false);

  useEffect(() => {
    let interval;
    if (!verification) {
      if (showmt707) {
        interval = setInterval(() => {
          const currentFieldIndex = currentFieldIndexRef.current; // Access the latest index value
          if (currentFieldIndex < NoOfMT707Fields.length) {
            setVisibleDivsMT707((prev) => {
              if (
                prev[currentFieldIndex] < NoOfMT707Fields[currentFieldIndex]
              ) {
                // Set showmt707res for the current index to true when the field starts
                setShowmt707res((prevRess) => {
                  const updatedRes = [...prevRess];
                  if (!updatedRes[currentFieldIndex]) {
                    // Ensure it's only set true once
                    updatedRes[currentFieldIndex] = true;
                  }
                  return updatedRes;
                });

                const updated = [...prev];
                updated[currentFieldIndex] += 1;
                return updated;
              } else {
                // Move to the next field
                currentFieldIndexRef.current += 1; // Update the ref with the new index
                {
                  /* when last field ends currentFieldIndexRef.current===showmt707res.length-1 */
                }
                if (currentFieldIndexRef.current === showmt707res.length - 1) {
                  setShowLastMT707Amnd(true);
                }
                return prev;
              }
            });
          } else {
            clearInterval(interval); // Clear the interval when done
          }
        }, 300);
      }

      return () => {
        if (interval) {
          clearInterval(interval); // Cleanup function
        }
      };
    } else if (verification) {
      if (showmt707) {
        interval = setInterval(() => {
          const currentFieldIndex = currentFieldIndexRef.current; // Access the latest index value
          if (currentFieldIndex < NoOfMT707Fields.length) {
            setVisibleDivsMT707((prev) => {
              if (
                prev[currentFieldIndex] < NoOfMT707Fields[currentFieldIndex]
              ) {
                // Set showmt707res for the current index to true when the field starts
                setShowmt707res((prevRess) => {
                  const updatedRes = [...prevRess];
                  if (!updatedRes[currentFieldIndex]) {
                    // Ensure it's only set true once
                    updatedRes[currentFieldIndex] = true;
                  }
                  return updatedRes;
                });

                const updated = [...prev];
                updated[currentFieldIndex] += 1;
                return updated;
              } else {
                // Move to the next field
                currentFieldIndexRef.current += 1; // Update the ref with the new index
                {
                  /* when last field ends currentFieldIndexRef.current===showmt707res.length-1 */
                }
                if (currentFieldIndexRef.current === showmt707res.length - 1) {
                  setShowLastMT707Amnd(true);
                }
                return prev;
              }
            });
          } else {
            clearInterval(interval); // Clear the interval when done
          }
        });
      }

      return () => {
        if (interval) {
          clearInterval(interval); // Cleanup function
        }
      };
    }
  }, [NoOfMT707Fields, showmt707]);

  return (
    <div className="flex flex-col absolute w-[92%] h-[100%]   ">

      <div className="flex flex-col space-y-24 absolute w-[40%] h-full ">
      {state_allinfo && (
  <div className="inline-block absolute Laptops:ml-14 h-full w-full  Laptops_L:ml-12 4k:ml-5">
    <button
      onClick={() => setIsOpen1(!isOpen1)}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-600 transition duration-200 -ml-24"
    >
      <FaInfoCircle size={20} />
    </button>

    {isOpen1 && (
      <div className="absolute -ml-12 top-1 border border-gray-300 rounded-md bg-white h-[96%]  w-full  shadow-md p-3  overflow-auto z-50">
        <div className="flex justify-between items-center mb-2">
          <strong className="text-sm">Lc Info</strong>
          <FaTimes
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen1(false)}
          />
        </div>
        {save_allinfo.ALL_LC_INFO ? (
  <table className="min-w-full table-auto border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-500">
        <th className="py-2 px-4 border-r border-b text-left">Key</th>
        <th className="py-2 px-4 border-b text-left">Value</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(save_allinfo.ALL_LC_INFO).map(([key, value], index) => (
        <tr key={index}>
          <td className="py-2 px-4 border-r border-b">{key}</td>
          <td className="py-2 px-4 border-b">{value}</td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="text-gray-500">No information available</p>
)}

      </div>
    )}
  </div>
)}

{files_saved.length != 0 ? (
        <div className="inline-block relative Laptops:ml-14 Laptops_L:ml-12 4k:ml-5 ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-600 transition duration-200 -ml-24"
          >
            <FaFileAlt size={20} />
          </button>

          {isOpen && (
            <div className=" absolute -ml-12 top-1 border border-gray-300 rounded-md bg-white shadow-md p-3 w-40 z-50 transform transition ease-linear delay-1000  duration-1000 ">
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
  

    

      {isChecking && (
        <div className="fixed inset-0 bg-black opacity-80 flex items-center justify-center z-50">
          <h1 className="text-white text-lg font-bold">
            WAIT FOR A MOMENT, PREVIOUS PROCESS IS BEING TERMINATED
          </h1>
        </div>
      )}

      {isEmptyResponse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center  ">
            <h2 className="text-lg font-bold mb-4">NO LC FILE FOUND</h2>
            <p className="text-sm mb-4">Kindly upload the lc file</p>
            <button
              className="  h-9 w-40 font-bold  bg-white border border-gray-500 text-black text-sm  tracking-wide hover:scale-102"
              onClick={StartAgain}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {isMandatoryAndOptionalEmpty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center  ">
            <h2 className="text-lg font-bold mb-4">NO LC 700 FILE FOUND</h2>
            <p className="text-sm mb-4">Kindly upload the correct lc file</p>
            <button
              className="  h-9 w-40 font-bold  bg-white border border-gray-500 text-black text-sm  tracking-wide hover:scale-102"
              onClick={StartAgain}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* 1st Row */}

      <div className="flex w-[100%] h-[15%] border-b-[1px] border-[#959191] py-[60px]">
        <CompStatus
          onComplete={handleComplete}
          showmt700={totalFields > 0 ? showmt701 : null}
          showmt701={NoOfMT701Fields > 0 ? showmt707 : null}
          showmt707={NoOfMT707Amnds > 0 ? showLastMT707Amnd : null}
        />
      </div>

      {/* 2nd Row*/}
      <div className="relative flex w-[100%] h-[85%]  px-16">
        {/* 2nd Row 1st Column */}
        <div className="absolute top-8 w-[60%] h-[94%] overflow-y-auto box-border custom-shadow">
          {/* MT 700 */}
          {totalFields > 0 && (
            <div>
              <p className="text-center text-[20px] text-white bg-[#2B333E] font-semibold tracking-[0.67px] font-poppins py-2">
                MT 700 Issue of a Documentary Credit
              </p>
              <div className="flex flex-col w-[100%]">
                {combinedStatus?.map((status, index) => (
                  <div
                    key={index}
                    className={`comp-result-mt  pl-5 flex   ${
                      verification
                        ? "visible"
                        : count === 1
                        ? "visible"
                        : visibleDivsMT700 > index && count === 0
                        ? "visible"
                        : "invisible"
                    }
`}
                  >
                    <MTResults
                      type={"700"}
                      index={index}
                      FieldStatus={status}
                      Fields={combinedFields}
                      FieldNames={combinedNames}
                      NoOfMandFields={NoOfMandFields}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MT 701 */}
          {showmt701 && NoOfMT701Fields > 0 && (
            <div>
              <p className="text-center text-[20px] text-white bg-[#2B333E] font-semibold tracking-[0.67px] font-poppins py-2">
                MT 701 Continuation of Issue of a Documentary Credit
              </p>
              <div className="flex flex-col gap-[2.5%] w-[100%]">
                {mt701FieldStatus?.map((status, index) => (
                  <div
                    key={index}
                    className={`comp-result-mt pl-5 flex ${
                      verification
                        ? "visible"
                        : count === 1
                        ? "visible"
                        : visibleDivsMT701 > index && count === 0
                        ? "visible"
                        : "invisible"
                    }`}
                  >
                    <MTResults
                      type={"701"}
                      index={index}
                      FieldStatus={status}
                      Fields={mt701Field}
                      FieldNames={mt701FieldNames}
                      MFields={mt701MandField}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MT 707 */}
          {showmt707 && NoOfMT707Amnds > 0 && (
            <div>
              {apiResonseData_Saver?.mt707?.map((data, index1) => (
                <div>
                  {showmt707res[index1] && (
                    <div
                      key={index1}
                      className="flex bg-[#2B333E] justify-center w-[100%] gap-4"
                    >
                      <p className="text-center text-[20px] text-white  font-semibold tracking-[0.67px] font-poppins py-2">
                        MT 707 Amendment to a Documentary Credit
                      </p>
                      <p className="text-center text-[17px] text-white py-2.5">
                        {" "}
                        ( {data.message} )
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col w-[100%]">
                    {data.FieldStatus.map((status, index) => (
                      <div
                        key={index}
                        className={`flex pl-5 items-center comp-result-mt pt-[2px] ${
                          verification
                            ? "visible"
                            : count === 1
                            ? "visible"
                            : visibleDivsMT707[index1] > index && count === 0
                            ? "visible"
                            : "invisible"
                        }`}
                      >
                        <MTResults
                          type={"707"}
                          index1={index1}
                          index={index}
                          FieldStatus={status}
                          Fields={data.Field}
                          FieldNames={data.FieldNames}
                          MFields={data.MFields}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2nd Row 2nd Column */}

        <div className="absolute top-8 right-16 lg:right-9 w-[30%] border-t border-r Laptops:right-0 h-[94%] border-l-[1px] border-[#959191] flex flex-col">
          <p className="font-Montserrat text-[20px] font-[800] self-center  ">
            Stats
          </p>

          <div className=" custom-shadow border flex flex-col overflow-y-auto">
            {totalFields > 0 && (
              <div
                className={` ${
                  verification ? "" : count === 0 ? "animate-fadeIn" : ""
                }`}
              >
                <CompResStats
                  type={"mt700"}
                  Errors={countMT700Errors}
                  totalFields={totalFields}
                  loaded={showmt701}
                />
              </div>
            )}
            {NoOfMT701Fields > 0 && (
              <div
                className={`${
                  verification ? "" : count === 0 ? "animate-fadeIn" : ""
                }`}
              >
                <CompResStats
                  type={"mt701"}
                  Errors={countMT701Errors}
                  totalFields={NoOfMT701Fields}
                  loaded={showmt707}
                />
              </div>
            )}
            {NoOfMT707Amnds > 0 && (
              <div
                className={`relative ${
                  verification ? "" : count === 0 ? "animate-fadeIn" : ""
                }`}
              >
                <div className="flex flex-col ">
                  {apiResonseData_Saver.mt707.map((data, index) => (
                    <CompResStats
                      key={index}
                      type={"mt707"}
                      Errors={countMT707Errors[index]}
                      totalFields={NoOfMT707Fields[index]}
                      AmndNo={data.message}
                      loaded={
                        index === showmt707res.length - 2
                          ? showLastMT707Amnd
                          : showmt707res[index + 1]
                      }
                    /> //For last index show stats when last fields ends it results
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showOverlay && (
        <div className="bg-white p-8 w-full flex flex-row justify-center items-center">
          <div
            className="flex flex-row w-full justify-center items-center font-[900px] text-2xl tracking-wide"
            style={{ backgroundColor: "rgba(211, 211, 211, 0.28)" }}
          >
            <span>
              <button
                onClick={handleProceed}
                className="  h-9 w-40 ml-10 font-bold bg-white border border-gray-500 text-black text-sm tracking-wide hover:scale-102"
              >
                <p className="">Proceed ✓</p>
              </button>
            </span>

            <span>
              <button
                onClick={StartAgain}
                className="  h-9 w-40 font-bold ml-10 bg-white border border-gray-500 text-black text-sm  tracking-wide hover:scale-102"
              >
                <p className="hover:scale-105">Start Again</p>
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompResults;
