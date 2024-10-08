// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './combineReducers';
const store = configureStore({
  reducer: rootReducer, 
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
//   devTools: process.env.NODE_ENV !== 'production',
});

export default store;
