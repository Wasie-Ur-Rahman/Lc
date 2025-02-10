import React, { useState, useEffect } from "react";

const Overlay = ({ files, onClose, onFileSelect }) => {
  const [fileList, setFileList] = useState(files);

  useEffect(() => {
    // Update fileList whenever files prop changes
    setFileList(files);
  }, [files]);

  const cleanText = (text) =>
    text === null ? "No file selected" : text.split(".")[0];

  const handleAddFile = () => {
    // Prompt user for file name
    const fileName = prompt("Enter the file name to add:");

    if (fileName !== null) {
      setFileList((prevList) => {
        // Check if the file name already exists to avoid duplicates
        if (prevList.includes(fileName)) {
          alert("File already exists.");
          return prevList;
        }

        // Notify parent component about the new file
        onFileSelect(fileName);

        // Return the updated list with the new file included
        return [...prevList, fileName];
      });
    }
  };

  return (
    <div className="fixed inset-0 w-[100%] bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-[850px] relative h-[340px]">
        <p className="font-[700] text-2xl">Add Files</p>

        {/* SVG Close Button */}
        <button className="absolute top-2 right-2 p-1" onClick={onClose}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1967 22.9175L6.59029 8.74513L8.6961 6.57484L23.3025 20.7472L21.1967 22.9175ZM8.70982 23.2416L6.67733 21.2695L21.2174 6.28418L23.2499 8.25629L8.70982 23.2416Z"
              fill="#6A6A6A"
            />
          </svg>
        </button>

        {/* List of files as buttons */}
        <div className="mt-4 grid grid-cols-3 gap-4 overflow-y-auto max-h-[200px]">
          {fileList.length > 0 ? (
            fileList.map((fileName, index) => (
              <button
                key={index}
                className="relative flex flex-row rounded-full h-[46px] bg-white border border-[#2B333E] justify-center items-center mb-2 font-[400] text-xs"
                onClick={() => {
                  // Notify parent component about file selection
                  onFileSelect(fileName);
                }}
              >
                <p className="text-center">{cleanText(fileName)}</p>
                <p className="absolute right-4 font-[1000]">+</p>
              </button>
            ))
          ) : (
            <p>No files available.</p>
          )}
        </div>

        {/* Add Button */}
        <button
          className="absolute bottom-2 right-4 p-2 w-20 bg-blue-500 text-white rounded-full"
          onClick={handleAddFile}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Overlay;
