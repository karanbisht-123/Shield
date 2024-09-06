import React from "react";
import { FaUpload, FaCamera } from "react-icons/fa";

const Step4 = ({ formData, handleInputChange, handleFileChange }) => {
  return (
    <>

      <h2 className="text-xl font-bold mb-4">Identity details</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="countryIdentityName" className="block text-sm font-medium text-gray-700 mb-1">
            Country identity name
          </label>
          <input
            type="text"
            id="countryIdentityName"
            name="countryIdentityName"
            value={formData.countryIdentityName}
            onChange={handleInputChange}
            placeholder="Enter identity name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="identityNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Identity number
          </label>
          <input
            type="text"
            id="identityNumber"
            name="identityNumber"
            value={formData.identityNumber}
            onChange={handleInputChange}
            placeholder="Enter identity number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="identityCard" className="block text-sm font-medium text-gray-700 mb-1">
          Country identity card
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="identityCard"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="identityCard"
                  name="identityCard"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>
      </>

  )
}
export default Step4