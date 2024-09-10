import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    currentStep: 1,
    email: "",
    emailError: "",
    isRegistered: false,
    otpSent: false,
    otp: "",
    otpError: "",
    firstName: "",
    firstNameError: "",
    Company:'',
    countryOrigin:'',
    lastName: "",
    lastNameError: "",
    terms: false,
    termsError: "",
  },
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      state.emailError = "";
      state.isRegistered = localStorage.getItem("registeredEmail") === action.payload;
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    setIsRegistered: (state, action) => {
      state.isRegistered = action.payload;
    },
    setOtpSent: (state, action) => {
      state.otpSent = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
      state.otpError = "";
    },
    setOtpError: (state, action) => {
      state.otpError = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
      state.firstNameError = "";
    },
    setFirstNameError: (state, action) => {
      state.firstNameError = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
      state.lastNameError = "";
    },
    setLastNameError: (state, action) => {
      state.lastNameError = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
      state.passwordError = "";
    },
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
      state.confirmPasswordError = "";
    },
    setConfirmPasswordError: (state, action) => {
      state.confirmPasswordError = action.payload;
    },
    setTerms: (state, action) => {
      state.terms = action.payload;
      state.termsError = "";
    },
    setTermsError: (state, action) => {
      state.termsError = action.payload;
    },
  },
});

export const {
  setCurrentStep,
  setEmail,
  setEmailError,
  setIsRegistered,
  setOtpSent,
  setOtp,
  setOtpError,
  setFirstName,
  setFirstNameError,
  setLastName,
  setLastNameError,
  setPassword,
  setPasswordError,
  setConfirmPassword,
  setConfirmPasswordError,
  setTerms,
  setTermsError,
} = formSlice.actions;

export default formSlice.reducer;