
import { combineReducers } from '@reduxjs/toolkit';
import formReducer from "./FormSlice.js";


const rootReducer = combineReducers({
  form: formReducer,

});

export default rootReducer;
