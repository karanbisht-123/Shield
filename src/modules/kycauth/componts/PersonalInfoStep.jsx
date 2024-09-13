import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPersonalInfo } from "../../lib/slice/KycSlice";
import { motion } from "framer-motion";
import { FaUser, FaGlobe, FaBuilding } from "react-icons/fa";

const InputField = ({ icon: Icon, error, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      {...props}
      className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
  </div>
);

const ErrorMessage = ({ message }) => (
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-red-500 text-sm mt-1"
  >
    {message}
  </motion.p>
);

const PersonalInfoStep = ({ errors }) => {
  console.log(errors, "hii i am erros for yofirehferihgoirhgrlk");
  const dispatch = useDispatch();
  const { firstName, lastName, country, company } = useSelector(
    (state) => state.kyc
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setPersonalInfo({
        ...{ firstName, lastName, country, company },
        [name]: value,
      })
    );
  };

  const validateField = (name, value) => {
    if (!value.trim() && name !== "company") {
      dispatch(
        setFieldError({
          field: name,
          error: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
        })
      );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name
          </label>
          <InputField
            icon={FaUser}
            id="firstName"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            onBlur={(e) => validateField("firstName", e.target.value)}
            placeholder="Enter your first name"
          />

          {errors && errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name
          </label>
          <InputField
            icon={FaUser}
            id="lastName"
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            onBlur={(e) => validateField("lastName", e.target.value)}
            placeholder="Enter your last name"
          />

          {errors && errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country
          </label>
          <InputField
            icon={FaGlobe}
            id="country"
            type="text"
            name="country"
            value={country}
            onChange={handleChange}
            onBlur={(e) => validateField("country", e.target.value)}
            placeholder="Enter your country"
            error={errors?.country}
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company (Optional)
          </label>
          <InputField
            icon={FaBuilding}
            id="company"
            type="text"
            name="company"
            value={company}
            onChange={handleChange}
            placeholder="Enter your company name (optional)"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
