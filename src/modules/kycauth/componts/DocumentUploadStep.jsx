import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera, FaUpload, FaUser, FaBuilding, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  setUserType,
  setDocument,
  setDocumentPreview,
  removeDocument,
} from "../../lib/slice/KycSlice"

const FileUpload = ({ label, iconName, onFileChange, previewUrl, onRemove }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  const IconComponent = ({ name }) => {
    switch (name) {
      case 'camera': return <FaCamera className="w-5 h-5" />;
      case 'upload': return <FaUpload className="w-5 h-5" />;
      case 'user': return <FaUser className="w-5 h-5" />;
      case 'building': return <FaBuilding className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="bg-gray-200 border border-gray-400 hover:border-gray-600 transition-colors duration-300 rounded-lg overflow-hidden relative">
      <div className="p-4 border-b border-gray-400 flex items-center gap-2 text-black">
        <IconComponent name={iconName} />
        <span className="text-sm">{label}</span>
        {previewUrl && (
          <button
            className="absolute top-2 right-2 text-gray-900 hover:text-gray-100 transition-colors duration-300"
            onClick={onRemove}
          >
            <FaTimes className="w-4 h-4" />
          </button>
        )}
      </div>
      <div
        className="relative flex items-center justify-center border-2 border-gray-400 border-dashed p-4 h-48 cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-full max-w-full object-contain rounded"
          />
        ) : (
          <div className="text-center text-gray-400">
            <p>Drag & drop or click to upload</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
    </div>
  );
};

const DocumentUploadStep = () => {
  const dispatch = useDispatch();
  const { userType, documents, previews } = useSelector((state) => state.kyc);
  const [errors, setErrors] = useState({});
  const videoRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);

  const handleFileChange = useCallback(
    (docType) => (file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const preview = reader.result;
        dispatch(setDocumentPreview({ docType, preview }));
      };
      reader.readAsDataURL(file);
      dispatch(setDocument({ docType, file }));
    },
    [dispatch]
  );

  const handleRemoveFile = (docType) => () => {
    dispatch(removeDocument(docType));
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (userType === "individual") {
      if (!documents.idFile) newErrors.idFile = "ID file is required.";
      if (!documents.selfieFile) newErrors.selfieFile = "Selfie file is required.";
    } else {
      if (!documents.businessReg) newErrors.businessReg = "Business registration document is required.";
      if (!documents.addressProof) newErrors.addressProof = "Proof of address is required.";
      if (!documents.ownerId) newErrors.ownerId = "Owner ID is required.";
      if (!documents.selfieFile) newErrors.selfieFile = "Selfie file is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [userType, documents]);

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Your identity verification data has been submitted.");
      // Here you would typically dispatch an action to submit the data to your backend
    } else {
      alert("Please upload all required documents before submitting.");
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      handleFileChange("selfieFile")(blob);
    });
  };

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    
    className="max-w-2xl mx-auto lg:p-6 p-2 bg-white rounded-lg ">
      <h2 className="text-3xl font-semibold mb-8">Verify Your Identity</h2>

      <div className="mb-6 flex justify-center">
        <button
          onClick={() => dispatch(setUserType("individual"))}
          className={`py-2 px-6 w-1/2 rounded-l-lg transition-colors duration-300 ${
            userType === "individual"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Individual
        </button>
        <button
          onClick={() => dispatch(setUserType("business"))}
          className={`py-2 px-6 w-1/2 rounded-r-lg transition-colors duration-300 ${
            userType === "business"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Business
        </button>
      </div>

      {userType === "individual" ? (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FileUpload
            label="Upload Your ID"
            iconName="upload"
            onFileChange={handleFileChange("idFile")}
            previewUrl={previews.idFilePreview}
            onRemove={handleRemoveFile("idFile")}
          />
          <FileUpload
            label="Upload a Selfie"
            iconName="user"
            onFileChange={handleFileChange("selfieFile")}
            previewUrl={previews.selfiePreview}
            onRemove={handleRemoveFile("selfieFile")}
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FileUpload
            label="Business Registration Document"
            iconName="building"
            onFileChange={handleFileChange("businessReg")}
            previewUrl={previews.businessRegPreview}
            onRemove={handleRemoveFile("businessReg")}
          />
          <FileUpload
            label="Upload Proof of Address"
            iconName="upload"
            onFileChange={handleFileChange("addressProof")}
            previewUrl={previews.addressProofPreview}
            onRemove={handleRemoveFile("addressProof")}
          />
          <FileUpload
            label="Upload Owner's Government ID"
            iconName="user"
            onFileChange={handleFileChange("ownerId")}
            previewUrl={previews.ownerIdPreview}
            onRemove={handleRemoveFile("ownerId")}
          />
          <FileUpload
            label="Upload a Selfie"
            iconName="camera"
            onFileChange={handleFileChange("selfieFile")}
            previewUrl={previews.selfiePreview}
            onRemove={handleRemoveFile("selfieFile")}
          />
        </div>
      )}

      <div className="mb-8">
        <div className="bg-gray-200 border border-gray-400 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-400 flex items-center gap-2 text-gray-700">
            <FaCamera className="w-5 h-5" />
            <span>Take a Photo</span>
          </div>
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
            />
          </div>
          <div className=" p-2 lg:p-4 flex justify-center   gap-2 lg:gap-4">
            <button
              onClick={startCamera}
              className="bg-blue-600 text-white hover:bg-blue-700 text-sm transition-colors duration-300 py-1.5 px-3 rounded"
            >
              Start Camera
            </button>
            <button
              onClick={stopCamera}
              className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 py-2 px-4 rounded"
            >
              Stop Camera
            </button>
            <button
              onClick={capturePhoto}
              className="bg-green-600 text-white hover:bg-green-700 transition-colors duration-300 py-2 px-4 rounded"
            >
              Capture Photo
            </button>
          </div>
        </div>
      </div>


    </motion.div>
  );
};

export default DocumentUploadStep;