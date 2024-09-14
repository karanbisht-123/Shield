import { createSlice } from '@reduxjs/toolkit';

const initialVerificationState = {
  currentStep: 1,
  otpCode: '',
  isOtpVerified: false,
  password: '',
  confirmPassword: '',
  errors: {},
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState: initialVerificationState,
  reducers: {
    setVerificationStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setOtpCode: (state, action) => {
      state.otpCode = action.payload;
    },
    setOtpVerified: (state, action) => {
      state.isOtpVerified = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setVerificationErrors: (state, action) => {
      state.errors = action.payload;
    },
    submitVerificationData: (state) => {
      // Implementation for submitting verification data
    },
  },
});

export const {
  setVerificationStep,
  setOtpCode,
  setOtpVerified,
  setPassword,
  setConfirmPassword,
  setVerificationErrors,
  submitVerificationData
} = verificationSlice.actions;

export default verificationSlice.reducer;
