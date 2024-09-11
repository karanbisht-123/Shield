import { combineReducers } from "@reduxjs/toolkit";
import KycReducer from "./slice/KycSlice.js";
import CryptoReducer from "./slice/CryptoSlice.js";
import orderReducer from './slice/OrderSlice.js'
import modalReducer from './slice/ModalSlice.js';
import authReducer from './slice/AuthSlice.js';

const rootReducer = combineReducers({
  kyc: KycReducer,
  cryptoFiat: CryptoReducer,
  order:orderReducer,
  modal: modalReducer,
  auth: authReducer,

});

export default rootReducer;
