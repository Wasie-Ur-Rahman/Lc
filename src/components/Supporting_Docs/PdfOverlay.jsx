import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const PdfOverlay = ({ url, onClose, onAccept, onReject }) => {
  console.log("Url", url);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleAccept = () => {
    onAccept(); // Notify parent about acceptance
    closeOverlay(); // Close the overlay
  };

  const handleReject = () => {
    onReject(); // Notify parent about rejection
    closeOverlay(); // Close the overlay
  };

  const closeOverlay = () => {
    onClose(); // Ensure the overlay closes
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    // Clean up the URL object when the component unmounts
    return () => {
      if (url) {
        window.URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex flex-row justify-end  bg-space-x-4">
          {url ? (
            <button
              className="px-4 py-2 rounded-badge text-gray-800 z-50 bg-slate-200"
              onClick={handleReject}
            >
              ✘
            </button>
          ) : (
            <div className="flex flex-row w-full items-center ml-[60px] ">
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          )}
        </div>
        {/* PDF Document */}
        <div className="pdf-container mb-6">
          <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfOverlay;
