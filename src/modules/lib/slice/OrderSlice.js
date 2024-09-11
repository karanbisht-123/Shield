
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  orders: [], 
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});


export const { addOrder, setLoading, setError } = orderSlice.actions;


export default orderSlice.reducer;
