import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emailExists: false,
  authStep: 1
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkEmailExists: (state, action) => {
      const email = action.payload;
      const kycFormDataString = localStorage.getItem('kycData');

      if (kycFormDataString) {
        try {
          const kycFormData = JSON.parse(kycFormDataString);
          if (typeof kycFormData === 'object' && kycFormData !== null) {
            
            console.log(kycFormData, ',,,,,,,')
            const emailExists = kycFormData?.email;

            console.log(emailExists, 'hiii i am email exit ')
            state.emailExists = emailExists;
            console.log(emailExists, 'Email already exists');
          } else {
            state.emailExists = false;
            console.log('Parsed KYC form data is not an object');
          }
        } catch (error) {
          state.emailExists = false;
          console.error('Error parsing KYC form data:', error);
        }
      } else {
        state.emailExists = false;
        console.log('No KYC form data found');
      }
    },
    setAuthStep: (state, action) => {
      state.authStep = action.payload;
    },
  },
});

export const { checkEmailExists, setAuthStep } = authSlice.actions;
export default authSlice.reducer;
