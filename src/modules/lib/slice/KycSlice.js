// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   currentStep: 1,
//   email: '',
//   firstName: '',
//   lastName: '',
//   country: '',
//   company: '',
//   userType: 'individual', // 'individual' or 'business'
//   documents: {
//     idFile: null,
//     selfieFile: null,
//     businessReg: null,
//     addressProof: null,
//     ownerId: null,
//   },
//   previews: {
//     idFilePreview: null,
//     selfiePreview: null,
//     businessRegPreview: null,
//     addressProofPreview: null,
//     ownerIdPreview: null,
//   },
// };

// const kycSlice = createSlice({
//   name: 'kyc',
//   initialState,
//   reducers: {
//     setCurrentStep: (state, action) => {
//       state.currentStep = action.payload;
//     },
//     setEmail: (state, action) => {
//       state.email = action.payload;
//     },
//     setPersonalInfo: (state, action) => {
//       const { firstName, lastName, country, company } = action.payload;
//       state.firstName = firstName;
//       state.lastName = lastName;
//       state.country = country;
//       state.company = company;
//     },
//     setUserType: (state, action) => {
//       state.userType = action.payload;
//     },
//     setDocument: (state, action) => {
//       const { docType, file } = action.payload;
//       state.documents[docType] = file;
//     },
//     setDocumentPreview: (state, action) => {
//       const { docType, preview } = action.payload;
//       state.previews[`${docType}Preview`] = preview;
//     },
//     removeDocument: (state, action) => {
//       const docType = action.payload;
//       state.documents[docType] = null;
//       state.previews[`${docType}Preview`] = null;
//     },
//     resetDocuments: (state) => {
//       state.documents = {
//         idFile: null,
//         selfieFile: null,
//         businessReg: null,
//         addressProof: null,
//         ownerId: null,
//       };
//       state.previews = {
//         idFilePreview: null,
//         selfiePreview: null,
//         businessRegPreview: null,
//         addressProofPreview: null,
//         ownerIdPreview: null,
//       };
//     },
//   },
// });

// export const {
//   setCurrentStep,
//   setEmail,
//   setPersonalInfo,
//   setUserType,
//   setDocument,
//   setDocumentPreview,
//   removeDocument,
//   resetDocuments,
// } = kycSlice.actions;

// export default kycSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  email: '',
  firstName: '',
  lastName: '',
  country: '',
  company: '',
  userType: 'individual', // 'individual' or 'business'
  documents: {
    idFile: null,
    selfieFile: null,
    businessReg: null,
    addressProof: null,
    ownerId: null,
  },
  previews: {
    idFilePreview: null,
    selfiePreview: null,
    businessRegPreview: null,
    addressProofPreview: null,
    ownerIdPreview: null,
  },
};

const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPersonalInfo: (state, action) => {
      const { firstName, lastName, country, company } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.country = country;
      state.company = company;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setDocument: (state, action) => {
      const { docType, file } = action.payload;
      // Store only the file name and size, not the entire File object
      state.documents[docType] = file ? { name: file.name, size: file.size } : null;
    },
    setDocumentPreview: (state, action) => {
      const { docType, preview } = action.payload;
      state.previews[`${docType}Preview`] = preview;
    },
    removeDocument: (state, action) => {
      const docType = action.payload;
      state.documents[docType] = null;
      state.previews[`${docType}Preview`] = null;
    },
    resetDocuments: (state) => {
      state.documents = {
        idFile: null,
        selfieFile: null,
        businessReg: null,
        addressProof: null,
        ownerId: null,
      };
      state.previews = {
        idFilePreview: null,
        selfiePreview: null,
        businessRegPreview: null,
        addressProofPreview: null,
        ownerIdPreview: null,
      };
    },
    submitKycData: (state) => {
      // This is a placeholder for the actual submission logic
      // You would typically handle this in a thunk or saga
      console.log('Submitting KYC data:', state);
    },
  },
});

export const {
  setCurrentStep,
  setEmail,
  setPersonalInfo,
  setUserType,
  setDocument,
  setDocumentPreview,
  removeDocument,
  resetDocuments,
  submitKycData,
} = kycSlice.actions;

export default kycSlice.reducer;