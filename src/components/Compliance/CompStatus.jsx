import React from 'react';
import { useEffect } from 'react';
const CompStatus = ({ showmt700, showmt701, showmt707 , onComplete }) => {
    


 
    let mt700NA =false;
    let mt701NA =false;
    let mt707NA =false;

    if(showmt700===null)
        mt700NA=true
    if(showmt701===null)
        mt701NA=true
    if(showmt707===null)
        mt707NA=true

    let showmt701NA =false;
    let showmt707NA =false;
    let complete    =false;

    if (
        (mt700NA && mt701NA) ||
        (showmt700 && mt701NA)
    ) {
        showmt701NA = true;
    }
    

    if (
        (mt700NA && mt701NA &&   mt707NA) ||
        (mt700NA && showmt701 && mt707NA) ||
        (showmt700 && mt701NA && mt707NA) ||
        (showmt700 && showmt701 && mt707NA)
    ) {
        showmt707NA = true;
    }




    if (
        (mt700NA && mt701NA &&     (mt707NA ||showmt707)) ||
        (mt700NA && showmt701 &&   (mt707NA ||showmt707)) ||
        (showmt700 && mt701NA &&   (mt707NA ||showmt707)) ||
        (showmt700 && showmt701 && (mt707NA ||showmt707))
    ) {
        complete = true;
    }

    useEffect(() => {
      if (complete && onComplete) {
        onComplete(true);
      }
    }, [complete, onComplete]);

    return (
        <div className="flex self-center w-[80%]  mx-auto">
<div className="flex flex-col w-[20%]">
    <div className="flex flex-col self-center">
      <p className="self-center text-[14px]">Documents Upload</p>
      <p className="self-center animate-fadeIn text-[14px]">Successfull</p>
    </div>
    <div className="flex relative w-[100%]">
      <div className="w-9 h-9 rounded-full bg-[#2B333E] flex justify-center items-center" style={{ marginLeft: 'calc(50% - 18px)' }}>
        <span className="text-white text-s font-bold">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.723651 4.11841L5.22293 8.93635L13.3472 0.764983" stroke="white"/>
          </svg>
        </span>
      </div>
      <div className="absolute top-4 h-[2px] bg-[#2B333E]" style={{ width: 'calc(100% - 36px)', marginLeft: 'calc(50% + 18px)' }}></div>
    </div>
  </div>

  {/* Second Circle */}
  <div className="flex flex-col w-[20%]">
    <div className="flex flex-col self-center">
      <p className="self-center text-[14px]">Documents Verified</p>
      <p className="self-center animate-fadeIn text-[14px]">Successfull</p>
    </div>
    <div className="flex relative w-[100%]">
      <div className="w-9 h-9 rounded-full bg-[#2B333E] flex justify-center items-center" style={{ marginLeft: 'calc(50% - 18px)' }}>
        <span className="text-white text-s font-bold">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.723651 4.11841L5.22293 8.93635L13.3472 0.764983" stroke="white"/>
          </svg>
        </span>
      </div>
      <div className="absolute top-4 h-[2px] bg-[#2B333E]" style={{ width: 'calc(100% - 36px)', marginLeft: 'calc(50% + 18px)' }}></div>
    </div>
  </div>

  {/* Third Circle MT700 Compliance */}
  <div className="flex flex-col w-[20%]">
    <div className="flex flex-col self-center">
      <p className="self-center text-[14px]">MT700 Compliance</p>
      <p className="self-center animate-fadeIn text-[14px]">
        {mt700NA ? 'Not Available' : showmt700 ? 'Checked' : 'In-process'}
      </p>
    </div>
    <div className="relative w-[100%]">
      <div
        className={`w-9 h-9 rounded-full flex justify-center items-center ${
          mt700NA
            ? 'bg-[#ff0202] animate-fadeIn'
            : showmt700
            ? 'bg-[#2B333E] animate-fadeIn'
            : 'border-[1px] border-[#2B333E]'
        }`}
        style={{ marginLeft: 'calc(50% - 18px)' }}
      >
        {mt700NA ? (
          <span className="text-white text-s font-bold animate-fadeIn">
            <svg width="14" height="14" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.535156 1.00977L10.465 11.6429" stroke="white"/>
              <path d="M10.4541 1L0.54532 11.6527" stroke="white"/>
            </svg>
          </span>
        ) : showmt700 ? (
          <span className="text-white text-s font-bold animate-fadeIn">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.723651 4.11841L5.22293 8.93635L13.3472 0.764983" stroke="white"/>
            </svg>
          </span>
        ) : (
          <span className="w-2 h-2 bg-[#2B333E] rounded-full animate-fadeIn"></span>
        )}
      </div>
      <div className="absolute top-4 h-[2px] bg-[#2B333E]" style={{ width: 'calc(100% - 36px)', marginLeft: 'calc(50% + 18px)' }}></div>
    </div>
  </div>

  {/* Fourth Circle MT701 Compliance */}
  <div className="flex flex-col w-[20%]">
    <div className="flex flex-col self-center">
      <p className="self-center text-[14px]">MT701 Compliance</p>
      <p className="self-center animate-fadeIn text-[14px]">
        {showmt701NA
          ? 'Not Available'
          : showmt701
          ? 'Checked'
          : showmt700 || mt700NA
          ? 'In-process'
          : 'Pending'}
      </p>
    </div>
    <div className="relative h-[100%]">
      <div
        className={`w-9 h-9 rounded-full flex justify-center items-center ${
          showmt701NA
            ? 'bg-[#ff0202] animate-fadeIn'
            : showmt701
            ? 'bg-[#2B333E] animate-fadeIn'
            : 'border-[1px] border-[#2B333E]'
        }`}
        style={{ marginLeft: 'calc(50% - 18px)' }}
      >
        {showmt701NA ? (
          <span className="text-white text-s font-bold animate-fadeIn">
            <svg width="14" height="14" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.535156 1.00977L10.465 11.6429" stroke="white"/>
              <path d="M10.4541 1L0.54532 11.6527" stroke="white"/>
            </svg>
          </span>
        ) : showmt701 ? (
          <span className="text-white text-s font-bold animate-fadeIn">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.723651 4.11841L5.22293 8.93635L13.3472 0.764983" stroke="white"/>
            </svg>
          </span>
        ) : (
          <span className="w-2 h-2 bg-[#2B333E] rounded-full animate-fadeIn"></span>
        )}
      </div>
      <div className="absolute top-4 h-[2px] bg-[#2B333E]" style={{ width: 'calc(100% - 36px)', marginLeft: 'calc(50% + 18px)' }}></div>
    </div>
  </div>

  {/* Fifth Circle MT707 Compliance */}
  <div className="flex flex-col w-[20%]">
    <div className="flex flex-col self-center">
      <p className="self-center text-[14px]">MT707 Compliance</p>
      <p className="self-center animate-fadeIn text-[14px]">
        {showmt707NA
          ? 'Not Available'
          : showmt707
          ? 'Checked'
          : showmt701 || showmt701NA
          ? 'In-process'
          : 'Pending'}
      </p>
    </div>
    <div className="relative h-[100%]">
      <div
        className={`w-9 h-9 rounded-full flex justify-center items-center ${
          showmt707NA
            ? 'bg-[#ff0202] animate-fadeIn'
            : showmt707
            ? 'bg-[#2B333E] animate-fadeIn'
            : 'border-[1px] border-[#2B333E]'
        }`}
        style={{ marginLeft: 'calc(50% - 18px)' }}
      >
        {showmt707NA ? (
          <span className="text-white text-s font-bold animate-fadeIn">
            <svg width="14" height="14" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.535156 1.00977L10.465 11.6429" stroke="white"/>
              <path d="M10.4541 1L0.54532 11.6527" stroke="white"/>
            </svg>
          </span>
        ) : showmt707 ? (
          <span className="text-white text-s font-bold animate-fadeIn">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.723651 4.11841L5.22293 8.93635L13.3472 0.764983" stroke="white"/>
            </svg>
          </span>
        ) : (
          <span className="w-2 h-2 bg-[#2B333E] rounded-full animate-fadeIn"></span>
        )}
      </div>
      <div className="absolute top-4 h-[2px] bg-[#2B333E]" style={{ width: 'calc(100% - 36px)', marginLeft: 'calc(50% + 18px)' }}></div>
    </div>
  </div>
<div className="flex flex-col w-[20%]">
  
        <div className="flex flex-col self-center">
          <p className='self-center text-[14px]'>Compliance Process</p>
          <p className='self-center animate-fadeIn text-[14px]'>{complete ? 'Successfull' : 'Pending'}</p>
        </div>
    
        <div className="flex">
          <div className={`w-9 h-9 rounded-full flex justify-center items-center ${complete ? 'bg-[#2B333E] animate-fadeIn' : 'border-[1px] border-[#2B333E]'}`} style={{ marginLeft: 'calc(50% - 18px)' }}>
            {complete ? (
              <span className="text-white text-s font-bold animate-fadeIn">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.723651 4.11841L5.22293 8.93635L13.3472 0.764983" stroke="white"/>
                </svg>
              </span>
            ) : 
            
            <span className="text-white text-s font-bold animate-fadeIn">
             <svg width="14" height="14" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.535156 1.00977L10.465 11.6429" stroke="white"/>
                  <path d="M10.4541 1L0.54532 11.6527" stroke="white"/>
                </svg>
          </span>}
          </div>
        </div>
      </div>
        </div>
      );
    };
    
    export default CompStatus;

