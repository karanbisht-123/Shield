import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaUpload, FaUser, FaBuilding, FaTimes } from 'react-icons/fa';

const FileUpload = ({ label, icon: Icon, onFileChange, previewUrl, onRemove }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file , 'hii i am file ')
      onFileChange(file);
    }
  };

  return (
    <div className="bg-gray-200 border border-gray-400 hover:border-gray-600 transition-colors duration-300 rounded-lg overflow-hidden relative">
      <div className="p-4 border-b border-gray-400 flex items-center gap-2 text-black">
        <Icon className="w-5 h-5" />
        <span className='text-sm'>{label}</span>
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
        className="relative flex items-center justify-center border-2 border-gray-400 border-dashed  p-4 h-48 cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
      {previewUrl ? (
  <>
    {console.log('Preview URL:', previewUrl)}
    <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded" />
  </>
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

const IdentityVerification = ({ nextStep }) => {
  const [verificationType, setVerificationType] = useState('individual');
  const [documents, setDocuments] = useState({
    idFile: null,
    selfieFile: null,
    businessReg: null,
    addressProof: null,
    ownerId: null,
  });
  const [previews, setPreviews] = useState({
    idFilePreview: null,
    selfiePreview: null,
    businessRegPreview: null,
    addressProofPreview: null,
    ownerIdPreview: null,
  });
  const [errors, setErrors] = useState({});
  const videoRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);

  // const handleFileChange = useCallback((fileType) => (file) => {
  //   setDocuments((prev) => ({ ...prev, [fileType]: file }));

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setPreviews((prev) => ({ ...prev, [`${fileType}Preview`]: reader.result }));
  //   };
  //   reader.readAsDataURL(file);
  // }, []);


  const handleFileChange = useCallback((fileType) => (file) => {
    setDocuments((prev) => ({ ...prev, [fileType]: file }));
  
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log('File loaded:', reader.result);
      console.log('fileType',fileType)
      setPreviews((prev) => ({ ...prev, [`${fileType}Preview`]: reader.result }));
      console.log(previews, 'hii i am prives')
    };
    reader.readAsDataURL(file);
  }, []);
  
  const handleRemoveFile = (fileType) => () => {
    setDocuments((prev) => ({ ...prev, [fileType]: null }));
    setPreviews((prev) => ({ ...prev, [`${fileType}Preview`]: null }));
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (verificationType === 'individual') {
      if (!documents.idFile) newErrors.idFile = 'ID file is required.';
      if (!documents.selfieFile) newErrors.selfieFile = 'Selfie file is required.';
    } else {
      if (!documents.businessReg) newErrors.businessReg = 'Business registration document is required.';
      if (!documents.addressProof) newErrors.addressProof = 'Proof of address is required.';
      if (!documents.ownerId) newErrors.ownerId = 'Owner ID is required.';
      if (!documents.selfieFile) newErrors.selfieFile = 'Selfie file is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [verificationType, documents]);

  const handleSubmit = () => {
    if (validateForm()) {
      nextStep();
    } else {
      alert('Please upload all required documents before submitting.');
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
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      handleFileChange('selfieFile')(blob);
      setPreviews((prev) => ({ ...prev, selfiePreview: URL.createObjectURL(blob) }));
    });
  };

  return (
    <motion.div
      className=" xl:px-6 p-2   rounded-lg text-black max-w-2xl mx-auto lg:py-10 pb-20 md:pb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-semibold mb-8">Verify Your Identity</h2>

      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setVerificationType('individual')}
          className={` text-white py-2 px-6 w-1/2 rounded-l-lg transition-colors duration-300 ${
            verificationType === 'individual' ? 'bg-gradient-to-br from-[#001F90] to-[#2087C2]' : 'bg-gray-400'
          }`}
        >
          Individual
        </button>
        <button
          onClick={() => setVerificationType('business')}
          className={` text-white  py-2 w-1/2  px-6 rounded-r-lg transition-colors duration-300 ${
            verificationType === 'business' ? 'bg-gradient-to-br from-[#001F90] to-[#2087C2]' : 'bg-gray-400'
          }`}
        >
          Business
        </button>
      </div>

      {verificationType === 'individual' ? (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FileUpload
            label="Upload Your ID"
            icon={FaUpload}
            onFileChange={handleFileChange('idFile')}
            previewUrl={previews.idFilePreview}
            onRemove={handleRemoveFile('idFile')}
          />
          <FileUpload
            label="Upload a Selfie"
            icon={FaUser}
            onFileChange={handleFileChange('selfieFile')}
            previewUrl={previews.selfiePreview}
            onRemove={handleRemoveFile('selfieFile')}
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FileUpload
            label="Business Registration Document"
            icon={FaBuilding}
            onFileChange={handleFileChange('businessReg')}
            previewUrl={previews.businessRegPreview}
            onRemove={handleRemoveFile('businessReg')}
          />
          <FileUpload
            label="Upload Proof of Address"
            icon={FaUpload}
            onFileChange={handleFileChange('addressProof')}
            previewUrl={previews.addressProofPreview}
            onRemove={handleRemoveFile('addressProof')}
          />
          <FileUpload
            label="Upload Owner's Government ID"
            icon={FaUser}
            onFileChange={handleFileChange('ownerId')}
            previewUrl={previews.ownerIdPreview}
            onRemove={handleRemoveFile('ownerId')}
          />
          <FileUpload
            label="Upload a Selfie"
            icon={FaCamera}
            onFileChange={handleFileChange('selfieFile')}
            previewUrl={previews.selfiePreview}
            onRemove={handleRemoveFile('selfieFile')}
          />
        </div>
      )}

      {verificationType === 'individual' && (
        <div className="text-red-500 mb-4">
          {errors.idFile && <p>{errors.idFile}</p>}
          {errors.selfieFile && <p>{errors.selfieFile}</p>}
        </div>
      )}
      {verificationType === 'business' && (
        <div className="text-red-500 mb-4">
          {errors.businessReg && <p>{errors.businessReg}</p>}
          {errors.addressProof && <p>{errors.addressProof}</p>}
          {errors.ownerId && <p>{errors.ownerId}</p>}
          {errors.selfieFile && <p>{errors.selfieFile}</p>}
        </div>
      )}

      <div className="mb-8">
        <div className="bg-gray-500 border border-gray-400 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-400 flex items-center gap-2 text-gray-100">
            <FaCamera className="w-5 h-5" />
            <span>Take a Photo</span>
          </div>
          <div className="relative aspect-video bg-black">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay />
          </div>
          <div className="p-4 flex justify-center gap-4">
            <button onClick={startCamera} className="bg-gradient-to-br from-[#001F90] to-[#2087C2] text-white hover:bg-yellow-400 transition-colors duration-300 py-2 px-4 rounded">
              Start Camera
            </button>
            <button onClick={stopCamera} className="bg-red-600 text-white hover:bg-red-400 transition-colors duration-300 py-2 px-4 rounded">
              Stop Camera
            </button>
            <button onClick={capturePhoto} className="bg-gradient-to-br from-[#001F90] to-[#2087C2] text-white hover:bg-yellow-400 transition-colors duration-300 py-2 px-4 rounded">
              Capture Photo
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={handleSubmit}
          className="w-full p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </motion.div>
    </motion.div>
  );
};

export default IdentityVerification;

