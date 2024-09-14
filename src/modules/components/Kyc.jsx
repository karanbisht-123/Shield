import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaGlobe, FaBuilding, FaUserTie, FaUpload, FaCamera } from 'react-icons/fa';
const KycDetails = () => {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    country: "United States",
    company: "Acme Inc.",
    type: "business",
    documents: [
      { name: "Document 1", url: "https://via.placeholder.com/150?text=Document+1" },
      { name: "Document 2", url: "https://via.placeholder.com/150?text=Document+2" }
    ],
    selfie: { url: "https://via.placeholder.com/150?text=Selfie" }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newDocuments = [...userData.documents];
      newDocuments[index] = { name: file.name, url: URL.createObjectURL(file) };
      setUserData(prev => ({ ...prev, documents: newDocuments }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated user data:", userData);
    setIsOpen(false);
  };

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 720, height: 720 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Error accessing the camera", err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && photoRef.current) {
      const video = videoRef.current;
      const photo = photoRef.current;

      photo.width = 720;
      photo.height = 720;

      const ctx = photo.getContext('2d');
      ctx.drawImage(video, 0, 0, photo.width, photo.height);

      const capturedImageUrl = photo.toDataURL('image/jpeg');
      setCapturedImage(capturedImageUrl);
      setUserData(prev => ({ 
        ...prev, 
        selfie: { url: capturedImageUrl } 
      }));

      stopCamera();
    }
  }, [stopCamera]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const renderFileUpload = (index) => (
    <div className="mt-4">
      <label htmlFor={`document-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
        Upload Document {index + 1}
      </label>
      <div className="flex items-center justify-center w-full">
        <label htmlFor={`document-${index}`} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FaUpload className="w-8 h-8 mb-4 text-gray-500" />
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">PDF, PNG, JPG or GIF (MAX. 10MB)</p>
          </div>
          <input
            id={`document-${index}`}
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e, index)}
            accept=".pdf,.png,.jpg,.gif"
          />
        </label>
      </div>
    </div>
  );

  const renderUserInfo = (icon, title, value) => (
    <motion.div variants={itemVariants} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center mb-4">
        {React.cloneElement(icon, { className: "text-3xl text-indigo-600 mr-4" })}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-lg text-gray-700 break-all">{value}</p>
    </motion.div>
  );

  return (
    <motion.div 
      className="max-w-6xl mx-auto mt-10 p-4 xl:p-8 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-300">
        <h2 className="text-4xl font-bold text-gray-800">KYC Details</h2>
        <button
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          onClick={() => setIsOpen(true)}
        >
          Edit KYC
        </button>
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit KYC Details</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {['firstName', 'lastName', 'country', 'company'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={userData[field]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                  />
                </div>
              ))}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (Non-editable)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100"
                />
              </div>
              
              {renderFileUpload(0)}
              {renderFileUpload(1)}

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Capture Selfie</label>
                {isCameraOpen ? (
                  <div className="space-y-4">
                    <video ref={videoRef} className="w-full rounded-lg" autoPlay playsInline muted />
                    <button type="button" onClick={capturePhoto} className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300">
                      Capture Photo
                    </button>
                    <button type="button" onClick={stopCamera} className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300">
                      Close Camera
                    </button>
                  </div>
                ) : capturedImage ? (
                  <div className="space-y-4">
                    <img src={capturedImage} alt="Captured selfie" className="w-full rounded-lg" />
                    <button type="button" onClick={() => {setCapturedImage(null); startCamera();}} className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300">
                      Retake Photo
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={startCamera} className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300">
                    Open Camera
                  </button>
                )}
                <canvas ref={photoRef} style={{ display: 'none' }} />
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div className="col-span-1 md:col-span-2" variants={itemVariants}>
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200 flex items-center shadow-lg">
            <FaUserTie className="text-4xl mr-6 text-indigo-600" />
            <div>
              <p className="text-lg text-indigo-600 font-semibold">Account Type</p>
              <p className="text-2xl font-bold text-gray-800">{userData.type === 'business' ? 'Business' : 'Individual'}</p>
            </div>
          </div>
        </motion.div>

        {renderUserInfo(<FaUser />, "Full Name", `${userData.firstName} ${userData.lastName}`)}
        {renderUserInfo(<FaEnvelope />, "Email Address", userData.email)}
        {renderUserInfo(<FaGlobe />, "Country", userData.country)}
        
        {userData.type === 'business' && renderUserInfo(<FaBuilding />, "Company", userData.company)}

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 mt-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Uploaded Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userData.documents.map((doc, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <img src={doc.url} alt={`Document ${index + 1}`} className="w-full h-48 object-cover rounded-lg mb-4" />
                <p className="text-lg font-semibold text-gray-800 truncate">{doc.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 mt-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Selfie</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <img src={userData.selfie.url} alt="User Selfie" className="w-full h-80 object-cover rounded-lg" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default KycDetails;