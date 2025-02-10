import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext/UserContext";
import axios from "axios";

const Process_Completed = ({ Payloader }) => {
  const [flag, setFlag] = useState(false); // initially not loading

  const { token, skip } = useContext(UserContext);
  console.log("token", token);

  const handleProceedClick1 = async () => {
    try {
      // Set flag to true to show the loading spinner
      setFlag(true);

      console.log("Payloader ", Payloader);

      const response = await axios.post(
        "https://192.168.18.251:8003/proceedToReportGeneration/",
        Payloader,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        }
      );

      console.log("Response ", response);

      if (response.status === 200) {
        // Generate PDF and show it in a new window
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);

        console.log("Response from proceedToReportGeneration:", response.data);
      }

      // Set flag back to false after the process is complete
      setFlag(false);
    } catch (error) {
      console.error("Error while proceeding to report generation:", error);

      // In case of an error, stop showing the loading spinner
      setFlag(false);
    }
  };

  const handleProceedClick_pdf = async () => {
    try {
      setFlag(true);

      const response = await axios.post(
        "https://192.168.18.251:8003/proceedToReportGeneration_NoAditionalDocs/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          responseType: "blob", // Expecting a file as a response
        }
      );

      if (response.status === 200) {
        console.log("Response: ", response);

        // setFinalPage1(false);
        // setFinalpage(true);

        // Convert response to a Blob
        console.log("Response of the pdf", response.data);
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });

        // Create a URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tabs
        window.open(pdfUrl);
      }
      setFlag(false);
    } catch (error) {
      console.error("Error while proceeding to report generation:", error);

      if (error.response) {
        console.error("Response error status:", error.response.status);
        console.error("Response error data:", error.response.data);
      }
      setFlag(false);
    }
  };

  useEffect(() => {
    console.log("Flag state updated:", flag);
  }, [flag]);

  return (
    <div>
      {!flag && !skip ? (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col  bg-[#69717D] w-screen h-48 justify-center items-center text-3xl space-y-5 text-white">
            <p>ALL SUBMITTED DOCUMENTS HAVE BEEN PROCESSED</p>
            <p>FOR COMPLIANCE CHECKS AND VERIFICATION.</p>
            <button
              className="hover:scale-110 text-black font-bold hover:text-gray-800"
              onClick={handleProceedClick1}
            >
              CLICK TO VIEW REPORT
            </button>
          </div>
        </div>
      ) : skip && !flag ? (
        <div className="flex justify-center items-center h-full">
          <div className="flex flex-col w-screen bg-[#69717D] h-48 justify-center items-center text-3xl space-y-5 text-white">
            <p>ALL SUBMITTED DOCUMENTS HAVE BEEN PROCESSED</p>
            <p>FOR COMPLIANCE CHECKS AND VERIFICATION.</p>
            <button
              className="hover:scale-110 text-black font-bold hover:text-gray-800"
              onClick={handleProceedClick_pdf}
            >
              CLICK TO VIEW REPORT
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default Process_Completed;
