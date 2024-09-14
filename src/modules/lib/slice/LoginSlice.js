
// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialLoginState = {
  currentStep: 1,
  email: '',
  password: '',
  isLoggedIn: false,
  errors: {},
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    setLoginStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setLoginEmail: (state, action) => {
      state.email = action.payload;
    },
    setLoginPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLoginErrors: (state, action) => {
      state.errors = action.payload;
    },
    submitLoginData: (state) => {
      // Implementation for submitting login data
    },
  },
});

export const {
  setLoginStep,
  setLoginEmail,
  setLoginPassword,
  setIsLoggedIn,
  setLoginErrors,
  submitLoginData
} = loginSlice.actions;

export default loginSlice.reducer;
