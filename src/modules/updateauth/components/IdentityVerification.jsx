// import React, { useState, useRef, useCallback } from 'react';
// import { FaCamera, FaUpload, FaUser, FaCheckCircle } from 'react-icons/fa';

// const FileUpload = ({ label, icon: Icon, onFileChange, previewUrl, error }) => {
//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       onFileChange(file);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center gap-2 text-white">
//         <Icon className="w-5 h-5" />
//         <span className="font-semibold">{label}</span>
//       </div>
//       <div 
//         className="relative flex items-center justify-center border-2 border-blue-300 border-dashed rounded-lg p-4 h-48 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
//         onClick={() => fileInputRef.current.click()}
//       >
//         {previewUrl ? (
//           <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded" />
//         ) : (
//           <div className="text-center text-gray-500">
//             <p>Drag & drop or click to upload</p>
//           </div>
//         )}
//         <input
//           ref={fileInputRef}
//           type="file"
//           className="hidden"
//           onChange={handleFileChange}
//           accept="image/*"
//         />
//       </div>
//       {error && (
//         <div className="p-2 bg-red-100 text-red-700 text-sm">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// const IdentityVerification = ({ nextStep }) => {
//   const [idFile, setIdFile] = useState(null);
//   const [selfieFile, setSelfieFile] = useState(null);
//   const [idPreview, setIdPreview] = useState(null);
//   const [selfiePreview, setSelfiePreview] = useState(null);
//   const [idError, setIdError] = useState('');
//   const [selfieError, setSelfieError] = useState('');
//   const [isCameraActive, setIsCameraActive] = useState(false);
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);

//   const handleFileChange = useCallback((setter, previewSetter) => (file) => {
//     setter(file);
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       previewSetter(reader.result);
//     };
//     reader.readAsDataURL(file);
//   }, []);

//   const validateForm = useCallback(() => {
//     let isValid = true;

//     if (!idFile) {
//       setIdError('ID file is required.');
//       isValid = false;
//     } else {
//       setIdError('');
//     }

//     if (!selfieFile) {
//       setSelfieError('Selfie is required.');
//       isValid = false;
//     } else {
//       setSelfieError('');
//     }

//     return isValid;
//   }, [idFile, selfieFile]);

//   const handleSubmit = useCallback(() => {
//     if (validateForm()) {
//       nextStep();
//     }
//   }, [validateForm, nextStep]);

//   const startCamera = useCallback(async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         streamRef.current = stream;
//         setIsCameraActive(true);
//       }
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//     }
//   }, []);

//   const stopCamera = useCallback(() => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       setIsCameraActive(false);
//     }
//   }, []);

//   const capturePhoto = useCallback(() => {
//     const canvas = document.createElement('canvas');
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
//     canvas.toBlob((blob) => {
//       handleFileChange(setSelfieFile, setSelfiePreview)(blob);
//       stopCamera();
//     });
//   }, [handleFileChange, stopCamera]);

//   return (
//     <div className="p-8 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Verify Your Identity</h2>
      
//       <div className="grid md:grid-cols-2 gap-8 mb-8">
//         <FileUpload 
//           label="Upload Your ID" 
//           icon={FaUpload}
//           onFileChange={handleFileChange(setIdFile, setIdPreview)}
//           previewUrl={idPreview}
//           error={idError}
//         />
//         <FileUpload 
//           label="Upload a Selfie" 
//           icon={FaUser}
//           onFileChange={handleFileChange(setSelfieFile, setSelfiePreview)}
//           previewUrl={selfiePreview}
//           error={selfieError}
//         />
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
//         <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center gap-2 text-white">
//           <FaCamera className="w-5 h-5" />
//           <span className="font-semibold">Take a Photo</span>
//         </div>
//         <div className="p-4">
//           <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
//             <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline />
//             {!isCameraActive && (
//               <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 text-white">
//                 <p>Camera is inactive</p>
//               </div>
//             )}
//           </div>
//           <div className="flex justify-center gap-4 mt-4">
//             <button
//               onClick={isCameraActive ? stopCamera : startCamera}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
//             >
//               {isCameraActive ? 'Stop Camera' : 'Start Camera'}
//             </button>
//             <button
//               onClick={capturePhoto}
//               disabled={!isCameraActive}
//               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               Capture Photo
//             </button>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={!(idFile && selfieFile)}
//         className={`w-full py-3 px-4 rounded text-white font-semibold transition-colors duration-300 ${
//           idFile && selfieFile
//             ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
//             : 'bg-gray-400 cursor-not-allowed'
//         }`}
//       >
//         {idFile && selfieFile ? (
//           <span className="flex items-center justify-center gap-2">
//             <FaCheckCircle className="w-5 h-5" />
//             Submit Verification
//           </span>
//         ) : (
//           'Submit'
//         )}
//       </button>

