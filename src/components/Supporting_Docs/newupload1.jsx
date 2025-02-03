import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import axios from "axios";

const NewUpload = ({
  setIsCompResult,
  setApiResponseData,
  setToken,
  setIsLoggedIn,
  handleLogout,
  setDocuments,
  setFlag1,
}) => {
  const {
    token,
    setActiveFlag_1,
    Uplaod_Results,
    setUpload_Results,
    setDocuments_saver,
    documents_saver,
  } = useContext(UserContext);
  console.log("token", token);

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

  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [processedDocuments, setProcessedDocuments] = useState(0);
  const [totalmatch, setTotalMatch] = useState();

  const fetchDocuments = async () => {
    try {
      const response = await axios.post(
        "https://192.168.18.251:8010/GetRequiredDocumentsJson_Filed_46A/"
      );
      if (response.status === 200) {
        const data = response.data;
        if (data.points && Array.isArray(data.points)) {
          setDocuments(data.points);
          setDocuments_saver(data.points);

          console.log("Docuemnts with points: " + data.points);
          // setFileVerification(true)
          console.log("called ");
        } else {
          console.warn("No points found in response");
        }
      } else {
        console.error("API returned an unexpected status:", response.status);
      }

      console.log("Response: " + JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      setFlag(true);
      console.log("Setting the Flag");
    }
  }, [isLoaded]);

  useEffect(() => {
    console.log("calling the api");
    uploadFiles();
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
            // await new Promise(resolve => setTimeout(resolve, 500));

            response = await fetch(
              "https://192.168.18.251:8010/RequiredDocumentsVerificationResult/",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!response.ok) {
              throw new Error(
                `Fetching upload results failed with status: ${response.status}`
              );
            }

            data = await response.json();

            if (response.ok && data.message) {
              console.log("Current Verification Response:", data);
              setApiResponseData(data);

              const message = data.message;
              totalMatch = message.match(/Total Documents : (\d+)/);
              const processedMatch = message.match(/Processed : (\d+)/);

              if (totalMatch && processedMatch) {
                const total = parseInt(totalMatch[1], 10);
                const processed = parseInt(processedMatch[1], 10);

                setTotalDocuments(total);
                setProcessedDocuments(processed);

                if (processed >= total) {
                  console.log("All documents processed.");

                  // await new Promise(resolve => setTimeout(resolve, 500));
                  break;
                }
              }
            } else if (!data.message) {
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

              // await new Promise(resolve => setTimeout(resolve, 500));

              console.log("Final Upload Results:", data);
              setApiResponseData(data);
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

  const progress = totalDocuments
    ? (processedDocuments / totalDocuments) * 100
    : 0;

  return (
    <div>
      {loading ? (
        <div
          className={`flex flex-col justify-center items-center w-[110%] h-[550px] rounded-[12px] bg-white shadow-none -mt-8`}
        >
          <div className="mb-5 h-4 overflow-hidden rounded-full bg-gray-200 w-96">
            <div
              className="h-4 animate-pulse rounded-full bg-gradient-to-r transition delay-700 duration-300 ease-in-out ... from-green-500 to-blue-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div>{`Processed ${processedDocuments} out of ${totalDocuments} documents`}</div>
          {flag ? (
            <div className="text-lime-500 font-bold">TEXT EXTRACTED</div>
          ) : (
            <div className="text-red-400 font-bold">
              EXTRACTING TEXT USING OCR
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default NewUpload;
