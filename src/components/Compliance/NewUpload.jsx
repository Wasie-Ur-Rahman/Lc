import React, { useState, useEffect, useRef } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { FaFilePdf, FaFileImage } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import axios from "axios";
const NewUpload = ({
  setIsCompResult,
  setApiResponseData,
  setToken,
  setIsLoggedIn,
  handleLogout,
}) => {
  const {
    token,
    setApiResonseData_Saver,
    setActiveFlag,
    activeFlag,
    setFlagsetter,
    setCount,
    setSkip,
    skip,
    setApiList,
    setApiCalled,
    setActiveFlag_1,
    files_saved,
    setFilesSaved,
    setState_allinfo,
    setSave_allinfo,
    save_allinfo , state_allinfo 

    // verification , setVerification
  } = useContext(UserContext);
  const fileInputRef = useRef();
  const fileInputRef1 = useRef();
  const [disable_buttons, setDisable_buttons] = useState(false);
  const [isProceedDisabled, setIsProceedDisabled] = useState(false);
  const [hideSupportingButtons, setHideSupportingButtons] = useState(false);
  
  console.log("Checking the Sate all info" , state_allinfo)
  console.log("Checking the save all info", save_allinfo)

  const handleUploadAll = async () => {
    
    if (selectedFiles.length === 0 && selectedFiles1.length === 0) {
      console.error("No files to upload.");
      return;
    }

    const invalidFiles = [...selectedFiles, ...selectedFiles1].filter(
      (file) => !file.name.toLowerCase().endsWith(".pdf")
    );

    if (invalidFiles.length > 0) {
      console.error(
        "Only PDF files are allowed. Invalid files:",
        invalidFiles.map((file) => file.name)
      );
      setProceedHidden(false);
      alert("Please upload valid PDF files");
      // setProceedHidden(false)

      return;
    }

    console.log("Starting combined upload...");

    setDisable_buttons(true);
    setIsProceedDisabled(true);
    try {
      console.log("uploaded files check LC", selectedFiles);
      await uploadFiles(selectedFiles);

      console.log("Uploading the LC Docs");

      console.log("uploaded files check Supporting Files", selectedFiles1);

      // Check condition for selectedFiles1
      if (
        selectedFiles1.length === 0 ||
        selectedFiles1.every((file) => file.condition === true)
      ) {
        console.log("Skipping uploadFiles1 as condition is met.");
        // Perform additional actions if skipping
        setIsCompResult(true);
       
        setActiveFlag(true);
      } else {
        await uploadFiles1(selectedFiles1);
        setFilesSaved(selectedFiles1);
        console.log("Uploading the Supporting Docs");
      }
      setHideSupportingButtons(true);

      console.log("Both uploads completed.");
    } catch (error) {
      console.error("Error during combined upload:", error);
    }
  };

  useEffect(() => {
    // setState_allinfo(false)
    // setSave_allinfo({})
    setFlagsetter(false);
    // setVerification(false)
    console.log("Setting the flag false for upload");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token === null) {
        setIsLoggedIn(false);
        handleLogout();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [token, handleLogout, setIsLoggedIn]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFiles1, setSelectedFiles1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded1, setIsLoaded1] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadError1, setUploadError1] = useState("");
  const [uploadErrorCode, setUploadErrorCode] = useState("");
  const [uploadErrorText, setUploadErrorText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploading1, setUploading1] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [dragActive1, setDragActive1] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploading1, setIsUploading1] = useState(false);
  const [proceed_hidden, setProceedHidden] = useState(false);
  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   if (files.length > 0) {
  //     setSelectedFiles([...selectedFiles, ...files]);
  //     resetUploadState();
  //     setProceedHidden(true)
  //   }
  //   else
  //   {
  //     setProceedHidden(false)
  //   }
  // };

  // const handleFileChange = (event) => {
  //   const newFiles = Array.from(event.target.files);

  //   const existingFileNames = new Set(selectedFiles1.map(file => file.name));

  //   const uniqueFiles = newFiles.filter(
  //     (newFile) => !existingFileNames.has(newFile.name)
  //   );

  //   if (uniqueFiles.length > 0) {
  //     setSelectedFiles([...selectedFiles, ...uniqueFiles]);
  //     resetUploadState();
  //   } else {
  //     alert("Some files are already selected!");
  //   }
  // };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    const existingFileNames = new Set(selectedFiles.map((file) => file.name));

    const uniqueFiles = newFiles.filter(
      (newFile) => !existingFileNames.has(newFile.name)
    );

    if (uniqueFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...uniqueFiles]);
      resetUploadState();
      setProceedHidden(true);
    } else {
      alert("Some files are already selected!");
    }
  };

  const handleFileChange1 = (event) => {
    const newFiles = Array.from(event.target.files);

    const existingFileNames = new Set(selectedFiles1.map((file) => file.name));

    const uniqueFiles = newFiles.filter(
      (newFile) => !existingFileNames.has(newFile.name)
    );

    if (uniqueFiles.length > 0) {
      setSelectedFiles1([...selectedFiles1, ...uniqueFiles]);
      resetUploadState1();
    } else {
      alert("Some files are already selected!");
    }
  };

  const handleDragOver1 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive1(true);
  };

  const handleDragLeave1 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive1(false);
  };

  const handleDrop1 = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive1(false);

    const newFiles = Array.from(event.dataTransfer.files);

    const existingFileNames = new Set(selectedFiles1.map((file) => file.name));

    const uniqueFiles = newFiles.filter(
      (newFile) => !existingFileNames.has(newFile.name)
    );

    if (uniqueFiles.length > 0) {
      setSelectedFiles1([...selectedFiles1, ...uniqueFiles]);
      resetUploadState1();
    } else {
      alert("Some files are already selected!");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const newFiles = Array.from(event.dataTransfer.files);

    const existingFileNames = new Set(selectedFiles.map((file) => file.name));

    const uniqueFiles = newFiles.filter(
      (newFile) => !existingFileNames.has(newFile.name)
    );

    if (uniqueFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...uniqueFiles]);
      resetUploadState();
    } else {
      alert("Some files are already selected!");
    }
  };

  const resetUploadState = () => {
    setLoading(false);
    setIsLoaded(false);
    setUploading(false);
    setUploadError("");
  };

  const resetUploadState1 = () => {
    setLoading1(false);
    setIsLoaded1(false);
    setUploading1(false);
    setUploadError1("");
  };

  const cancelSelection = () => {
    setSelectedFiles([]);
    resetUploadState();

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setProceedHidden(false);
    }
  };

  const cancelSelection1 = () => {
    setSelectedFiles1([]);
    resetUploadState1();
    if (fileInputRef1.current) {
      fileInputRef1.current.value = "";
    }
  };

  const apiUrlAllUpload = `http://127.0.0.1:8003/upload_All_LC_MAIN_DOCS`;
  const apiSupportingFile = `http://127.0.0.1:8003/upload_All_LC_SUPPORTING_DOCS`;
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

      const data = await response.json();
      console.log("Response from API LCINIT:", data);
    } catch (err) {
      setError(err);
    }
  };

  const Check = async () => {
    const url = "http://127.0.0.1:8003/initalizedCheck/";

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

  const uploadFiles = async (files) => {
    await isCall();
    await Check();
    setActiveFlag_1(false);
    console.log("Is calling the in it function");
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    setLoading(true);
    setUploading(true);
    setIsUploading(true);

    try {
      const response = await fetch(`${apiUrlAllUpload}/`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(
        "Response for the api url all upload that has been recently updated tha this :",
        response
      );
      if (response.ok) {
        const result = await response.json();
        const responseData = {
          mt701: result["701"] || {},
          mt707: result["707"] || [],
          mandatory700: result["Mandatory700"] || {},
          optional700: result["Optional700"] || {},
          msg700: result["msg700"] || {},
          msg701: result["msg701"] || {},
          msg707: result["msg707"] || {},
        };

        setApiResponseData(responseData);
        setApiResonseData_Saver(responseData);
        setLoading(false);
        setIsLoaded(true);
        setSkip(false);
        // setVerification(true)
        setCount(0);
        // setIsCompResult(true);
        // setActiveFlag(true);
        setUploading(false);
        setUploadError("");
      } else {
        setUploadError("Upload failed:");
        setUploadErrorCode(response.status);
        setUploadErrorText(response.statusText);
        setLoading(false);
        setUploading(false);
        if (response.status === 401) {
          setTimeout(() => {
            setIsLoggedIn(false);
            handleLogout();
          }, 2000);
        }
      }
    } catch (error) {
      setUploadError("An error occurred. Please try again.");
      setLoading(false);
      setUploading(false);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFiles1 = async (files) => {
    // isCall();
    // console.log("Is calling the in it function")
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    setLoading1(true);
    setUploading1(true);
    setIsUploading1(true);

    try {
      const response = await fetch(`${apiSupportingFile}/`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(
        "Response for the api url all upload that has been recently updated tha this :",
        response
      );
      if (response.ok) {
        setApiCalled(true);
        const result = await response.json();
        console.log("Uploading response", result);

        setLoading1(false);
        setIsLoaded1(true);
        setSkip(false);
        // setVerification(true)
        setCount(0);
        setIsCompResult(true);
        setActiveFlag(true);
        setUploading1(false);
        setUploadError1("");
      } else {
        setUploadError1("Upload failed:");
        // setUploadErrorCode(response.status);
        // setUploadErrorText(response.statusText);
        setLoading1(false);
        setIsUploading1(false);
        if (response.status === 401) {
          setTimeout(() => {
            setIsLoggedIn(false);
            handleLogout();
          }, 2000);
        }
      }
    } catch (error) {
      setUploadError1("An error occurred. Please try again.");
      setLoading1(false);
      setUploading1(false);
    } finally {
      setIsUploading1(false);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) {
      return <FaFilePdf className="text-red-600 text-[140%]" />;
    } else if (fileType.includes("image")) {
      return <FaFileImage className="text-blue-600 text-[140%]" />;
    } else {
      return null;
    }
  };

  const formatFileSize = (size) => {
    const units = ["B", "KB", "MB"];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(2)} ${units[i]}`;
  };

  return (
    <div
      className={`flex flex-row justify-center   Laptops:mt-5 4k:-mt-8 -mt-16 items-center w-[200%] 4k:h-[500px]  Laptops     Laptops:w-[220%] h-[400px] Laptops L:h-[200px] rounded-[12px]   shadow-none space-x-32`}
    >
      <div className="h-full w-full  space-y-2">
        <p className="font-bold text-2xl justify-center items-center flex  Laptops:text-lg ">
          LC FILES
        </p>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col border-2 border-dashed ${
            dragActive ? "border-blue-500" : "border-gray-400"
          } rounded-lg px-2 py-4 text-center w-[90%] mx-auto mb-[2%] flex flex-col ${
            loading || isLoaded ? "justify-between" : "justify-center"
          } ${
            selectedFiles.length > 0
              ? "h-[94%] mt-5  Laptops:h-[80%]   Laptops:mt-5  4k:h-5/6"
              : " 4k:h-5/6  h-[94%]  Laptops:h-[80%]   Laptops:mt-6  "
          }`}
        >
          <div className="flex flex-col mx-auto gap-1">
            <SlCloudUpload className="self-center text-[80px] Laptops:text-[60px] " />
            <p className="text-black font-inconsolata font-[900] text-xl Laptops:text-lg ">
              Select files or drag and drop here
            </p>
            <p className="text-[#000000] opacity-[40%] font-inconsolata font-[600] text-xl Laptops:text-lg ">
              Only <span className="text-red-500 ">PDF</span> files are
              supported
            </p>
            <input
              type="file"
              className="hidden"
              id="fileInput"
              accept=".pdf"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className="w-[50%] px-[6px] py-1 mt-[4%] self-center cursor-pointer text-[#3070AB] border-[1px] border-[#3070AB] rounded-md Laptops:w-32 Laptops:h-8"
            >
              Select Files
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className="w-[95%] max-h-[300px] overflow-y-auto mt-1 4k:mt-1  Laptops:mt-1">
              {selectedFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between mb-[0px] 4k:mb-[20px] Laptops:mb-0"
                >
                  <div className="flex items-center gap-2 h-7 px-10">
                    {getFileIcon(file.type)}
                    <span className="text-[13px]">{file.name}</span>
                  </div>
                  <span className="text-[13px]">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
              ))}
            </div>
          )}

          {uploadError && !uploading && (
            <p className="mt-2 text-[18px]">
              {uploadErrorCode} {uploadErrorText}
            </p>
          )}

          {uploading && (
            <div className="flex flex-row h-20 justify-center items-start">
              <p className="text-blue-600 text-[20px] animate-pulse font-bold">
                Uploading<span className="dot1">.</span>
                <span className="dot2">.</span>
                <span className="dot3">.</span>
              </p>
            </div>
          )}

          <div className="flex w-[100%] h-[52px] py-4   justify-center gap-3  ">
            {selectedFiles.length > 0 && (
              <button
                onClick={() => fileInputRef.current.click()}
                disabled={isUploading}
                className={`border w-40 h-12 px-2 py-1 my-auto rounded-md text-black font-semibold Laptops:h-10  4k:w-[169px] Laptops_L:w-[169px]   Laptops:w-32 border-gray-500 ${
                  isUploading ? "opacity-50 cursor-not-allowed hidden" : ""
                }
            ${isLoaded ? " hidden" : ""}
            `}
              >
                Add Files
              </button>
            )}

            <button
              onClick={cancelSelection}
              disabled={isUploading}
              className={`border flex justify-center w-40 items-center h-12  Laptops:h-10  Laptops:w-32 Laptops:ml-0  Laptops_L:ml-0 Laptops_L:w-[169px] ml-4 4k:ml-0 4k:w-[169px]  py-1 rounded-md text-black font-semibold border-gray-500    ${
                isUploading ? "opacity-50 cursor-not-allowed hidden" : ""
              } 
              ${isLoaded ? " hidden" : ""} `}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="h-full w-full space-y-2">
        <p className="font-bold text-2xl justify-center items-center flex Laptops:text-lg">
          SUPPORTING FILES
        </p>
        <div
          onDragOver={handleDragOver1}
          onDragLeave={handleDragLeave1}
          onDrop={handleDrop1}
          className={`border-2 border-dashed ${
            dragActive1 ? "border-blue-500" : "border-gray-400"
          } rounded-lg px-2 py-4 text-center w-[90%] mx-auto mb-[2%] flex flex-col ${
            loading1 || isLoaded1 ? "justify-between" : "justify-center"
          } ${
            selectedFiles1.length > 0
              ? "h-[94%] mt-5  Laptops:h-[80%]   Laptops:mt-5  4k:h-5/6"
              : " 4k:h-5/6  h-[94%]  Laptops:h-[80%]   Laptops:mt-6  "
          }`}
        >
          <div className="flex flex-col mx-auto gap-1">
            <SlCloudUpload className="self-center text-[80px] Laptops:text-[60px]" />
            <p className="text-black font-inconsolata font-[900] text-xl Laptops:text-lg">
              Select files or drag and drop here
            </p>
            <p className="text-[#000000] opacity-[40%] font-inconsolata font-[600] text-xl Laptops:text-lg">
              Only <span className="text-red-500 ">PDF</span> files are
              supported
            </p>
            <input
              type="file"
              className="hidden"
              id="fileInput1"
              accept=".pdf"
              multiple
              ref={fileInputRef1}
              onChange={handleFileChange1}
            />
            <label
              htmlFor="fileInput1"
              className="w-[50%] px-[6px] py-1 mt-[4%] self-center cursor-pointer text-[#3070AB] border-[1px] border-[#3070AB] rounded-md Laptops:w-32 Laptops:h-8"
            >
              Select Files
            </label>
          </div>

          {selectedFiles1.length > 0 && (
            <div className="w-[95%] max-h-[300px] overflow-y-auto mt-1 4k:mt-1  Laptops:mt-1 ">
              {selectedFiles1.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between mb-[0px] 4k:mb-[20px] Laptops:mb-0"
                >
                  <div className="flex items-center gap-2 h-7 px-10">
                    {getFileIcon(file.type)}
                    <span className="text-[13px]">{file.name}</span>
                  </div>
                  <span className="text-[13px]">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
              ))}
            </div>
          )}

          {uploading1 && (
            <div className="flex flex-row h-20 justify-center items-start">
              <p className="text-blue-600 text-[20px] animate-pulse font-bold">
                Uploading<span className="dot1">.</span>
                <span className="dot2">.</span>
                <span className="dot3">.</span>
              </p>
            </div>
          )}

          <div className="flex w-[100%] h-[52px] py-4   justify-center gap-3 ">
            {!disable_buttons && (
              <>
                {selectedFiles1.length > 0 && (
                  <button
                    onClick={() => fileInputRef1.current.click()}
                    disabled={isUploading1}
                    className={`border w-40 h-12 px-2 py-1 my-auto rounded-md text-black font-semibold Laptops:h-10  4k:w-[169px] Laptops_L:w-[169px]   Laptops:w-32 border-gray-500 ${
                      isUploading1 ? "opacity-50 cursor-not-allowed hidden" : ""
                    }`}
                  >
                    Add Files
                  </button>
                )}
                <button
                  onClick={cancelSelection1}
                  className={`border flex justify-center w-40 items-center h-12  Laptops:h-10  Laptops:w-32 Laptops:ml-0  Laptops_L:ml-0 Laptops_L:w-[169px] ml-4 4k:ml-0 4k:w-[169px]  py-1 rounded-md text-black font-semibold border-gray-500 ${
                    isUploading1 ? "opacity-50 cursor-not-allowed hidden" : ""
                  }`}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="h-20 flex flex-row items-end ">
          <button
            onClick={handleUploadAll}
            disabled={isProceedDisabled || selectedFiles.length === 0}
            className={`border w-40 h-12  rounded-md -mx-36   Laptops:h-10  font-bold bg-white  border-gray-500 text-black text-sm tracking-wide hover:scale-102 ${
              isProceedDisabled || selectedFiles.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
  
  ${proceed_hidden ? "visible" : "hidden"}
  `}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUpload;