//       <div className="mt-8 bg-yellow-100 border-l-4 border-yellow-500 p-4 text-yellow-700">
//         <p className="font-bold">Important:</p>
//         <p>Please ensure that your ID is clear and all information is visible. Your selfie should clearly show your face.</p>
//       </div>
//     </div>
//   );
// };

// export default IdentityVerification;



import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaUpload, FaUser, FaCheckCircle } from 'react-icons/fa';

const FileUpload = ({ label, icon: Icon, onFileChange, previewUrl, error }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-br from-[#001F90] to-[#2087C2] p-4 flex items-center gap-2 text-white">
        <Icon className="w-5 h-5" />
        <span className="font-semibold">{label}</span>
      </div>
      <div 
        className="relative flex items-center justify-center border-2 border-blue-300 border-dashed rounded-lg p-4 h-48 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
        onClick={() => fileInputRef.current.click()}
      >
        {previewUrl ? (
          <motion.img 
            src={previewUrl} 
            alt="Preview" 
            className="max-h-full max-w-full object-contain rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.div 
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p>Drag & drop or click to upload</p>
          </motion.div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      {error && (
        <motion.div 
          className="p-2 bg-red-100 text-red-700 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}
    </motion.div>
  );
};

const IdentityVerification = ({ nextStep }) => {
  const [idFile, setIdFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [idPreview, setIdPreview] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const [idError, setIdError] = useState('');
  const [selfieError, setSelfieError] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleFileChange = useCallback((setter, previewSetter) => (file) => {
    setter(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      previewSetter(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const validateForm = useCallback(() => {
    let isValid = true;

    if (!idFile) {
      setIdError('ID file is required.');
      isValid = false;
    } else {
      setIdError('');
    }

    if (!selfieFile) {
      setSelfieError('Selfie is required.');
      isValid = false;
    } else {
      setSelfieError('');
    }

    return isValid;
  }, [idFile, selfieFile]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      nextStep();
    }
  }, [validateForm, nextStep]);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      handleFileChange(setSelfieFile, setSelfiePreview)(blob);
      stopCamera();
    });
  }, [handleFileChange, stopCamera]);

  return (
    <motion.div 
      className=" lg:p-6 p-2  rounded-lg  max-w-4xl mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Verify Your Identity</h2>
      
      <motion.div 
        className="grid md:grid-cols-2 gap-8 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <FileUpload 
          label="Upload Your ID" 
          icon={FaUpload}
          onFileChange={handleFileChange(setIdFile, setIdPreview)}
          previewUrl={idPreview}
          error={idError}
        />
        <FileUpload 
          label="Upload a Selfie" 
          icon={FaUser}
          onFileChange={handleFileChange(setSelfieFile, setSelfiePreview)}
          previewUrl={selfiePreview}
          error={selfieError}
        />
      </motion.div>

      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-gradient-to-br from-[#001F90] to-[#2087C2] p-4 flex items-center gap-2 text-white">
          <FaCamera className="w-5 h-5" />
          <span className="font-semibold">Take a Photo</span>
        </div>
        <div className="p-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline />
            {!isCameraActive && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>Camera is inactive</p>
              </motion.div>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <motion.button
              onClick={isCameraActive ? stopCamera : startCamera}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
              whileTap={{ scale: 0.9 }}
            >
              {isCameraActive ? 'Stop Camera' : 'Start Camera'}
            </motion.button>
            <motion.button
              onClick={capturePhoto}
              disabled={!isCameraActive}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.9 }}
            >
              Capture Photo
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.button
        onClick={handleSubmit}
        disabled={!(idFile && selfieFile)}
        className={`w-full py-3 px-4 rounded text-white font-semibold transition-colors duration-300 ${
          idFile && selfieFile
            ? 'bg-gradient-to-br from-[#001F90] to-[#2087C2] hover:from-blue-600 hover:to-purple-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        whileTap={{ scale: 0.9 }}
      >
        Submit
      </motion.button>
    </motion.div>
  );
};

export default IdentityVerification;
