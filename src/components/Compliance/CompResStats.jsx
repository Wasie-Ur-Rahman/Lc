import React from 'react';

const CompResStats = ({ type, Errors, totalFields, AmndNo, loaded }) => {

  return (
    <div className={`relative bg-white custom-shadow w-[100%] h-[140px] mx-auto`}>
      
      <div className='flex h-[35px] bg-[#2B333E] pl-4 items-center gap-2'>
        <p className='text-[14px] text-white font-extrabold font-poppins'>
          {(type==='mt707') ? `MT-707 :` : (type==='mt701') ? 'MT-701 :' : 'MT-700 :'}
        </p>
        <p className='text-white text-[14px] font-poppins'>{AmndNo}</p>
      </div>

      <div className={`w-[100%] h-[105px] rounded-xl grid grid-rows-3 grid-cols-1 gap-y-0 gap-x-0`}>
        
        {/* First Column */}
        <div className='relative flex h-[35px]'>
          <div className={`w-[100%] border-[##DADADA] border-[1px] flex justify-between items-center`}>
            <p className={`text-[#2F2F2F] text-[14px] font-Montserrat font-[500] pl-4`}>Total Fields</p>
            <p className={`text-[#2F2F2F] text-[14px] font-Montserrat font-[700] pr-4 animate-fadeIn`}>
              {loaded ? totalFields : <div className="spinner"></div>}
            </p>
          </div>
        </div>

        {/* Second Column */}
        <div className='relative flex h-[35px]'>
          <div className={`w-[100%] border-[##DADADA] border-[1px] flex justify-between items-center`}>
            <p className={`text-[#2F2F2F] text-[14px] font-Montserrat font-[500] pl-4`}>Compliant Fields</p>
            <p className={`text-[#2F2F2F] text-[14px] font-Montserrat font-[700] pr-4 animate-fadeIn`}>
              {loaded ? (totalFields - Errors) : <div className="spinner"></div>}
            </p>
          </div>
        </div>

        {/* Third Column */}
        <div className='relative flex h-[35px]'>
          <div className={`w-[100%] border-[##DADADA] border-[1px] flex justify-between items-center`}>
            <p className={`text-[#2F2F2F] text-[14px] font-Montserrat font-[500] pl-4`}>Non-Compliant Fields</p>
            <p className={`text-[#2F2F2F] text-[14px] font-Montserrat font-[700] pr-4 animate-fadeIn`}>
              {loaded ? Errors : <div className="spinner"></div>}
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};

export default CompResStats;
