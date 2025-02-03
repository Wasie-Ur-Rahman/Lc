import React, { useState } from 'react';

const MTResults = ({type, index1, index, Fields, FieldNames, FieldStatus, MFields, NoOfMandFields}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex h-[100%] gap-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img className='h-[30px] mt-[7px]' src={`/${FieldStatus === "True" ? "tick" : "cross"}.png`} alt={FieldStatus} />

            <div className='flex flex-col w-[100%]'>
                <div className='flex h-[100%] items-center'>
                    <p className={`font-Montserrat font-[600] text-[17px] w-[5%]`}>
                        {(type !== '700') ? (MFields[index] === Fields[index]) ? 'M' : 'O' : index < NoOfMandFields ? 'M' : 'O'}
                    </p>
                    <p className={`font-Montserrat font-[600] text-[17px] w-[9%]`}>{Fields[index]}</p>
                    <p className={`font-Montserrat font-[600] text-[17px] leading-5`}>{FieldNames[index]}</p>
                </div>

                {(isHovered && !(FieldStatus === "True" || FieldStatus === "False")) && (
                    <div className="w-[75%] ml-[14%]">
                        <p className='text-red-600 text-[12px] font-semibold opacity-[70%]'>{FieldStatus}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MTResults;
