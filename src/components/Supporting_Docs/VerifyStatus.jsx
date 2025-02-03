import React, { useState, useEffect } from "react";

const VerifyStatus = ({
  uploaded,
  verified,
  processed,
  FirstName,
  SecondName,
  ThirdName,
}) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  // Set the states based on the props when they change
  useEffect(() => {
    setIsUploaded(uploaded);
    setIsVerified(verified);
    setIsProcessed(processed);
  }, [uploaded, verified, processed]);

  const isComplete = isUploaded && isVerified && isProcessed;

  return (
    <div className="flex self-center w-[100%] mx-auto flex-row justify-center">
      {/* Upload Step */}
      <div className="flex flex-col w-[20%]">
        <div className="flex flex-col self-center">
          <p className="self-center text-[14px]">{FirstName}</p>
          <p className="self-center animate-fadeIn text-[14px]">
            {isUploaded ? "Successful" : "Pending"}
          </p>
        </div>
        <div className="flex relative w-[100%]">
          <div
            className={`w-9 h-9 rounded-full flex justify-center items-center ${
              isUploaded ? "bg-[#2B333E] animate-fadeIn" : "bg-[#929292]"
            }`}
            style={{ marginLeft: "calc(50% - 18px)" }}
          >
            <span className="text-white text-s font-bold">
              {isUploaded ? (
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.723651 4.11841L5.22293 8.93635L13.3472 0.764983"
                    stroke="white"
                  />
                </svg>
              ) : (
                <p className="w-2 h-2 bg-[#000000] rounded-full"></p>
              )}
            </span>
          </div>
          <div
            className={`absolute top-4 h-[2px] ${
              isUploaded ? "bg-[#2B333E]" : "bg-[#929292]"
            }`}
            style={{
              width: "calc(100% - 36px)",
              marginLeft: "calc(50% + 18px)",
            }}
          ></div>
        </div>
      </div>

      {/* Verification Step */}
      <div className="flex flex-col w-[20%]">
        <div className="flex flex-col self-center">
          <p className="self-center text-[14px]">{SecondName}</p>
          <p className="self-center animate-fadeIn text-[14px]">
            {isVerified ? "Successful" : "Pending"}
          </p>
        </div>
        <div className="flex relative w-[100%]">
          <div
            className={`w-9 h-9 rounded-full flex justify-center items-center ${
              isVerified
                ? "bg-[#2B333E] animate-fadeIn"
                : isUploaded
                ? "border-[1px] border-[#2B333E] flex justify-center items-center"
                : "border-[1px] border-[#929292] flex justify-center items-center"
            }`}
            style={{ marginLeft: "calc(50% - 18px)" }}
          >
            <span className="text-white text-s font-bold">
              {isVerified ? (
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.723651 4.11841L5.22293 8.93635L13.3472 0.764983"
                    stroke="white"
                  />
                </svg>
              ) : (
                <p className="w-2 h-2 bg-[#000000] rounded-full"></p>
              )}
            </span>
          </div>
          <div
            className={`absolute top-4 h-[2px] ${
              isVerified ? "bg-[#2B333E]" : "bg-[#929292]"
            }`}
            style={{
              width: "calc(100% - 36px)",
              marginLeft: "calc(50% + 18px)",
            }}
          ></div>
        </div>
      </div>

      {/* Processing Step */}
      <div className="flex flex-col w-[20%]">
        <div className="flex flex-col self-center">
          <p className="self-center text-[14px]">{ThirdName}</p>
          <p className="self-center animate-fadeIn text-[14px]">
            {isProcessed ? "Successful" : "Pending"}
          </p>
        </div>
        <div className="flex relative w-[100%]">
          <div
            className={`w-9 h-9 rounded-full flex justify-center items-center ${
              isProcessed
                ? "bg-[#2B333E] animate-fadeIn"
                : isVerified
                ? "border-[1px] border-[#2B333E] flex justify-center items-center"
                : "border-[1px] border-[#929292] flex justify-center items-center"
            }`}
            style={{ marginLeft: "calc(50% - 18px)" }}
          >
            <span className="text-white text-s font-bold">
              {isProcessed ? (
                <svg
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.723651 4.11841L5.22293 8.93635L13.3472 0.764983"
                    stroke="white"
                  />
                </svg>
              ) : (
                <p className="w-2 h-2 bg-[#000000] rounded-full"></p>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyStatus;
