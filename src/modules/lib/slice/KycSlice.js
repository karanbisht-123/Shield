
import { createSlice } from '@reduxjs/toolkit';
import * as Yup from 'yup';

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
  currentRoute: 'kyc',
};

const emailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  country: Yup.string().required('Country is required'),
  company: Yup.string().nullable(),
});

const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      const nextStep = action.payload;
      if (state.currentRoute === 'kyc' && nextStep > state.currentStep) {
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
      state.stepsValidated[2] = false;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
      state.stepsValidated[2] = false;
      state.stepsValidated[3] = false;
    },
    setDocument: (state, action) => {
      const { docType, file } = action.payload;
      state.documents[docType] = file ? { name: file.name, size: file.size } : null;
      state.stepsValidated[3] = false;
    },
    setDocumentPreview: (state, action) => {
      const { docType, preview } = action.payload;
      state.previews[`${docType}Preview`] = preview;
    },
    removeDocument: (state, action) => {
      const docType = action.payload;
      state.documents[docType] = null;
      state.previews[`${docType}Preview`] = null;
      state.stepsValidated[3] = false;
    },
    resetDocuments: (state) => {
      state.documents = { ...initialState.documents };
      state.previews = { ...initialState.previews };
      state.stepsValidated[3] = false;
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
    setCurrentRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
    submitKycData: (state) => {
      if (state.currentRoute === 'kyc') {
        const isValid = validateAllSteps(state);
        if (isValid) {
          console.log('Submitting KYC data:', state);
          localStorage.setItem('kycData', JSON.stringify(state));
          console.log('KYC data saved to local storage.');
        } else {
          console.log('KYC data is not valid. Please fix the errors.');
        }
      } else {
        console.log('Submitting data for non-KYC route:', state.currentRoute);
      }
    },
  },
});

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

const validateStep = (state, step) => {
  if (state.currentRoute !== 'kyc') return true;

  let isValid = false;
  switch (step) {
    case 1:
      isValid = validateField(state, 'email', emailSchema);
      break;
    case 2:
      return true;
    case 3:
      isValid = validateField(state, 'personalInfo', personalInfoSchema);
      break;
    case 4:
      return true;
    default:
      console.warn('Invalid step number:', step);
  }
  return isValid;
};

const validateAllSteps = (state) => {
  if (state.currentRoute !== 'kyc') return true;

  const isEmailValid = validateStep(state, 1);
  const isPersonalInfoValid = validateStep(state, 3);
  const isDocumentsValid = validateStep(state, 4);
  
  return isEmailValid && isPersonalInfoValid && isDocumentsValid;
};

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
  setCurrentRoute,
  submitKycData
} = kycSlice.actions;

export default kycSlice.reducer;
