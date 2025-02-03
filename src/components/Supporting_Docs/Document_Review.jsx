

export default function Document_Review() {
  return (

    <div className="flex h- [100%] w-[100%] justify-center items-center">
    <div className="h-20 w-[390px] bg-[#2b333e] flex flex-col items-center tracking-widest ">
     <p className=" flex flex-row w-full justify-center items-center text-white text-base font-[500]">DOCUMENT REVIEW</p>
    <hr className="w-[95%] flex flex-row   "/>
   
      
      <div  className="text-white">
        Approve <span className="text-[#1eb953] font-extrabold">(✓)</span> or Reject <span className="text-[#C80000] font-extrabold">(✕)</span> after manual<br/> <span className="flex flex-row w-full items-center justify-center">inspection.</span></div>
        </div>

    </div>
  );
}
