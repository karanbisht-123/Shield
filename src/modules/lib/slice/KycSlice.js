import { createSlice } from '@reduxjs/toolkit';
import * as Yup from 'yup';

// Initial state
const initialState = {
  currentStep: 1,
  email: '',
  firstName: '',
  lastName: '',
  country: '',
  company: '',
  userType: 'individual',
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
  errors: {},
  fieldErrors: {},
  isValid: false,
  stepsValidated: [false, false, false, false],
};

// Validation schemas
const emailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  country: Yup.string().required('Country is required'),
  company: Yup.string().nullable(),
});

// const documentsSchema = Yup.object().shape({
//   documents: Yup.object().shape({
//     idFile: Yup.mixed().required('ID document is required'),
//     selfieFile: Yup.mixed().required('Selfie is required'),
//     businessReg: Yup.mixed().when('userType', {
//       is: 'business',
//       then: Yup.mixed().required('Business registration document is required for business users'),
//       otherwise: Yup.mixed().nullable(),
//     }),
//     addressProof: Yup.mixed().required('Address proof is required'),
//     ownerId: Yup.mixed().when('userType', {
//       is: 'business',
//       then: Yup.mixed().required('Owner ID is required for business users'),
//       otherwise: Yup.mixed().nullable(),
//     }),
//   }),
// });

// Slice
const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      const nextStep = action.payload;
      if (nextStep > state.currentStep) {
        const isCurrentStepValid = validateStep(state, state.currentStep);
        if (!isCurrentStepValid) {
          console.log(`Step ${state.currentStep} is not valid. Please fix the errors.`);
          return;
        }
      }
      state.currentStep = nextStep;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      state.stepsValidated[0] = false;
    },
    setPersonalInfo: (state, action) => {
      const { firstName, lastName, country, company } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.country = country;
      state.company = company;
      state.stepsValidated[3] = false; // Update this to the correct step
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
      state.stepsValidated[3] = false; // Update this to the correct step
      state.stepsValidated[4] = false; // Reset document validation
    },
    setDocument: (state, action) => {
      const { docType, file } = action.payload;
      state.documents[docType] = file ? { name: file.name, size: file.size } : null;
      state.stepsValidated[4] = false; // Update this to the correct step
    },
    setDocumentPreview: (state, action) => {
      const { docType, preview } = action.payload;
      state.previews[`${docType}Preview`] = preview;
    },
    removeDocument: (state, action) => {
      const docType = action.payload;
      state.documents[docType] = null;
      state.previews[`${docType}Preview`] = null;
      state.stepsValidated[4] = false; // Update this to the correct step
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
      state.stepsValidated[3] = false; // Update this to the correct step
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setFieldError: (state, action) => {
      const { field, error } = action.payload;
      state.fieldErrors[field] = error;
    },
    clearFieldError: (state, action) => {
      const field = action.payload;
      delete state.fieldErrors[field];
    },
    setIsValid: (state, action) => {
      state.isValid = action.payload;
    },
    submitKycData: (state) => {
      const isValid = validateAllSteps(state);
      if (isValid) {
        console.log('Submitting KYC data:', state);
  
        localStorage.setItem('kycData', JSON.stringify(state));
        console.log('KYC data saved to local storage.');
      } else {
        console.log('KYC data is not valid. Please fix the errors.');
      }
    },
    
  },
});

// Helper function to validate fields
const validateField = (state, field, schema) => {
  try {
    schema.validateSync(state, { abortEarly: false });
    state.errors[field] = {};
    kycSlice.caseReducers.clearFieldError(state, { payload: field });
    return true;
  } catch (validationError) {
    if (validationError?.inner && validationError.inner.length > 0) {
      validationError.inner.forEach(error => {
        const path = error.path;
        if (path) {
          state.errors[path] = error.message;
          kycSlice.caseReducers.setFieldError(state, {
            payload: { field: path, error: error.message }
          });
        }
      });
    } else {
      console.warn(`Validation error occurred but no inner validation errors found for field: ${field}`);
      let errorMessage = '';
      
      switch (field) {
        case 'email':
          errorMessage = state.email ? 'Invalid email format' : 'Email is required';
          break;
        case 'firstName':
          errorMessage = state.firstName ? '' : 'First name is required';
          break;
        case 'lastName':
          errorMessage = state.lastName ? '' : 'Last name is required';
          break;
        case 'country':
          errorMessage = state.country ? '' : 'Country is required';
          break;
        // case 'company':
        //   errorMessage = state.userType === 'business' && !state.company ? 'Company name is required for business users' : '';
        //   break;
        // case 'documents.idFile':
        //   errorMessage = state.documents.idFile ? '' : 'ID document is required';
        //   break;
        // case 'documents.selfieFile':
        //   errorMessage = state.documents.selfieFile ? '' : 'Selfie is required';
        //   break;
        // case 'documents.businessReg':
        //   errorMessage = state.userType === 'business' && !state.documents.businessReg ? 'Business registration document is required for business users' : '';
        //   break;
        // case 'documents.addressProof':
        //   errorMessage = state.documents.addressProof ? '' : 'Address proof is required';
        //   break;
        // case 'documents.ownerId':
        //   errorMessage = state.userType === 'business' && !state.documents.ownerId ? 'Owner ID is required for business users' : '';
        //   break;
        default:
          errorMessage = `Validation failed for ${field}`;
      }
      
      state.errors[field] = { general: errorMessage };
      kycSlice.caseReducers.setFieldError(state, {
        payload: { field, error: errorMessage }
      });
    }
    return false;
  }
};

// Helper function to validate a specific step
const validateStep = (state, step) => {
  let isValid = false;
  switch (step) {
    case 1:
      isValid = validateField(state, 'email', emailSchema);
      break;
    case 2:
      return true
      break;
    case 3:
      isValid = validateField(state, 'personalInfo', personalInfoSchema); // Update this to validate specific fields
      break;
    case 4:
      // isValid = validateField(state, 'documents', documentsSchema);
      break;
    default:
      console.warn('Invalid step number:', step);
  }
  return isValid;
};

// Helper function to validate all steps
const validateAllSteps = (state) => {
  const isEmailValid = validateStep(state, 1);
  const isPersonalInfoValid = validateStep(state, 2);
  const isDocumentsValid = validateStep(state, 3);
  
  return isEmailValid && isPersonalInfoValid && isDocumentsValid;
};

// Exports
export const {
  setCurrentStep,
  setEmail,
  setPersonalInfo,
  setUserType,
  setDocument,
  setDocumentPreview,
  removeDocument,
  resetDocuments,
  setErrors,
  setFieldError,
  clearFieldError,
  setIsValid,
  submitKycData
} = kycSlice.actions;

export default kycSlice.reducer;
