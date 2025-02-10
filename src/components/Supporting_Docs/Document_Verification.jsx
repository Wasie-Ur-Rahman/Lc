import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Document_Verification = ({}) => {
  return (
    <div>
      <div className="flex justify-center items-center h-full ">
        <div className="flex flex-col w-[700px]  h-28 border border-[#959191] justify-center items-center text-xl font-[800] space-y-5 tracking-widest text-black ">
          <p className="text-[#30C371]  ">
            User Assisted{" "}
            <span className="text-black">document verification</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Document_Verification;
